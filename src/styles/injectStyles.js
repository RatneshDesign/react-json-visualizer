let injected = false;

export function injectStyles() {
  if (injected) return;
  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-json-auto-flow", "true");

  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
  /* === JSON Auto Flow Styles === */
  :root {
    --canvas-bg: #f3f4f6;
    --canvas-dot: #cbd5e1;
    --bg: #e5e7eb;
    --node-bg: #ffffff;
    --node-header-bg: #f8fafc;
    --node-border: #d1d5db;
    --accent: #7538f8ff;          
    --accent-hover: #8741ffff;
    --key-color: #7c3aed;
    --string-color: #059669;
    --number-color: #d97706;
    --muted: #64748b;
    --line-color: #94a3b8;
    --sidebar-bg: #ffffff;
    --sidebar-header: #f8fafc;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --hover-bg: #f8fafc;
    --collapse-btn-bg: #e2e8f0;
    --collapse-btn-hover: #cbd5e1;
  }

 [data-theme="dark"] {
    --canvas-bg: #0b0e14;          /* Deepest background */
    --canvas-dot: #1e293b;        /* Subtle grid dots */
    --bg: #1e293b;
    --node-bg: #161b22;           /* Dark node card */
    --node-header-bg: #0d1117;    /* Slightly darker header */
    --node-border: #30363d;       /* Crisp border */
    --accent: #6230cdff;            /* Sky blue accent */
    --accent-hover: #8741ffff;
    --key-color: #c084fc;         /* Soft purple key */
    --string-color: #4ade80;      /* Emerald string */
    --number-color: #fb923c;      /* Orange number */
    --muted: #8b949e;
    --line-color: #484f58;        /* Muted connector lines */
    --sidebar-bg: #0d1117;
    --sidebar-header: #161b22;
    --text-primary: #e6edf3;
    --text-secondary: #7d8590;
    --hover-bg: #21262d;
    --collapse-btn-bg: #21262d;
    --collapse-btn-hover: #30363d;
  }

  * {
    transition: background-color var(--transition-speed) ease, 
                border-color var(--transition-speed) ease, 
                color var(--transition-speed) ease,
                stroke var(--transition-speed) ease;
  }

  /* Toggle Button - Modern Design */
  .canvas-toggle-btn {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10001;
    background: var(--accent);
    height: 40px;
    width: 40px;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
  }
    .canvas-toggle-btn img{
    width:100%;
    height:100%;
    object-fit: contain;
    }

  // .canvas-toggle-btn:hover {
  //   background: var(--accent-hover);
  //   transform: translateY(-2px);
  //   box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  // }

  .canvas-toggle-btn:active {
    transform: translateY(0);
  }

  .canvas-toggle-btn.active {
    background: #dc2626;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  // .canvas-toggle-btn.active:hover {
  //   background: #b91c1c;
  //   box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
  // }

  /* Sidebar Toggle Button - Fixed on Left */
  .sidebar-toggle-btn {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10001;
    padding: 10px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: none;
    align-items: center;
    justify-content: center;
  }

  .sidebar-toggle-btn:hover {
    background: var(--accent-hover);
    // transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  .sidebar-toggle-btn:active {
    transform: translateY(0);
  }

  /* Sidebar - Premium Modern Design */
  .canvas-sidebar {
    font-family: "Lexend", sans-serif;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 360px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--node-border);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.08);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    will-change: transform;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateX(0);
  }

  .sidebar-toggle-btn {
    transition: transform 0.4s cubic-bezier(0.05, 0.7, 0.1, 1), background 0.3s;
  }

