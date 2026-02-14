import { runtime } from "../runtime.js";
import { createNode } from "../dom/node.js";
import { connect } from "../dom/connection.js";
import { updateSidebarWithData } from "../dom/canvas.js";

export function applyTransform() {
  const { x, y, scale } = runtime.state;
  runtime.workspace.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  const bgX = x % (32 * scale);
  const bgY = y % (32 * scale);

  runtime.container.style.backgroundPosition = `${bgX}px ${bgY}px`;
  runtime.container.style.backgroundSize = `${32 * scale}px ${32 * scale}px`;

  runtime.connectionList.forEach(fn => fn());
}

// Centers and zooms to fit all nodes in the viewport
export function centerView() {
  const nodes = runtime.workspace.querySelectorAll(".node");
  if (nodes.length === 0) return;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach(n => {
    minX = Math.min(minX, n.offsetLeft);
    minY = Math.min(minY, n.offsetTop);
    maxX = Math.max(maxX, n.offsetLeft + n.offsetWidth);
    maxY = Math.max(maxY, n.offsetTop + n.offsetHeight);
  });

  const contentW = maxX - minX;
  const contentH = maxY - minY;
  const cx = minX + contentW / 2;
  const cy = minY + contentH / 2;

  const rect = runtime.container.getBoundingClientRect();
  const pad = 100;

  const scale = Math.max(0.1, Math.min(1, Math.min(
    (rect.width - pad * 2) / contentW,
    (rect.height - pad * 2) / contentH
  )));

  runtime.state.scale = scale;
  runtime.state.x = (rect.width / 2) - (cx * scale);
  runtime.state.y = (rect.height / 2) - (cy * scale);

  applyTransform();
}

export function visualize(data) {
  runtime.workspace.querySelectorAll(".node").forEach(n => n.remove());
  runtime.svg.innerHTML = "";
  runtime.connectionList.length = 0;

  // Update sidebar with the data
  updateSidebarWithData(data);

  // Temporarily make container visible for accurate measurement
  const wasHidden = runtime.container.style.display === "none";
  if (wasHidden) {
    runtime.container.style.visibility = "hidden";
    runtime.container.style.display = "block";
  }

  const X_OFFSET = 600;
  const Y_GAP = 60;
  const visited = new WeakSet();

  // Pass 1: Create all nodes in DOM and measure actual heights
  function walk(obj, label, x) {
    if (visited.has(obj)) {
      const nodeEl = createNode(label, x, 0, { "[circular]": "ref" });
      const actualHeight = nodeEl.offsetHeight;
      return { nodeEl, actualHeight, branchHeight: actualHeight, children: [] };
    }
    visited.add(obj);

    const primitives = Object.entries(obj).filter(([_, v]) => typeof v !== 'object' || v === null);
    const complexes = Object.entries(obj).filter(([_, v]) => typeof v === 'object' && v !== null);

    // Create node in DOM immediately so we can measure real height
    const nodeEl = createNode(label, x, 0, Object.fromEntries(primitives));
    const actualHeight = nodeEl.offsetHeight;

    let totalHeightOfChildren = 0;
    const children = complexes.map(([k, v]) => {
      const result = walk(v, k, x + X_OFFSET);
      totalHeightOfChildren += result.branchHeight + Y_GAP;
      return result;
    });

    if (totalHeightOfChildren > 0) totalHeightOfChildren -= Y_GAP;

    const branchHeight = Math.max(actualHeight, totalHeightOfChildren);

    return { nodeEl, actualHeight, branchHeight, children };
  }

  // Pass 2: Position all nodes using measured heights and draw connections
  function position(info, y) {
    const nodeY = y + (info.branchHeight / 2) - (info.actualHeight / 2);
    info.nodeEl.style.top = nodeY + "px";

    let currentY = y;
    info.children.forEach(child => {
      position(child, currentY);
      connect(info.nodeEl, child.nodeEl);
      currentY += child.branchHeight + Y_GAP;
    });
  }

  const startX = 5000;
  const startY = 5000;
  const tree = walk(data, "Root", startX);
  position(tree, startY);

  // Center view while container is measurable
  const rect = runtime.container.getBoundingClientRect();
  runtime.state.x = (rect.width / 2) - (startX * runtime.state.scale);
  runtime.state.y = (rect.height / 2) - ((startY + tree.branchHeight / 2) * runtime.state.scale);
  applyTransform();

  // Restore hidden state
  if (wasHidden) {
    runtime.container.style.display = "none";
    runtime.container.style.visibility = "";
  }
}