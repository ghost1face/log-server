import { h, render, Fragment } from "https://esm.sh/preact";
import { useState, useEffect } from "https://esm.sh/preact/hooks";
import htm from "https://esm.sh/htm";

// Initialize htm with Preact
const html = htm.bind(h);

// MARK: utils
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

// end utils

// MARK: hooks

/**
 * A custom hook to manage log messages received from the main process
 * @returns {import('../network/proxyapi').LogMessage[]}
 */
const useLogMessages = () => {
  /**
   * @type {[import('../network/proxyapi').LogMessage[], import('react').SetStateAction<import('../network/proxyapi').LogMessage[]>]}
   */
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    window.LogAPI.onNewLogMessage((logMessage) => {
      setLogMessages((prevLogs) => [...prevLogs, logMessage]);
    });
  }, []);

  return logMessages;
};

/**
 * A custom hook to filter log messages based on a search query
 * @param {import('../network/proxyapi').LogMessage[]} logMessages
 * @param {string} query
 */
const useFilterLogMessages = (logMessages, query) => {
  /**
   * @type {[import('../network/proxyapi').LogMessage[], import('react').SetStateAction<import('../network/proxyapi').LogMessage[]>]}
   */
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const filtered = logMessages.filter((msg) => msg.message.includes(query));
    setFilteredMessages(filtered);
  }, [logMessages, query]);

  return filteredMessages;
};

/**
 * A custom hook to sort log messages by a given field and order
 * @param {import('../network/proxyapi').LogMessage[]} logMessages the log messages to sort
 * @param {String} sortBy the field to sort by
 * @param {"asc" | "desc"} order the sort order
 * @returns {import('../network/proxyapi').LogMessage[]} the sorted log messages
 */
const useSortLogMessages = (logMessages, sortBy, order) => {
  /**
   * @type {[import('../network/proxyapi').LogMessage[], import('react').SetStateAction<import('../network/proxyapi').LogMessage[]>]}
   */
  const [sortedMessages, setSortedMessages] = useState([]);

  useEffect(() => {
    const sorted = [...logMessages].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    setSortedMessages(sorted);
  }, [logMessages, sortBy, order]);

  return sortedMessages;
};

// end hooks

// MARK: components

/**
 * Toolbar component with search box and recording toggle button
 * @param {Object} props
 * @param {boolean} props.isRecording whether recording is active
 * @param {(query: string) => void} props.onQueryChange callback for when the search query changes
 * @param {() => void} props.onToggleRecording callback for when the recording button is clicked
 * @returns {import('preact').JSX.Element}
 */
function Toolbar({ isRecording, onQueryChange, onToggleRecording }) {
  return html`
    <div id="toolbar">
      <input
        class="toolbar-search-box"
        type="text"
        placeholder="Search logs..."
        onInput=${(e) => onQueryChange(e.target.value)}
      />
      <button id="toggle-recording" onClick=${onToggleRecording}>
        ${isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  `;
}

/**
 * A component that displays a single log message
 * @param {Object} props
 * @param {import('../network/proxyapi').LogMessage} props.entry the log message to display
 * @returns {import('preact').JSX.Element}
 */
function LogEntry({ entry }) {
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

/**
 * A component that displays a sort icon based on the current sort order
 * @param {Object} props
 * @param {"asc" | "desc" | null} props.order the sort order
 * @returns {import('preact').JSX.Element}
 */
function SortIcon({ order }) {
  if (order === "asc") {
    return html`<span>▲</span>`;
  } else if (order === "desc") {
    return html`<span>▼</span>`;
  } else {
    return null;
  }
}

/**
 * A component that displays a header cell in the log table
 * @param {Object} props
 * @param {string} props.title the title of the header cell
 * @param {string} props.classNames additional class names for styling
 * @param {() => void} props.onClick callback for when the header cell is clicked
 * @param {"asc" | "desc" | null} props.order the current sort order for this column
 * @returns {import('preact').JSX.Element}
 */
function LogHeaderCell({ title, order, classNames, onClick }) {
  return html`<div
    class="log-list-cell log-list-header ${classNames}"
    onClick=${onClick}
  >
    ${title}
    <${SortIcon} order=${order} />
  </div>`;
}

/**
 * A component that displays a list of log messages
 * @param {Object} props
 * @param {import('../network/proxyapi').LogMessage[]} props.logMessages the log messages to display
 * @param {"asc" | "desc"} props.order the current sort order
 * @param {string} props.orderBy the current sort field
 * @param {(field: string) => void} props.onSortChange callback for when the sort field changes
 * @returns {import('preact').JSX.Element}
 */
function LogList({ logMessages, order, orderBy, onSortChange }) {
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

// MARK: App
function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("asc");

  const logMessages = useLogMessages();
  const filteredMessages = useFilterLogMessages(logMessages, query);
  const sortedAndFilteredMessages = useSortLogMessages(
    filteredMessages,
    sortBy,
    sortOrder
  );

  const onSortChange = (field) => {
    if (sortBy === field) {
      // toggle order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      window.LogAPI.stopRecording();
    } else {
      window.LogAPI.startRecording();
    }
    setIsRecording(!isRecording);
  };

  return html`<div>
    <${Toolbar}
      isRecording=${isRecording}
      onQueryChange=${setQuery}
      onToggleRecording=${handleToggleRecording}
    />
    <${LogList}
      logMessages=${sortedAndFilteredMessages}
      order=${sortOrder}
      orderBy=${sortBy}
      onSortChange=${onSortChange}
    />
  </div>`;
}

// MARK: App start
render(html`<${App} />`, document.body);
