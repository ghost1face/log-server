import { LogEntry } from "./LogEntry.js";
import { LogHeaderCell } from "./LogHeaderCell.js";
import { html } from "../../../utils/index.js";

/**
 * A component that displays a list of log messages
 * @param {Object} props
 * @param {import('../main/network/proxyapi.js').LogMessage[]} props.logMessages the log messages to display
 * @param {"asc" | "desc"} props.order the current sort order
 * @param {string} props.orderBy the current sort field
 * @param {(field: string) => void} props.onSortChange callback for when the sort field changes
 * @returns {import('preact').JSX.Element}
 */
export function LogList({ logMessages, order, orderBy, onSortChange }) {
  return html`
    <div id="log-list">
      <${LogHeaderCell}
        title="Timestamp"
        classNames="log-timestamp"
        order=${orderBy === "timestamp" ? order : null}
        onClick=${() => onSortChange("timestamp")}
      />

      <${LogHeaderCell}
        title="Level"
        classNames="log-level"
        order=${orderBy === "level" ? order : null}
        onClick=${() => onSortChange("level")}
      />
      <${LogHeaderCell}
        title="Message"
        classNames="log-message"
        order=${orderBy === "message" ? order : null}
        onClick=${() => onSortChange("message")}
      />

      ${logMessages.map(
        (log) =>
          html`<${LogEntry} entry=${log} key=${log.timestamp + log.message} />`
      )}
    </div>

    ${logMessages.length === 0 &&
    html`<div id="no-logs">No log messages to display</div>`}
  `;
}
