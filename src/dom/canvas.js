// dom/canvas.js
import { runtime } from "../runtime.js";
import { applyTransform } from "../visualize/visualize.js";

export function initCanvas() {
  if (runtime.container) return;

  // 1. Create Elements
  runtime.container = document.createElement("div");
  runtime.container.className = "canvas-wrap";

  runtime.workspace = document.createElement("div");
  runtime.workspace.className = "workspace";
  // Crucial: Workspace needs fixed dimensions like original
  runtime.workspace.style.width = "9000px";
  runtime.workspace.style.height = "6000px";

  runtime.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  runtime.svg.id = "connections";

  runtime.workspace.appendChild(runtime.svg);
  runtime.container.appendChild(runtime.workspace);
  document.body.appendChild(runtime.container);

  // 2. Attach Interaction Logic
  setupInteractions();
}

function setupInteractions() {
  let isDragging = false;
  let lastPos = { x: 0, y: 0 };

  runtime.container.onpointerdown = (e) => {
    if (e.target.closest('.collapse-btn') || e.target.closest('.node')) return;
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
    runtime.container.setPointerCapture(e.pointerId);
  };

  runtime.container.onpointermove = (e) => {
    if (!isDragging) return;
    runtime.state.x += e.clientX - lastPos.x;
    runtime.state.y += e.clientY - lastPos.y;
    lastPos = { x: e.clientX, y: e.clientY };

    // We need to import applyTransform or move it to a shared utility
    updateDOMTransform();
  };

  runtime.container.onpointerup = () => isDragging = false;

  runtime.container.onwheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    runtime.state.scale = Math.min(2, Math.max(0.2, runtime.state.scale * (e.deltaY < 0 ? 1.05 : 0.95)));
    updateDOMTransform();
  };

  // ZOOM Logic
  runtime.container.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.05 : 0.95;
      runtime.state.scale = Math.min(2, Math.max(0.2, runtime.state.scale * delta));
      applyTransform();
    }
  }, { passive: false });

  runtime.container.onpointerdown = (e) => {
    if (e.target.closest('.node')) return; // Don't drag if clicking a node
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
    runtime.container.setPointerCapture(e.pointerId);
  };

runtime.container.onpointermove = (e) => {
  if (!isDragging) return;
  
  // Calculate movement
  const dx = e.clientX - lastPos.x;
  const dy = e.clientY - lastPos.y;
  
  runtime.state.x += dx;
  runtime.state.y += dy;
  
  lastPos = { x: e.clientX, y: e.clientY };
  applyTransform();
};
  runtime.container.onpointerup = () => isDragging = false;


}

export function updateDOMTransform() {
  const ws = runtime.workspace;
  const s = runtime.state;
  ws.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;

  // Trigger line updates
  runtime.connectionList.forEach(fn => fn());
}

