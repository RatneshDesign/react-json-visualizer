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

export function visualize(data) {
  runtime.workspace.querySelectorAll(".node").forEach(n => n.remove());
  runtime.svg.innerHTML = "";
  runtime.connectionList.length = 0;

  // Update sidebar with the data
  updateSidebarWithData(data);

  const X_OFFSET = 500;
  const Y_GAP = 60;

  function walk(obj, label, x) {
    const primitives = Object.entries(obj).filter(([_, v]) => typeof v !== 'object' || v === null);
    const complexes = Object.entries(obj).filter(([_, v]) => typeof v === 'object' && v !== null);

    const estimatedNodeHeight = 60 + (primitives.length * 24);

    let totalHeightOfChildren = 0;
    const childrenInfo = complexes.map(([k, v]) => {
      const result = walk(v, k, x + X_OFFSET);
      totalHeightOfChildren += result.branchHeight + Y_GAP;
      return result;
    });

    if (totalHeightOfChildren > 0) totalHeightOfChildren -= Y_GAP;

    const branchHeight = Math.max(estimatedNodeHeight, totalHeightOfChildren);

    return {
      label,
      branchHeight,
      nodeHeight: estimatedNodeHeight,
      render: (finalY) => {
        const nodeY = finalY + (branchHeight / 2) - (estimatedNodeHeight / 2);
        const nodeEl = createNode(label, x, nodeY, Object.fromEntries(primitives));

        let currentY = finalY;
        childrenInfo.forEach(child => {
          const childNodeEl = child.render(currentY);
          connect(nodeEl, childNodeEl);
          currentY += child.branchHeight + Y_GAP;
        });

        return nodeEl;
      }
    };
  }

  const startX = 5000;
  const startY = 5000;
  const tree = walk(data, "Root", startX);
  tree.render(startY);

  const rect = runtime.container.getBoundingClientRect();
  runtime.state.x = (rect.width / 2) - (startX * runtime.state.scale);
  runtime.state.y = (rect.height / 2) - ((startY + tree.branchHeight / 2) * runtime.state.scale);

  applyTransform();
}