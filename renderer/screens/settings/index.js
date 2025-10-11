import { html } from "../../utils/index.js";
import { useState } from "../../core/index.js";
import { Button } from "../../components/Button/index.js";
import { TextBox } from "../../components/TextBox/TextBox.js";
import { SettingsRow } from "./components/SettingsRow.js";
import { SettingsGrid } from "./components/SettingsGrid.js";
import { useSettings } from "./hooks/useSettings.js";

import styles from "./styles.css" with { type: "css" };
document.adoptedStyleSheets.push(styles);

export const SettingsScreen = () => {
  const [settings, updateSettings] = useSettings();
  const [serverPort, setServerPort] = useState(settings.port || 3000);
  const [useTunnel, setUseTunnel] = useState(settings.useTunnel || false);

  return html`<div id="settings-screen">
    <h1>Settings</h1>
    <${SettingsGrid}>
      <${SettingsRow} label="Server Port">
        <input type="text" value=${serverPort} onInput=${(e) => setServerPort(e.target.value)} />
      </${SettingsRow}>
      <${SettingsRow} label="Use Tunneling Service">
        <input type="checkbox" checked=${useTunnel} onChange=${(e) => setUseTunnel(e.target.checked)} />
      </${SettingsRow}>
      <${SettingsRow} label="Tunnel Url">
        <${TextBox} value=${settings.tunnelUrl || ""} disabled />
      </${SettingsRow}>
    </${SettingsGrid}>

    <${Button} onClick=${() => updateSettings({ port: serverPort, useTunnel: useTunnel })}>
      Save Settings
    </${Button}>
  </div>`;
};
