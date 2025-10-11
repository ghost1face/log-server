const http = require("http");

/**
 * Create a proxy server for the renderer process
 * @param {import('./proxyapi.js').ProxyApi} proxyApi
 * @returns {http.Server} the proxy server
 */
function createProxyServer(proxyApi) {
  /**
   * Handle incoming HTTP requests
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  const server = http.createServer(async (req, res) => {
    const requestedPath = decodeURIComponent(req.url);

    if (!(requestedPath === "/" || requestedPath === "")) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found\n");
      return;
    }

    if (req.method !== "POST") {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed\n");
      return;
    }

    if (!proxyApi.isRecording) {
      // not recording, ignore the log message
      res.writeHead(204);
      res.end();
      return;
    }
    try {
      const jsonBody = await new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
          try {
            body += chunk.toString();
          } catch (e) {
            reject(e);
          }
        });

        req.on("end", () => {
          try {
            const jsonBody = JSON.parse(body);
            resolve(jsonBody);
          } catch (e) {
            reject(e);
          }
        });
      });

      // send log message to renderer
      proxyApi.sendLog(jsonBody);

      res.writeHead(202, { "Content-Type": "text/plain" });
      res.end();
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error\n");
      console.error("Error processing log message:", e);
    }
  });

  return server;
}

module.exports = { createProxyServer };
