const EventEmitter = require("events");
const { ipcMain } = require("electron");

/**
 * @typedef {Object} LogServerSettings
 * @property {number} port - Port number for the log server
 * @property {boolean} useTunnel - Whether to use a tunnel
 * @property {string} tunnelUrl - URL of the tunnel
 */

class SettingsApi extends EventEmitter {
  /**
   * @type {LogServerSettings}
   */
  settings = {
    port: 3000,
    useTunnel: false,
    tunnelUrl: "",
  };

  /**
   * @type {Electron.BrowserWindow}
   */
  win = null;

  constructor(win) {
    super();
    this.win = win;

    /**
     * Handle settings update from renderer process
     * @param {LogServerSettings} newSettings
     */
    ipcMain.handle("update-settings", (event, newSettings) => {
      this.updateSettings(newSettings);
    });

    ipcMain.handle("get-settings", () => {
      return this.getSettings();
    });
  }

  /**
   * Update settings and notify renderer process
   * @param {LogServerSettings} newSettings
   */
  updateSettings = (newSettings) => {
    this.settings = { ...this.settings, ...newSettings };
    this.win.webContents.send("settings-updated", this.settings);
  };

  /**
   * Get current settings
   * @returns {LogServerSettings} current settings
   */
  getSettings = () => {
    return this.settings;
  };
}

module.exports = { SettingsApi };
