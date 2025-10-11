import { useState, useEffect } from "../../../core/index.js";

/**
 * A custom hook to sort log messages by a given field and order
 * @param {import('../main/network/proxyapi.js').LogMessage[]} logMessages the log messages to sort
 * @param {String} sortBy the field to sort by
 * @param {"asc" | "desc"} order the sort order
 * @returns {import('../main/network/proxyapi.js').LogMessage[]} the sorted log messages
 */
export const useSortLogMessages = (logMessages, sortBy, order) => {
  /**
   * @type {[import('../main/network/proxyapi.js').LogMessage[], import('react').SetStateAction<import('../main/network/proxyapi.js').LogMessage[]>]}
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
