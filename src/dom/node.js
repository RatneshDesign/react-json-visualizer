import { runtime } from "../runtime.js";

export function createNode(title, x, y, data) {
  const node = document.createElement("div");
  node.className = "node";
  node.style.left = x + "px";
  node.style.top = y + "px";

  node.innerHTML = `
    <div class="header">
      <div class="title">${title}</div>
      <button class="collapse-btn">−</button>
    </div>
    <div class="node-body"></div>
  `;

  const body = node.querySelector(".node-body");

  // Inside createNode function
  Object.entries(data).forEach(([k, v]) => {
    const row = document.createElement("div");
    row.className = "data-row";

    let val = v;
    let type = typeof v;

    if (v && typeof v === "object") {
      val = Array.isArray(v) ? `Array(${v.length})` : "Object";
      type = "ref";
    }

    // json data key and values , and its type
    row.innerHTML = `
    <span class="data-key">${k}</span>
    <span class="data-value ${type}">${val}</span>
  `;

    body.appendChild(row);
  });

  runtime.workspace.appendChild(node);

  const btn = node.querySelector(".collapse-btn");

  btn.onclick = (e) => {
    e.stopPropagation();
    const isCollapsed = body.classList.toggle("collapsed");
    btn.textContent = isCollapsed ? "+" : "−";

    // Runs connection updates during the 300ms CSS transition
    const startTime = performance.now();
    const animateLines = (now) => {
      runtime.connectionList.forEach(fn => fn());
      if (now - startTime < 350) {
        requestAnimationFrame(animateLines);
      }
    };
    requestAnimationFrame(animateLines);
  };

  return node;
}