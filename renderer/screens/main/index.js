import { useState } from "../../core/index.js";
import { html } from "../../utils/index.js";
import { useLogMessages, useFilterLogMessages, useSortLogMessages } from "./hooks/index.js";
import { Toolbar, LogList } from "./components/index.js";


import styles from "./styles.css" with { type: "css" };
document.adoptedStyleSheets.push(styles);


export const MainScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("asc");

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