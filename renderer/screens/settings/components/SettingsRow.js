import { html } from "../../../utils/index.js";

/**
 * SettingsRow component
 * @param {Object} props
 * @param {string} props.label the label for the settings row
 * @param {import('preact').JSX.Element} props.children the control element(s) for the settings row
 * @returns {import('preact').JSX.Element}
 */
export const SettingsRow = ({ label, children }) => {
  return html`<div class="settings-row">
    <div class="settings-label">${label}</div>
    <div class="settings-control">${children}</div>
  </div>`;
};
