const { ipcMain } = require("electron");
const EventEmitter = require("events");

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
 * @typedef {Object} ProxyApiEvents
 * @property {() => void} start-recording
 * @property {() => void} stop-recording
 */

/**
 * Proxy API for the renderer process
 * @extends {EventEmitter<ProxyApiEvents>}
 */
class ProxyApi extends EventEmitter {
  isRecording = false;

  /**
   * @type {Electron.BrowserWindow}
   */
  win = null;

  constructor(win) {
    super();
    this.win = win;

    ipcMain.handle("start-recording", () => {
      this.startRecording();
    });

    ipcMain.handle("stop-recording", () => {
      this.stopRecording();
    });
  }

  /**
   * Send a log message to the renderer process
   * @param {LogMessage} log
   */
  sendLog = (log) => {
    this.win.webContents.send("log", log);
  };

  /**
   * Check if recording is active
   * @returns {boolean} whether recording is active
   */
  isRecording = () => {
    return this.isRecording;
  };

  /**
   * Start recording log messages
   */
  startRecording = () => {
    this.emit("start-recording");
    this.isRecording = true;
  };

  /**
   * Stop recording log messages
   */
  stopRecording = () => {
    this.emit("stop-recording");
    this.isRecording = false;
  };

  destroy() {
    this.removeAllListeners();
    ipcMain.removeHandler("start-recording");
    ipcMain.removeHandler("stop-recording");
  }
}

module.exports = { ProxyApi };
