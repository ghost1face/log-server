const { ipcMain } = require("electron");

/**
 * @typedef {Object} LogMessage
 * @property {string} level
 * @property {string} message
 * @property {string} timestamp
 * @property {Object} [meta]
 */

/**
 * @typedef {"start-recording" | "stop-recording"} ProxyEvents
 */

/**
 * @typedef {Object} ProxyApi
 * @property {(log: LogMessage) => void} sendLog
//  * @property {() => Promise<void>} startRecording
//  * @property {() => Promise<void>} stopRecording
 * @property {() => boolean} isRecording
 */

/**
 * Create a proxy API for the renderer process
 * @param {Electron.BrowserWindow} win
 * @returns {ProxyApi} the proxy API
 */
const createProxyApi = (win) => {
  let isRecording = false;

  ipcMain.handle("start-recording", () => {
    isRecording = true;
  });

  ipcMain.handle("stop-recording", () => {
    isRecording = false;
  });

  return {
    /**
     * Send a log message to the renderer process
     * @param {LogMessage} log
     */
    sendLog: (log) => {
      win.webContents.send("log", log);
    },

    // startRecording: () => {
    //   return ipcRenderer.invoke("start-recording");
    // },

    // stopRecording: () => {
    //   return ipcRenderer.invoke("stop-recording");
    // },

    isRecording: () => isRecording,

    close: () => {
      ipcMain.removeHandler("start-recording");
      ipcMain.removeHandler("stop-recording");
    },
  };
};

module.exports = { createProxyApi };
