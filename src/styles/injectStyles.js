let injected = false;

export function injectStyles() {
  if (injected) return;
  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-json-auto-flow", "true");

  style.textContent = `
  /* === JSON Auto Flow Styles === */
  :root {
    --bg: #e5e7eb;
    --node-bg: #ffffff;
    --node-border: #d1d5db;
    --accent: #2563eb;
    --key-color: #7c3aed;
    --string-color: #059669;
    --number-color: #d97706;
    --muted: #64748b;
    --line-color: #94a3b8;
  }

/* Sidebar - Left Side */
  .canvas-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background: #ffffff;
    border-right: 1px solid var(--node-border);
    z-index: 1100;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 4px 0 10px rgba(0,0,0,0.05);
  }

  /* When closed, slide it out of view */
  .canvas-sidebar.collapsed {
    transform: translateX(-100%);
  }

  .sidebar-header {
    padding: 15px;
    background: #f8fafc;
    border-bottom: 1px solid var(--node-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
  }

  .sidebar-content {
    flex: 1;
    overflow: auto;
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #334155;
    background: #ffffff;
  }

  /* Floating Action Buttons */
  .fab-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1200;
  }

  .fab-container button {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  .fab-container button:hover {
    transform: scale(1.1);
    background: #f1f5f9;
  }

  /* Make sure nodes stay above workspace but below UI */
  .node { z-index: 10; }
  #connections { z-index: 1; }



  .canvas-wrap {
    position: fixed; inset: 0;
    overflow: hidden;
    cursor: grab;
    background-color: #f3f4f6; /* The gray base */
    /* The grid is now on the FIXED container */
    background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
    background-size: 32px 32px;
    user-select: none;
  }

  .workspace {
    position: absolute;
    /* Remove fixed width/height and background */
    width: 6000px; height: 6000px; 
    background: transparent; 
    border: none;
    transform-origin: 0 0;
  }

  .canvas-wrap:active {
    cursor: grabbing;
  }



  .workspace::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#cbd5e1 1.2px, transparent 1.2px);
    background-size: 32px 32px;
    pointer-events: none;
  }

.node {
  position: absolute;
  width: fit-content;
  max-width: 550px;
  min-width: 220px;
  background: var(--node-bg);
  border: 1px solid var(--node-border);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  font-size: 13px;
  z-index: 10;
  user-select: none;
}


  .node .header {
    padding: 10px 14px;
    background: #f8fafc;
    border-bottom: 1px solid var(--node-border);
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .node .title {
    font-weight: 700;
    color: #1e293b;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.05em;
  }

  .collapse-btn {
    border: none;
    background: #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
    color: var(--muted);
    padding: 2px 8px;
    font-size: 10px;
  }
.node-body {
  max-height: 1000px;
  opacity: 1;
  padding: 12px;
  overflow-y: auto; 
  overflow-x: hidden;
  transition:
    max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease,
    padding 0.35s ease;
}

/* Ensure the collapsed state truly hides everything */
.node-body.collapsed {
  max-height: 0; /* Use max-height instead of height for the transition */
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

.data-value {
  padding-left: 4px;
  color: var(--string-color);
  word-break: break-all;

}
 

  .data-key::after {
    content: ":";
    color: #94a3b8;
  }

  .data-value.string { color: var(--string-color); }
  .data-value.number { color: var(--number-color); }
  .data-value.ref {
    color: var(--accent);
    font-style: italic;
    font-weight: 600;
  }

#connections { 
    position: absolute; 
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; 
    overflow: visible; 
    z-index: 1; 
  }

  .connector { 
    fill: none; 
    stroke: #94a3b8; 
    stroke-width: 2px; 
    vector-effect: non-scaling-stroke;
  }


  `;

  document.head.appendChild(style);
}