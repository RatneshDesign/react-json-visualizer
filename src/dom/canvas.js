import { runtime } from "../runtime.js";
import { applyTransform } from "../visualize/visualize.js";

export function initCanvas(data) {
  if (!runtime.container) {
    // 1. Root Container
    runtime.container = document.createElement("div");
    runtime.container.id = "canvas-app-root";
    runtime.container.className = "canvas-wrap";

    // 2. Sidebar (Left - Open by default)
    const sidebar = document.createElement("aside");
    sidebar.id = "json-sidebar";
    sidebar.className = "canvas-sidebar"; // Starts open
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <span>SOURCE DATA</span>
        <button class="close-sidebar">×</button>
      </div>
      <div class="sidebar-content">
        <pre id="json-viewer"></pre>
      </div>
    `;

    // 3. Workspace (Infinite area)
    runtime.workspace = document.createElement("div");
    runtime.workspace.className = "workspace";

    runtime.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    runtime.svg.id = "connections";

    runtime.workspace.appendChild(runtime.svg);
    runtime.container.appendChild(sidebar);
    runtime.container.appendChild(runtime.workspace);

    // 4. Floating Buttons
    const fabContainer = document.createElement("div");
    fabContainer.className = "fab-container";
    fabContainer.innerHTML = `
      <button id="toggle-sidebar-btn" title="Toggle Sidebar">📂</button>
      <button id="recenter-btn" title="Recenter">🏠</button>
      <button id="close-app-btn" title="Exit">✕</button>
    `;

    runtime.container.appendChild(fabContainer);
    document.body.appendChild(runtime.container);

    setupInteractions();
    setupUIEvents(sidebar, fabContainer);
  }

  // FORCE VISIBILITY
  runtime.container.style.display = "block";
  updateSidebarData(data);
}

function setupUIEvents(sidebar, fab) {
  fab.querySelector("#toggle-sidebar-btn").onclick = () => sidebar.classList.toggle("collapsed");
  sidebar.querySelector(".close-sidebar").onclick = () => sidebar.classList.add("collapsed");

  fab.querySelector("#close-app-btn").onclick = () => {
    runtime.container.style.display = "none";
  };

  fab.querySelector("#recenter-btn").onclick = () => {
    const rect = runtime.container.getBoundingClientRect();
    runtime.state.x = (rect.width / 2) - (5000 * runtime.state.scale);
    runtime.state.y = (rect.height / 2) - (5000 * runtime.state.scale);
    applyTransform();
  };
}

export function updateSidebarData(data) {
  const viewer = document.getElementById("json-viewer");
  if (viewer) viewer.textContent = JSON.stringify(data, null, 2);
}

function setupInteractions() {
  let isDragging = false;
  let lastPos = { x: 0, y: 0 };

  runtime.container.onpointerdown = (e) => {
    if (e.target.closest('.node') || e.target.closest('aside') || e.target.closest('.fab-container')) return;
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
    runtime.container.setPointerCapture(e.pointerId);
  };

  runtime.container.onpointermove = (e) => {
    if (!isDragging) return;
    runtime.state.x += e.clientX - lastPos.x;
    runtime.state.y += e.clientY - lastPos.y;
    lastPos = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  runtime.container.onpointerup = () => isDragging = false;
}

function setupInteractions() {
  let isDragging = false;
  let lastPos = { x: 0, y: 0 };

  runtime.container.onpointerdown = (e) => {
    // Only drag if clicking the background workspace
    if (e.target.closest('.node') || e.target.closest('aside') || e.target.closest('.fab-container')) return;
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
    runtime.container.setPointerCapture(e.pointerId);
  };

  runtime.container.onpointermove = (e) => {
    if (!isDragging) return;
    runtime.state.x += e.clientX - lastPos.x;
    runtime.state.y += e.clientY - lastPos.y;
    lastPos = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  runtime.container.onpointerup = () => isDragging = false;

  runtime.container.onwheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.05 : 0.95;
    runtime.state.scale = Math.min(2, Math.max(0.1, runtime.state.scale * delta));
    applyTransform();
  };
}
export function updateDOMTransform() {
  const ws = runtime.workspace;
  const s = runtime.state;
  ws.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;

  // Trigger line updates
  runtime.connectionList.forEach(fn => fn());
}

