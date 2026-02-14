import { runtime } from "../runtime.js";
import { applyTransform, centerView } from "../visualize/visualize.js";
import { escapeHTML } from "../utils/escapeHTML.js";
const logoUrl = "data:image/png;base64,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";


export function initCanvas() {
  if (runtime.container) return;

  // canvas Toggle Button
  const toggleBtn = document.createElement("button");

  toggleBtn.className = "canvas-toggle-btn";
  toggleBtn.innerHTML = `<img src="${logoUrl}" alt="Logo">`;

  toggleBtn.onclick = () => toggleCanvas(toggleBtn, sidebarToggleBtn);
  document.body.appendChild(toggleBtn);

  // Sidebar Toggle Button
  const sidebarToggleBtn = document.createElement("button");
  sidebarToggleBtn.className = "sidebar-toggle-btn";
  sidebarToggleBtn.style.display = "none";
  sidebarToggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
      <path d="M3 7h14M7 3v14" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `;
  sidebarToggleBtn.title = "Toggle Sidebar";
  sidebarToggleBtn.onclick = () => toggleSidebarVisibility(sidebarToggleBtn);
  document.body.appendChild(sidebarToggleBtn);

  // Reset View Button
  const resetViewBtn = document.createElement("button");
  resetViewBtn.className = "reset-view-btn";
  resetViewBtn.style.display = "none";
  resetViewBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  resetViewBtn.title = "Reset View (Fit to Screen)";
  resetViewBtn.onclick = () => centerView();
  document.body.appendChild(resetViewBtn);
  runtime.resetViewBtn = resetViewBtn;

  // Create Sidebar
  const sidebar = document.createElement("div");
  sidebar.className = "canvas-sidebar";
  sidebar.style.display = "none";

  // Sidebar Header
  const sidebarHeader = document.createElement("div");
  sidebarHeader.className = "sidebar-header";
  sidebarHeader.innerHTML = `
    <div class="sidebar-title">
    <h3>JSON Structure</h3>
    </div>
  `;

  // Sidebar Content
  const sidebarContent = document.createElement("div");
  sidebarContent.className = "sidebar-content";
  sidebarContent.innerHTML = `
    <div class="sidebar-placeholder">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="opacity: 0.3; margin-bottom: 12px;">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" stroke-width="2"/>
        <path d="M8 16h32M16 8v32" stroke="currentColor" stroke-width="2"/>
      </svg>
      <p>No data visualized yet</p>
      <span>Load JSON to see structure</span>
    </div>
  `;

  // Sidebar Footer
  const sidebarFooter = document.createElement("div");
  sidebarFooter.className = "sidebar-footer";
  sidebarFooter.innerHTML = `
    <div class="theme-toggle-container">
      <span class="theme-label">Theme</span>
      <button class="theme-toggle-btn" data-theme="light">
        <div class="toggle-track">
          <div class="toggle-thumb">
            <svg class="sun-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="2" fill="currentColor"/>
              <path d="M6 1v1M6 10v1M11 6h-1M2 6H1M9.5 2.5l-.7.7M3.2 8.8l-.7.7M9.5 9.5l-.7-.7M3.2 3.2l-.7-.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <svg class="moon-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" style="display: none;">
              <path d="M10 6.5a4.5 4.5 0 0 1-8.5 2A4.5 4.5 0 0 0 8 2a4.5 4.5 0 0 1 2 4.5Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </button>
    </div>
    <div class="sidebar-links">
      <a href="https://ratneshkumawat.vercel.app/" class="sidebar-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2C9.79086 2 8 6.47715 8 12C8 17.5228 9.79086 22 12 22Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M2 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Portfolio
      </a>
      <a href="https://github.com/RatneshDesign/json-visualizer" class="sidebar-link">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.167c-3.22 0-5.833 2.612-5.833 5.833 0 2.577 1.672 4.762 3.992 5.537.292.053.398-.127.398-.281 0-.14-.005-.598-.008-1.085-1.623.353-1.965-.686-1.965-.686-.265-.675-.648-.854-.648-.854-.53-.362.04-.355.04-.355.586.042.895.602.895.602.521.893 1.368.635 1.701.486.053-.378.204-.636.371-.782-1.298-.148-2.664-.649-2.664-2.889 0-.638.228-1.16.602-1.569-.06-.148-.261-.743.057-1.548 0 0 .491-.157 1.607.6a5.579 5.579 0 0 1 1.463-.197c.496.002.996.067 1.463.197 1.115-.757 1.605-.6 1.605-.6.32.805.118 1.4.058 1.548.375.409.601.931.601 1.569 0 2.246-1.368 2.738-2.671 2.883.21.181.397.538.397 1.084 0 .782-.007 1.413-.007 1.604 0 .156.105.337.4.28a5.838 5.838 0 0 0 3.989-5.536c0-3.22-2.613-5.833-5.833-5.833Z" fill="currentColor"/>
        </svg>
        GitHub
      </a>
    </div>
  `;

  sidebar.appendChild(sidebarHeader);
  sidebar.appendChild(sidebarContent);
  sidebar.appendChild(sidebarFooter);
  document.body.appendChild(sidebar);

  // Theme toggle functionality
  const themeToggle = sidebarFooter.querySelector('.theme-toggle-btn');
  themeToggle.onclick = () => toggleTheme(themeToggle);

  // Store reference
  runtime.sidebarContent = sidebarContent;
  runtime.sidebar = sidebar;
  runtime.sidebarToggleBtn = sidebarToggleBtn;

  // Createed Canvas Elements
  runtime.container = document.createElement("div");
  runtime.container.className = "canvas-wrap";
  runtime.container.style.display = "none";

  runtime.workspace = document.createElement("div");
  runtime.workspace.className = "workspace";
  runtime.workspace.style.width = "9000px";
  runtime.workspace.style.height = "6000px";

  runtime.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  runtime.svg.id = "connections";

  runtime.workspace.appendChild(runtime.svg);
  runtime.container.appendChild(runtime.workspace);
  document.body.appendChild(runtime.container);

  // Attached Interactions
  setupInteractions();
}

function toggleCanvas(btn, sidebarBtn) {
  const isVisible = runtime.container.style.display !== "none";

  if (isVisible) {
    // CLOSE ANIMATION
    runtime.container.style.opacity = "0";
    runtime.sidebar.style.opacity = "0";

    setTimeout(() => {
      runtime.container.style.display = "none";
      runtime.sidebar.style.display = "none";
      sidebarBtn.style.display = "none";
      runtime.resetViewBtn.style.display = "none";

      // Resetting opacities for the next "Open" trigger
      runtime.container.style.opacity = "1";
      runtime.sidebar.style.opacity = "1";
    }, 300);

    // Swap text logic for Class logic
    btn.classList.remove("active");
  } else {
    //OPEN ANIMATION
    runtime.container.style.display = "block";
    runtime.sidebar.style.display = "flex";
    sidebarBtn.style.display = "flex";
    runtime.resetViewBtn.style.display = "flex";
    runtime.sidebar.style.opacity = "0";

    setTimeout(() => {
      runtime.sidebar.style.opacity = "1";
    }, 10);

    btn.classList.add("active");
  }
}

function toggleSidebarVisibility(sidebarBtn) {
  runtime.sidebar.classList.toggle("collapsed");
}

function toggleTheme(btn) {
  const currentTheme = btn.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  btn.setAttribute('data-theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);

  const sunIcon = btn.querySelector('.sun-icon');
  const moonIcon = btn.querySelector('.moon-icon');

  if (newTheme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }

  // Updating connection lines color
  updateConnectionColors(newTheme);
}

function updateConnectionColors(theme) {
  // CSS variables on .connector and .connector-dot handle theme changes automatically
}

// Updating sidebar with JSON data
export function updateSidebarWithData(data) {
  if (!runtime.sidebarContent) return;

  const seen = new WeakSet();
  const content = buildJSONTree(data, 0, seen);
  runtime.sidebarContent.innerHTML = content;
}

function buildJSONTree(obj, level = 0, seen) {
  let html = '<div class="json-tree">';

  for (const [key, value] of Object.entries(obj)) {
    const isObject = typeof value === 'object' && value !== null;
    const isArray = Array.isArray(value);

    if (isObject) {
      if (seen.has(value)) {
        html += `
          <div class="json-item" style="padding-left: ${level * 4}px">
            <span class="key">${escapeHTML(key)}:</span>
            <span class="value" style="color: var(--muted); font-style: italic;">[Circular]</span>
          </div>
        `;
        continue;
      }
      seen.add(value);

      html += `
        <div class="json-item" style="padding-left: ${level * 4}px">
          <div class="json-key-complex">
            <svg class="expand-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="key">${escapeHTML(key)}</span>
            <span class="type-badge">${isArray ? 'array' : 'object'}</span>
          </div>
          <div class="json-nested">
            ${buildJSONTree(value, level + 1, seen)}
          </div>
        </div>
      `;
    } else {
      const valueType = typeof value;
      const displayValue = value === null ? 'null' :
        valueType === 'string' ? `"${value}"` :
          String(value);

      html += `
        <div class="json-item" style="padding-left: ${level * 4}px">
          <span class="key">${escapeHTML(key)}:</span>
          <span class="value ${valueType}">${escapeHTML(displayValue)}</span>
        </div>
      `;
    }
  }

  html += '</div>';
  return html;
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

    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;

    runtime.state.x += dx;
    runtime.state.y += dy;

    lastPos = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  runtime.container.onpointerup = () => isDragging = false;

  runtime.container.addEventListener("wheel", (e) => {
    e.preventDefault();

    // Get cursor position relative to container
    const rect = runtime.container.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Calculate world position before zoom
    const worldX = (cursorX - runtime.state.x) / runtime.state.scale;
    const worldY = (cursorY - runtime.state.y) / runtime.state.scale;

    // Apply zoom
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(3, Math.max(0.1, runtime.state.scale * delta));

    // Calculate new pan position to keep cursor at same world position
    runtime.state.x = cursorX - worldX * newScale;
    runtime.state.y = cursorY - worldY * newScale;
    runtime.state.scale = newScale;

    applyTransform();
  }, { passive: false });

  // event delegation for collapsible JSON items
  document.addEventListener('click', (e) => {
    const keyComplex = e.target.closest('.json-key-complex');
    if (keyComplex) {
      const item = keyComplex.parentElement;
      item.classList.toggle('collapsed');
    }
  });
}

