/**
 * Formats a unix timestamp into a human-readable time string
 * @param {Number} timestamp the unix timestamp to format
 * @returns {String} the formatted time string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  return date.toLocaleTimeString();
}
