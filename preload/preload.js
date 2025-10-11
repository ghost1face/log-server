const { contextBridge, ipcRenderer } = require("electron");

/**
 * Callback type for settings updates
 * @callback SettingsUpdateCallback
 * @param {import('../main/settings/settingsapi').LogServerSettings} settings
 * @returns {void}
 */

/**
 * Callback type for new log messages
 * @callback LogMessageCallback
 * @param {import('../main/network/proxyapi').LogMessage} logMessage
 * @returns {void}
 */

contextBridge.exposeInMainWorld("LogAPI", {
  startRecording: () => ipcRenderer.invoke("start-recording"),
  stopRecording: () => ipcRenderer.invoke("stop-recording"),

  /**
   * Listen for new log messages from the main process
   * @param {LogMessageCallback} callback the callback to invoke on new log messages
   * @returns {void}
   */
  onNewLogMessage: (callback) => {
    /**
     * @param {Electron.IpcRendererEvent} event
     * @param {import('../main/network/proxyapi').LogMessage} logMessage
     */
    ipcRenderer.on("log", (event, logMessage) => {
      callback(logMessage);
    });
  },
});

contextBridge.exposeInMainWorld("SettingsAPI", {
  /**
   * Listen for settings updates from the main process
   * @param {SettingsUpdateCallback} callback the callback to invoke on settings updates
   * @returns {void}
   */
  onSettingsUpdated: (callback) => {
    /**
     * @param {Electron.IpcRendererEvent} event
     * @param {import('../main/settings/settingsapi').LogServerSettings} settings
     */
    ipcRenderer.on("settings-updated", (event, settings) => {
      alert("settings updated");
      callback(settings);
    });
  },

  /**
   * Get the current server settings
   * @returns {Promise<import('../main/settings/settingsapi').LogServerSettings>}
   */
  getSettings: () => ipcRenderer.invoke("get-settings"),

  /**
   * Update the server settings
   * @param {import('../main/settings/settingsapi').LogServerSettings} settings
   * @returns {Promise<void>}
   */
  updateSettings: (settings) => ipcRenderer.invoke("update-settings", settings),
});
