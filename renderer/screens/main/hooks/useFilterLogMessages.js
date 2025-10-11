import { useState, useEffect } from "../../../core/index.js";

/**
 * A custom hook to filter log messages based on a search query
 * @param {import('../main/network/proxyapi.js').LogMessage[]} logMessages
 * @param {string} query
 */
export const useFilterLogMessages = (logMessages, query) => {
  /**
   * @type {[import('../main/network/proxyapi.js').LogMessage[], import('react').SetStateAction<import('../main/network/proxyapi.js').LogMessage[]>]}
   */
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const filtered = logMessages.filter((msg) => msg.message.includes(query));
    setFilteredMessages(filtered);
  }, [logMessages, query]);

  return filteredMessages;
};
