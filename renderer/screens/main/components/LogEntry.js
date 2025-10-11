import { Fragment } from "../../../core/index.js";
import { html, formatTimestamp } from "../../../utils/index.js";

/**
 * A component that displays a single log message
 * @param {Object} props
 * @param {import('../main/network/proxyapi.js').LogMessage} props.entry the log message to display
 * @returns {import('preact').JSX.Element}
 */
export function LogEntry({ entry }) {
  return html`<${Fragment}>
    <div class="log-list-cell log-timestamp">
      ${formatTimestamp(entry.timestamp)}
    </div>
    <div class="log-list-cell log-level log-level-${entry.level?.toLowerCase()}">[${
    entry.level
  }]</div>
    <div class="log-list-cell log-message">${entry.message}</div>
  </${Fragment}>`;
}
