const { app, BrowserWindow, ipcMain } = require("electron");
const { createProxyApi } = require("./network/proxyapi.js");
const { createProxyServer } = require("./network/logserver.js");

/**
 * @type {(import('./network/proxyapi.js').ProxyApi) | null}
 */
let proxyApi = null;

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

  win.loadFile("renderer/index.html");

  return win;
};

app.whenReady().then(() => {
  const win = createWindow();

  proxyApi = createProxyApi(win);
  proxyServer = createProxyServer(proxyApi);

  proxyServer.listen(3000);
});

app.on("window-all-closed", () => {
  proxyServer?.close();
});
