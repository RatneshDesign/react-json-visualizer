import { runtime } from "../runtime.js";

export function connect(a, b) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "connector");

  const sC = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const eC = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  [sC, eC].forEach(c => {
    c.setAttribute("r", "5");
    c.setAttribute("class", "connector-dot");
    runtime.svg.appendChild(c);
  });
  runtime.svg.appendChild(path);

  const update = () => {
    // If offsetWidth is 0, the CSS hasn't loaded yet
    const x1 = a.offsetLeft + (a.offsetWidth || 250);
    const y1 = a.offsetTop + 20;
    const x2 = b.offsetLeft;
    const y2 = b.offsetTop + 20;

    const cp = Math.max(Math.abs(x2 - x1) * 0.5, 40);
    path.setAttribute("d", `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`);
    sC.setAttribute("cx", x1); sC.setAttribute("cy", y1);
    eC.setAttribute("cx", x2); eC.setAttribute("cy", y2);
  };

  runtime.connectionList.push(update);

  requestAnimationFrame(update);
}