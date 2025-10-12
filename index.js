const { app, BrowserWindow, ipcMain } = require("electron");
const { ProxyApi } = require("./main/network/proxyapi.js");
const { createProxyServer } = require("./main/network/logserver.js");
const { SettingsApi } = require("./main/settings/settingsapi.js");
const os = require("os");

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

/**
 * @type {import('@ngrok/ngrok').Listener | null}
 */
let ngrokListener = null;

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
    const { port, useTunnel } = settingsApi.getSettings();
    // get the local machine hostname
    const hostname = os.hostname();

    console.debug(`Starting proxy server on port ${port}`);

    proxyServer = createProxyServer(proxyApi);
    proxyServer.listen(port, hostname, () => {
      console.log("Log server running on:");
      console.log(`\tLocal:   http://localhost:${port}/`);
      console.log(`\tNetwork: http://${hostname}:${port}/`);
    });

    // if (useTunnel) {
    //   ngrok.forward({ addr: port }).then((listener) => {
    //     const url = listener.url();

    //     console.log(`ngrok tunnel established at ${url}`);

    //     ngrokListener = listener;

    //     settingsApi.updateSettings({
    //       port,
    //       useTunnel,
    //       tunnelUrl: url,
    //     });
    //   });
    // }
  });

  proxyApi.on("stop-recording", () => {
    // stop server logging
    proxyServer?.close();
    ngrokListener?.close();
  });
});

app.on("window-all-closed", () => {
  proxyServer?.close();
  proxyApi?.destroy();
});
