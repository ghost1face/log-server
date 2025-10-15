import { useState } from "../../core/index.js";
import { html } from "../../utils/index.js";
import { useLogMessages, useFilterLogMessages, useSortLogMessages } from "./hooks/index.js";
import { Toolbar, LogList } from "./components/index.js";


import styles from "./styles.css" with { type: "css" };
document.adoptedStyleSheets.push(styles);


const MainScreen = () => {
  /**
   * @type {[boolean, import('react').SetStateAction<boolean>]}
   */
  const [isRecording, setIsRecording] = useState(false);

  /**
   * @type {[string, import('react').SetStateAction<string>]}
   */
  const [query, setQuery] = useState("");

  /**
   * @type {["timestamp" | "message", import('react').SetStateAction<"timestamp" | "message">]}
   */
  const [sortBy, setSortBy] = useState("timestamp");

  /**
   * @type {["asc" | "desc", import('react').SetStateAction<"asc" | "desc">]}
   */
  const [sortOrder, setSortOrder] = useState("desc");

  const [logMessages, clearLogMessages] = useLogMessages();
  const filteredMessages = useFilterLogMessages(logMessages, query);
  const sortedAndFilteredMessages = useSortLogMessages(
    filteredMessages,
    sortBy,
    sortOrder
  );

  const onClearLogs = () => {
    clearLogMessages();
  };

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
      onClearLogs=${onClearLogs}
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

export default MainScreen;