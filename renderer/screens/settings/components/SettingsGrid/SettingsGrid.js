import { html } from "../../../../utils/index.js";

import settingsGridStyles from "./SettingsGrid.css" with { type: "css" };
document.adoptedStyleSheets.push(settingsGridStyles);

/**
 * SettingsGrid component
 * @param {Object} props
 * @param {import('preact').JSX.Element} props.children
 * @returns {import('preact').JSX.Element}
 */
export const SettingsGrid = ({ children }) => {
  return html`<div class="settings-grid">${children}</div>`;
};
