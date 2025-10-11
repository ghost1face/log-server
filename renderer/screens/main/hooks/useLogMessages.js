import { useState, useEffect } from "../../../core/index.js";

/**
 * A custom hook to manage log messages received from the main process
 * @returns {[import('../../../../main/network/proxyapi.js').LogMessage[], () => void]} the log messages and a function to clear them
 */
export const useLogMessages = () => {
  /**
   * @type {[import('../../../../main/network/proxyapi.js').LogMessage[], import('react').SetStateAction<import('../../../../main/network/proxyapi.js').LogMessage[]>]}
   */
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    window.LogAPI.onNewLogMessage((logMessage) => {
      setLogMessages((prevLogs) => [...prevLogs, logMessage]);
    });
  }, []);

  const clearLogMessages = () => {
    setLogMessages([]);
  };

  return [logMessages, clearLogMessages];
};
