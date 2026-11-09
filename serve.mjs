import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "standalone");
const port = 3456;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url?.split("?")[0] || "/";
  if (urlPath === "/") urlPath = "/index.html";
  const safe = urlPath.replace(/^\/+/, "");
  const file = path.normalize(path.join(root, safe));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
    res.end(data);
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(
      `Port ${port} is already in use — the study app is probably already running.`,
    );
    console.log(`Open http://localhost:${port} in your browser.`);
    console.log(
      "To restart: close the other terminal running serve.mjs, or stop the Node process using that port.",
    );
    process.exit(0);
  }
  throw err;
});

server.listen(port, () => {
  console.log(`MKT202 Study App → http://localhost:${port}`);
});
