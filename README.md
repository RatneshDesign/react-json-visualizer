# React JSON Visualizer

React JSON Visualizer is a lightweight JSON visualizer and JSON viewer dev tool that helps developers understand complex JavaScript objects and arrays through an interactive node-based UI.

It is designed to be DX-friendly, UI/UX focused, and simple to use.
You import one function, pass your data, and instantly see the JSON data flow.

---

## What is React JSON Visualizer?
-Works with React, Next.js, Vanilla JS, and any browser environment

React JSON Visualizer turns any JavaScript object or array into a visual data graph.
-Each object becomes a node
-Nested objects and arrays are connected visually
-Primitive values stay inside nodes
-Users can drag, collapse, and explore data relationships
-This makes it ideal as a developer tool, debugging utility, or internal JSON inspector.

---

## Features

React JSON Visualizer with connected nodes
Interactive JSON viewer
Drag and pan the canvas
Collapse and expand nodes
Auto layout (no manual positioning)
Clean UI / UX focused design
Zero configuration
Works with Vanilla JS, React.js, Next.js
No external dependencies

---

## Installation
```sh
npm install react-json-visualizer
```
or

```sh
pnpm add react-json-visualizer
```

---

## Usage
You only need one function.
```js
import { renderJSON } from "react-json-visualizer";

renderJSON(data);
```

That’s it.
No setup, no config, no framework lock.

### Interactive UI:
After running this code, a button/icon will appear at the top-right corner of the page.
Click it to launch the JSON Visualizer, and you can start exploring your data interactively.


## JavaScript Example
```js
  import { renderJSON } from "json-visualizer";

  const data = {
    product: {
      id: 10,
      title: "Laptop",
      specs: {
        ram: "16GB",
        cpu: "M1"
      }
    }
  };

  renderJSON(data);
  ```

## React.js Example
```jsx
import { useEffect } from "react";
import { renderJSON } from "json-visualizer";

export default function App() {
  useEffect(() => {
    renderJSON({
      user: {
        name: "John",
        role: "Admin"
      }
    });
  }, []);

  return null;
}
```
---

Important: This is a client-side dev tool. It must run in the browser.

---
## API
renderJSON(data)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| **data** | `Object` or `Array` | Any valid JavaScript JSON-like data structure. |

---

Automatically injects required styles
Clears previous visualization
Handles deep nested structures
Updates layout dynamically
Use Cases
Debugging API responses
Inspecting backend JSON data
Understanding deeply nested objects
Internal admin dashboards
Developer tools and inspectors
Teaching JSON and data structures
UI/UX exploration of data flow
Framework Support
This tool is framework-agnostic.

Vanilla JavaScript
React.js
Next.js
Vue
Svelte
Any browser environment

---

License :

MIT License
© Ratnesh Kumawat

## Author
Ratnesh Kumawat Portfolio: https://ratneshkumawat.vercel.app

---

React JSON Visualizer is built to be simple, visual, and developer-friendly.
If you work with JSON every day, this tool helps you see your data, not just read it.

---

### Keywords

json visualizer
json visualizer
json viewer
json inspector
developer tools
dev tool
frontend tools
ui ux
dx friendly
data visualization
javascript json
