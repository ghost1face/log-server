import {
  render,
  lazy,
  Router,
  Route,
  ErrorBoundary,
  LocationProvider,
} from "./core/index.js";
import { html } from "./utils/html.js";
import MainScreen from "./screens/main/index.js";

const SettingsScreen = lazy(() => import("./screens/settings/index.js"));

function App() {
  const onRouteChange = (url) => console.log("Navigated to", url);
  const onLoadStart = (url) => console.error("Starting to load", url);
  const onLoadEnd = (url) => console.error("Finished loading", url);

  return html`
    <${LocationProvider} scope="/index.html">
      <${ErrorBoundary}>
        <${Router}
          onRouteChange=${onRouteChange}
          onLoadStart=${onLoadStart}
          onLoadEnd=${onLoadEnd}
        >
          <${MainScreen} path="/" default />
          <${Route} path="/settings" component=${SettingsScreen} />

        </${Router}>
      </${ErrorBoundary}>
    </${LocationProvider}>
  `;
}

render(html`<${App} />`, document.body);
