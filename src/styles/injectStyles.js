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

  .canvas-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: grab;
   user-select: none;
  }

  .canvas-wrap:active {
    cursor: grabbing;
  }

  .workspace {
    position: absolute;
    width: 9000px;
    height: 6000px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    transform-origin: 0 0;
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
    padding: 12px;
  }

  .node-body.collapsed {
    display: none;
  }

  .data-row {
    display: flex;
    font-family: ui-monospace, monospace;
    margin-bottom: 4px;
    white-space: nowrap;
  }

  .data-key {
    color: var(--key-color);
    font-weight: 600;
    margin-right: 8px;
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

  svg#connections {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  path.connector {
    fill: none;
    stroke: var(--line-color);
    stroke-width: 2px;
  }
        #connections { 
      position: absolute; inset: 0; 
      pointer-events: none; overflow: visible; 
      z-index: 1; 
    }
    .connector { 
      fill: none; stroke: #94a3b8; stroke-width: 2.5px; 
      vector-effect: non-scaling-stroke; /* Keeps lines crisp when zooming */
    }
  `;

  document.head.appendChild(style);
}

// // styles/injectStyles.js
// export function injectStyles() {
//   const style = document.createElement('style');
//   style.textContent = `
//     .canvas-wrap {
//       position: fixed; inset: 0; overflow: hidden;
//       background: #e5e7eb; cursor: grab;
//     }
//     .workspace {
//       position: absolute;
//       width: 20000px; height: 20000px; /* Huge virtual space */
//       transform-origin: 0 0;
//     }
//     #connections {
//       position: absolute; inset: 0;
//       pointer-events: none; overflow: visible;
//       z-index: 1;
//     }
//     .connector {
//       fill: none; stroke: #94a3b8; stroke-width: 2.5px;
//       vector-effect: non-scaling-stroke; /* Keeps lines crisp when zooming */
//     }
//     .node {
//       position: absolute; z-index: 10; width: 250px;
//       background: white; border: 1px solid #d1d5db;
//       border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//     }
//   `;
//   document.head.appendChild(style);
// }