.canvas-sidebar.collapsed {
    transform: translateX(-100%);
  }

  .sidebar-header {
    padding: 20px 24px;
    background: var(--sidebar-header);
    border-bottom: 1px solid var(--node-border);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);
  }

  .sidebar-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left:10px;
    color: var(--text-primary);
  }

  .sidebar-title svg {
    opacity: 0.7;
  }

  .sidebar-title h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .sidebar-collapse-btn {
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    color: var(--muted);
    padding: 8px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-collapse-btn:hover {
    background: var(--hover-bg);
    color: var(--text-primary);
  }

  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    padding: 16px;
    font-family: ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
    font-size: 13px;
  }

  .sidebar-content::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .sidebar-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar-content::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .sidebar-content::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  .sidebar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }

  .sidebar-placeholder p {
    margin: 0 0 4px 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .sidebar-placeholder span {
    font-size: 13px;
    color: var(--muted);
  }

  /* JSON Tree Styles */
  .json-tree {
    line-height: 1.6;
  }

  .json-item {
    padding: 4px 0;
    transition: background 0.15s;
    border-radius: 6px;
    margin: 2px 0;
  }

  .json-item:hover {
    background: var(--hover-bg);
  }

  .json-key-complex {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    transition: background 0.15s;
  }

  .json-key-complex:hover {
    background: var(--hover-bg);
  }

  .expand-icon {
    flex-shrink: 0;
    transition: transform 0.2s;
    color: var(--muted);
  }

  .json-item.collapsed .expand-icon {
    transform: rotate(0deg);
  }

  .json-item:not(.collapsed) .expand-icon {
    transform: rotate(90deg);
  }

  .json-item.collapsed .json-nested {
    display: none;
  }

  .json-nested {
    margin-left: 8px;
    border-left: 2px solid #e2e8f0;
    padding-left: 8px;
  }

  .json-item .key {
    font-weight: 600;
    color: var(--key-color);
  }

  .json-item .value {
    color: var(--text-secondary);
  }

  .json-item .value.string {
    color: var(--string-color);
  }

  .json-item .value.number {
    color: var(--number-color);
  }

  .json-item .value.boolean {
    color: #dc2626;
    font-weight: 600;
  }

  .json-item .value.null {
    color: var(--muted);
    font-style: italic;
  }

  .type-badge {
    display: inline-block;
    padding: 2px 8px;
    background: #e0e7ff;
    color: #4338ca;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--node-border);
    background: var(--sidebar-header);
    backdrop-filter: blur(8px);
  }

  .theme-toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 12px 16px;
    background: var(--node-bg);
    border: 1px solid var(--node-border);
    border-radius: 8px;
  }

  .theme-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .theme-toggle-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  .toggle-track {
    width: 48px;
    height: 24px;
    background: #cbd5e1;
    border-radius: 12px;
    position: relative;
    transition: background 0.3s;
  }

  [data-theme="dark"] .toggle-track {
    background: #3b82f6;
  }

  .toggle-thumb {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  [data-theme="dark"] .toggle-thumb {
    transform: translateX(24px);
  }

  .toggle-thumb svg {
    width: 12px;
    height: 12px;
  }

  .sun-icon {
    color: #f59e0b;
  }

  .moon-icon {
    color: #3b82f6;
  }

  .sidebar-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .sidebar-link {
    padding: 10px 12px;
    // background: var();
    border: 1px solid var(--node-border);
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    color: var(--text-primary);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .sidebar-link:hover {
    background: var(--hover-bg);
    border-color: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.15);
  }

  .sidebar-link:active {
    transform: translateY(0);
  }

  /* Canvas Wrapper */
  .canvas-wrap {
    font-family: "Lexend", sans-serif;
    position: fixed;
    inset: 0;
    overflow: hidden;
    cursor: grab;
    background-color: var(--canvas-bg);
    background-image: radial-gradient(var(--canvas-dot) 1.5px, transparent 1.5px);
    background-size: 32px 32px;
    user-select: none;
    transition: opacity 0.3s ease, background-color 0.3s ease;
  }

  .canvas-wrap:active {
    cursor: grabbing;
  }

  .workspace {
    position: absolute;
    width: 6000px;
    height: 6000px;
    background: transparent;
    border: none;
    transform-origin: 0 0;
    transition: transform 0.1s ease-out;
  }

  /* Node Styles */
  .node {
    position: absolute;
    width: fit-content;
    max-width: 550px;
    min-width: 220px;
    background: var(--node-bg);
    border: 1px solid var(--node-border);
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
    font-size: 13px;
    z-index: 10;
    user-select: none;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .node:hover {
    box-shadow: 0 8px 16px -2px rgb(0 0 0 / 0.15), 0 4px 8px -2px rgb(0 0 0 / 0.08);
    transform: translateY(-1px);
  }

  .node .header {
    padding: 10px 14px;
    background: var(--node-header-bg);
    border-bottom: 1px solid var(--node-border);
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .node .title {
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.05em;
  }

  .collapse-btn {
    border: none;
    background: var(--collapse-btn-bg);
    border-radius: 4px;
    cursor: pointer;
    color: var(--muted);
    padding: 2px 8px;
    font-size: 10px;
    transition: all 0.2s;
  }

  .collapse-btn:hover {
    background: var(--collapse-btn-hover);
  }

  .node-body {
    max-height: 1000px;
    opacity: 1;
    padding: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, padding 0.35s ease;
  }
      .node-body::-webkit-scrollbar {
    display:none;
  }


  .node-body.collapsed {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
  }

  .data-row {
    display: flex;
    font-family: ui-monospace, monospace;
    margin-bottom: 8px;
  }

  .data-key {
    font-weight: bold;
    color: var(--key-color);
    margin-bottom: 2px;
  }

  .data-key::after {
    content: ":";
    color: #94a3b8;
  }

  .data-value {
    padding-left: 4px;
    color: var(--string-color);
    word-break: break-all;
  }

  .data-value.string { color: var(--string-color); }
  .data-value.number { color: var(--number-color); }
  .data-value.ref {
    color: var(--accent);
    font-style: italic;
    font-weight: 600;
  }

  /* SVG Connections */
  #connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
    z-index: 1;
  }

  .connector {
    fill: none;
    stroke: var(--line-color);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    transition: stroke 0.3s ease;
  }
  `;

  document.head.appendChild(style);
}