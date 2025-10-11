import { Button } from "../../../components/button/Button.js";
import { TextBox } from "../../../components/TextBox/TextBox.js";
import { useLocation } from "../../../core/index.js";
import { html } from "../../../utils/index.js";

/**
 * Toolbar component with search box and recording toggle button
 * @param {Object} props
 * @param {boolean} props.isRecording whether recording is active
 * @param {() => void} props.onClearLogs callback for when the clear logs button is clicked
 * @param {(query: string) => void} props.onQueryChange callback for when the search query changes
 * @param {() => void} props.onToggleRecording callback for when the recording button is clicked
 * @returns {import('preact').JSX.Element}
 */
export function Toolbar({
  isRecording,
  onClearLogs,
  onQueryChange,
  onToggleRecording,
}) {
  const { route } = useLocation();

  const goToSettings = () => {
    route("/settings");
  };

  return html`
    <div id="toolbar">
      <${TextBox}
        classNames="toolbar-search-box"
        placeholder="Search logs..."
        onInput=${(e) => onQueryChange(e.target.value)}
      />

      <${Button} id="toggle-recording" onClick=${onToggleRecording}>
        ${isRecording ? "Stop Recording" : "Start Recording"}
      </${Button}>

      <${Button} id="clear-logs" onClick=${onClearLogs}>Clear Logs</${Button}>

      <${Button} id="settings-button" title="Settings" onClick=${goToSettings}>
        ⚙
      </${Button}>
    </div>
  `;
}
