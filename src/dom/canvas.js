// dom/canvas.js
import { runtime } from "../runtime.js";
import { applyTransform } from "../visualize/visualize.js";
import logoUrl from '../logo.png';

export function initCanvas() {
  if (runtime.container) return;

  const scriptUrl = import.meta.url;
  // Create a URL pointing to the logo in the same directory (or adjust path)
  // const logoUrl = new URL('../logo.png', scriptUrl).href;
  // 1. Create Toggle Button
  const toggleBtn = document.createElement("button");
  // Inside your button creation logic
  toggleBtn.className = "canvas-toggle-btn";
  toggleBtn.innerHTML = `<img src="${logoUrl}" alt="Logo" style="object-fit: contain;">`;

  // toggleBtn.className = "canvas-toggle-btn";
  // toggleBtn.innerHTML = `
  //   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 6px;">
  //     <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  //   </svg>
  //   <span>Show Canvas</span>
  // `;
  toggleBtn.onclick = () => toggleCanvas(toggleBtn, sidebarToggleBtn);
  document.body.appendChild(toggleBtn);

  // 2. Create Sidebar Toggle Button (Fixed)
  const sidebarToggleBtn = document.createElement("button");
  sidebarToggleBtn.className = "sidebar-toggle-btn";
  sidebarToggleBtn.style.display = "none"; // Hidden initially
  sidebarToggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
      <path d="M3 7h14M7 3v14" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `;
  sidebarToggleBtn.title = "Toggle Sidebar";
  sidebarToggleBtn.onclick = () => toggleSidebarVisibility(sidebarToggleBtn);
  document.body.appendChild(sidebarToggleBtn);

  // 3. Create Sidebar
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

  // Sidebar Content (scrollable area)
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

  // 4. Create Canvas Elements
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

  // 5. Attach Interaction Logic
  setupInteractions();
}

function toggleCanvas(btn, sidebarBtn) {
  // We keep your display check exactly as it was
  const isVisible = runtime.container.style.display !== "none";

  if (isVisible) {
    // === CLOSE ANIMATION (Functionality preserved) ===
    runtime.container.style.opacity = "0";
    runtime.sidebar.style.opacity = "0";

    setTimeout(() => {
      runtime.container.style.display = "none";
      runtime.sidebar.style.display = "none";
      sidebarBtn.style.display = "none";

      // Resetting opacities for the next "Open" trigger
      runtime.container.style.opacity = "1";
      runtime.sidebar.style.opacity = "1";
    }, 300);

    // Swap text logic for Class logic (Better for images)
    btn.classList.remove("active");
  } else {
    // === OPEN ANIMATION (Functionality preserved) ===
    runtime.container.style.display = "block";
    runtime.sidebar.style.display = "flex";
    sidebarBtn.style.display = "flex";
    runtime.sidebar.style.opacity = "0";

    setTimeout(() => {
      runtime.sidebar.style.opacity = "1";
    }, 10);

    btn.classList.add("active");
  }
}

function toggleSidebarVisibility(sidebarBtn) {
  // const isVisible = runtime.sidebar.style.display !== "none";

  // if (isVisible) {
  //   // Close sidebar
  //   runtime.sidebar.style.opacity = "0";
  //   setTimeout(() => {
  //     runtime.sidebar.style.display = "none";
  //   }, 300);
  // } else {
  //   // Open sidebar
  //   runtime.sidebar.style.display = "flex";
  //   runtime.sidebar.style.opacity = "0";
  //   setTimeout(() => {
  //     runtime.sidebar.style.opacity = "1";
  //   }, 10);
  // }
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

  // Update connection lines color
  updateConnectionColors(newTheme);
}

function updateConnectionColors(theme) {
  const lines = runtime.svg.querySelectorAll('.connector');
  const color = theme === 'dark' ? '#64748b' : '#94a3b8';
  lines.forEach(line => {
    line.setAttribute('stroke', color);
  });
}

// Update sidebar with JSON data from visualize
export function updateSidebarWithData(data) {
  if (!runtime.sidebarContent) return;

  const content = buildJSONTree(data);
  runtime.sidebarContent.innerHTML = content;
}

function buildJSONTree(obj, level = 0) {
  let html = '<div class="json-tree">';

  for (const [key, value] of Object.entries(obj)) {
    const isObject = typeof value === 'object' && value !== null;
    const isArray = Array.isArray(value);

    if (isObject) {
      html += `
        <div class="json-item" style="padding-left: ${level * 4}px">
          <div class="json-key-complex">
            <svg class="expand-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="key">${key}</span>
            <span class="type-badge">${isArray ? 'array' : 'object'}</span>
          </div>
          <div class="json-nested">
            ${buildJSONTree(value, level + 1)}
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
          <span class="key">${key}:</span>
          <span class="value ${valueType}">${displayValue}</span>
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

    let newX = runtime.state.x + dx;
    let newY = runtime.state.y + dy;

    const padding = 1500;
    const minX = -7000, maxX = 2000;
    const minY = -7000, maxY = 2000;

    runtime.state.x = Math.max(minX, Math.min(maxX, newX));
    runtime.state.y = Math.max(minY, Math.min(maxY, newY));

    lastPos = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  runtime.container.onpointerup = () => isDragging = false;

  runtime.container.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.05 : 0.95;
      runtime.state.scale = Math.min(2, Math.max(0.2, runtime.state.scale * delta));
      applyTransform();
    }
  }, { passive: false });

  // Add event delegation for collapsible JSON items
  document.addEventListener('click', (e) => {
    const keyComplex = e.target.closest('.json-key-complex');
    if (keyComplex) {
      const item = keyComplex.parentElement;
      item.classList.toggle('collapsed');
    }
  });
}

export function updateDOMTransform() {
  const ws = runtime.workspace;
  const s = runtime.state;
  ws.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;
  runtime.connectionList.forEach(fn => fn());
}