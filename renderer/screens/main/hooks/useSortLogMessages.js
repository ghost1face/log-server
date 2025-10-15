import { useState, useEffect } from "../../../core/index.js";

const StringCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

const sortStringAscending = (a, b) => StringCollator.compare(a, b);
const sortStringDescending = (a, b) => StringCollator.compare(b, a);

const sortNumberAscending = (a, b) => a - b;
const sortNumberDescending = (a, b) => b - a;

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
    const message = logMessages.find((msg) => msg[sortBy] !== undefined);
    const fieldType = message ? typeof message[sortBy] : "string";

    let sorted = [];
    if (fieldType === "string") {
      sorted = [...logMessages].sort((a, b) =>
        order === "asc"
          ? sortStringAscending(a[sortBy], b[sortBy])
          : sortStringDescending(a[sortBy], b[sortBy])
      );
    } else {
      sorted = [...logMessages].sort((a, b) =>
        order === "asc"
          ? sortNumberAscending(a[sortBy], b[sortBy])
          : sortNumberDescending(a[sortBy], b[sortBy])
      );
    }

    setSortedMessages(sorted);
  }, [logMessages, sortBy, order]);

  return sortedMessages;
};
