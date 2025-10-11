import { render } from "./core/index.js";
import { html } from "./utils/html.js";
import { MainScreen } from "./screens/main/index.js";

// MARK: App
function App() {
  return html`<${MainScreen} />`;
}

render(html`<${App} />`, document.body);
