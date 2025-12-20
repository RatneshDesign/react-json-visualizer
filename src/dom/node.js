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

  Object.entries(data).forEach(([k, v]) => {
    const row = document.createElement("div");
    row.className = "data-row";

    let val = v;
    let type = typeof v;

    if (v && typeof v === "object") {
      val = Array.isArray(v) ? `Array(${v.length})` : "Object";
      type = "ref";
    }

    row.innerHTML =
      `<span class="data-key">${k}</span>` +
      `<span class="data-value ${type}">${val}</span>`;

    body.appendChild(row);
  });

  runtime.workspace.appendChild(node);

  node.querySelector(".collapse-btn").onclick = (e) => {
    body.classList.toggle("collapsed");
    e.target.textContent = body.classList.contains("collapsed") ? "+" : "−";
    // Re-draw connections
    runtime.connectionList.forEach(fn => fn());
  };

  return node;
}
