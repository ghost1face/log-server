const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("LogAPI", {
  startRecording: () => ipcRenderer.invoke("start-recording"),
  stopRecording: () => ipcRenderer.invoke("stop-recording"),
  onNewLogMessage: (callback) => {
    /**
     * @param {Electron.IpcRendererEvent} event
     * @param {import('../network/proxyapi').LogMessage} logMessage
     */
    ipcRenderer.on("log", (event, logMessage) => {
      callback(logMessage);
    });
  },
});
