import { html } from "../../utils/index.js";
import { useEffect, useMemo, useState, useLocation } from "../../core/index.js";
import { Button } from "../../components/Button/index.js";
import { TextBox } from "../../components/TextBox/TextBox.js";
import { SettingsRow } from "./components/SettingsRow.js";
import { SettingsGrid } from "./components/SettingsGrid/SettingsGrid.js";
import { useSettings } from "./hooks/useSettings.js";
import { SettingsBottomBar } from "./components/SettingsBottomBar/index.js";

import styles from "./styles.css" with { type: "css" };
document.adoptedStyleSheets.push(styles);

const SettingsScreen = () => {
  const [settings, updateSettings] = useSettings();
  const [serverPort, setServerPort] = useState(settings.port || 3000);
  const [useTunnel, setUseTunnel] = useState(settings.useTunnel || false);
  const localUrl = useMemo(() => `http://localhost:${serverPort}`, [serverPort]);
  const internalUrl = useMemo(() => `http://${settings.serverName}:${serverPort}`, [settings.serverName, serverPort]);

  const { route } = useLocation();

  const goToHome = () => {
    route("/index.html");
  }

  useEffect(() => {
    setServerPort(settings.port || 3000);
    setUseTunnel(settings.useTunnel || false);
  }, [settings])

  return html`<div id="settings-screen">
    <div id="settings-header">
      <h1>Settings</h1>
      <a class="close-button" title="Close" onClick=${goToHome}>
        ✕
      </a>
    </div>
    <${SettingsGrid}>
      <${SettingsRow} label="Server Port">
        <input type="text" value=${serverPort} onInput=${(e) => setServerPort(e.target.value)} />
      </${SettingsRow}>
      <${SettingsRow} label="Use Tunneling Service">
        <input type="checkbox" checked=${useTunnel} onChange=${(e) => setUseTunnel(e.target.checked)} />
      </${SettingsRow}>


      <${SettingsRow} label="Local Url">
        <${TextBox} value=${localUrl || ""} disabled />
      </${SettingsRow}>
      <${SettingsRow} label="Internal Url">
        <${TextBox} value=${internalUrl || ""} disabled />
      </${SettingsRow}>
      <${SettingsRow} label="Tunnel Url">
        <${TextBox} value=${settings.tunnelUrl || ""} disabled />
      </${SettingsRow}>
    </${SettingsGrid}>

    <${SettingsBottomBar}>
      <${Button} onClick=${() => updateSettings({ port: serverPort, useTunnel: useTunnel })}>
        Save Settings
      </${Button}>
    </${SettingsBottomBar}>
  </div>`;
};

export default SettingsScreen;