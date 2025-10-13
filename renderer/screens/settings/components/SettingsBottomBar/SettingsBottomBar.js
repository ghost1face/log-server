import { html } from "../../../../utils/index.js";

import settingsBottomBarStyles from "./SettingsBottomBar.css" with { type: "css" };
document.adoptedStyleSheets.push(settingsBottomBarStyles);

/**
 * SettingsBottomBar component
 * @param {Object} props
 * @param {import('preact').JSX.Element} props.children
 * @returns {import('preact').JSX.Element}
 */
export const SettingsBottomBar = ({ children }) => {
  return html`<div id="settings-bottom-bar">
    ${children}
  </div>`;
};
