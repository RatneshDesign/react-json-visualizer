import { injectStyles } from "./styles/injectStyles.js";
import { initCanvas } from "./dom/canvas.js";
import { visualize } from "./visualize/visualize.js";

let initialized = false;

export function renderJSON(data) {
  if (!initialized) {
    injectStyles();
    initCanvas();
    initialized = true;
  }

  let safeData = data;
  if (data === null || data === undefined) {
    safeData = { value: String(data) };
  } else if (typeof data !== "object") {
    safeData = { value: data };
  }

  visualize(safeData);
}
