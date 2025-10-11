const { app, BrowserWindow, ipcMain } = require("electron");
const { ProxyApi } = require("./main/network/proxyapi.js");
const { createProxyServer } = require("./main/network/logserver.js");
const { SettingsApi } = require("./main/settings/settingsapi.js");

/**
 * @type {(import('./main/network/proxyapi.js').ProxyApi) | null}
 */
let proxyApi = null;

/**
 * @type {(import('./main/settings/settingsapi.js').SettingsApi) | null}
 */
let settingsApi = null;

/**
 * @type {import('http').Server | null}
 */
let proxyServer = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + "/preload/preload.js",
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("./renderer/index.html");

  return win;
};

app.whenReady().then(() => {
  const win = createWindow();

  proxyApi = new ProxyApi(win);
  settingsApi = new SettingsApi(win);

  proxyApi.on("start-recording", () => {
    // start server logging
    const port = 3000;
    console.log(`Starting proxy server on port ${port}`);
    proxyServer = createProxyServer(proxyApi);
    proxyServer.listen(port);
  });

  proxyApi.on("stop-recording", () => {
    // stop server logging
    proxyServer?.close();
  });
});

app.on("window-all-closed", () => {
  proxyServer?.close();
  proxyApi?.destroy();
});
