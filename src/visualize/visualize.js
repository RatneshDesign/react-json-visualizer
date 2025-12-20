// import { runtime } from "../runtime.js";
// import { createNode } from "../dom/node.js";
// import { connect } from "../dom/connection.js";


// export function applyTransform() {
//   const container = runtime.container;
//   const workspace = runtime.workspace;
//   if (!container || !workspace) return;

//   const rect = container.getBoundingClientRect();
//   // Limit logic: prevent dragging into the void
//   const scaledSize = runtime.W_SIZE * runtime.state.scale;
//   const minX = rect.width - scaledSize;
//   const minY = rect.height - scaledSize;

//   runtime.state.x = Math.min(0, Math.max(minX, runtime.state.x));
//   runtime.state.y = Math.min(0, Math.max(minY, runtime.state.y));

//   workspace.style.transform = `translate(${runtime.state.x}px, ${runtime.state.y}px) scale(${runtime.state.scale})`;

//   // Refresh connections
//   runtime.connectionList.forEach(fn => fn());
// }



// export function visualize(data) {
//   runtime.workspace.querySelectorAll(".node").forEach(n => n.remove());
//   runtime.svg.innerHTML = "";
//   runtime.connectionList.length = 0;

//   const columnWidth = 350;
//   const rowHeight = 180;

//   function walk(obj, label, x, y) {
//     const primitives = {};
//     const complexes = [];

//     Object.entries(obj).forEach(([k, v]) => {
//       if (v && typeof v === "object") {
//         complexes.push({ key: k, val: v });
//       }
//       primitives[k] = v;
//     });

//     const node = createNode(label, x, y, primitives);

//     complexes.forEach((item, index) => {
//       const child = walk(
//         item.val,
//         item.key,
//         x + columnWidth,
//         y + index * rowHeight
//       );
//       connect(node, child);
//     });

//     return node;
//   }

//   // 👇 SAME AS YOUR ORIGINAL CODE
//   walk(
//     data,
//     "Root",
//     runtime.W_SIZE / 2 - 500,
//     runtime.W_SIZE / 2 - 200
//   );

//   applyTransform(); // 🔥 THIS WAS MISSING
// }

import { runtime } from "../runtime.js";
import { createNode } from "../dom/node.js";
import { connect } from "../dom/connection.js";

export function applyTransform() {
  const { x, y, scale } = runtime.state;
  runtime.workspace.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  // Trigger line updates
  runtime.connectionList.forEach(fn => fn());
}

export function visualize(data) {
  runtime.workspace.querySelectorAll(".node").forEach(n => n.remove());
  runtime.svg.innerHTML = "";
  runtime.connectionList.length = 0;

  // 1. Define the Virtual Center
  const centerX = 10000;
  const centerY = 10000;

  function walk(obj, label, x, y) {
    const primitives = {};
    const complexes = [];
    Object.entries(obj).forEach(([k, v]) => {
      if (v && typeof v === 'object' && v !== null) complexes.push({ k, v });
      else primitives[k] = v;
    });

    const node = createNode(label, x, y, primitives);

    complexes.forEach((item, i) => {
      // Dynamic spacing: if many items, spread them out more
      const child = walk(item.v, item.k, x + 400, y + (i * 200) - (complexes.length * 100));
      connect(node, child);
    });
    return node;
  }

  // 2. Build the tree
  walk(data, "Root", centerX, centerY);

  // 3. Center the camera on the Root node immediately
  const rect = runtime.container.getBoundingClientRect();
  runtime.state.x = (rect.width / 2) - (centerX * runtime.state.scale);
  runtime.state.y = (rect.height / 2) - (centerY * runtime.state.scale);

  // 4. Final render pass
  requestAnimationFrame(() => applyTransform());
}