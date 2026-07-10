import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(appDir, "out");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3100);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

if (!existsSync(outDir)) {
  console.error("Static build not found. Run npm run portfolio3d:build first.");
  process.exit(1);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${host}:${port}`);
    const decoded = decodeURIComponent(url.pathname);
    const cleanPath = decoded === "/" ? "/index.html" : decoded;
    const candidate = path.normalize(path.join(outDir, cleanPath));

    if (!candidate.startsWith(outDir)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    let filePath = candidate;
    const fileStat = existsSync(filePath) ? await stat(filePath) : null;
    if (fileStat?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!existsSync(filePath) && !path.extname(filePath)) {
      const htmlFilePath = `${filePath}.html`;
      if (existsSync(htmlFilePath)) {
        filePath = htmlFilePath;
      }
    }
    if (!existsSync(filePath)) {
      filePath = path.join(outDir, "index.html");
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
}).listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`Wing Yee AI Lab preview is running at ${url}`);
  console.log("Keep this window open while viewing the site.");

  if (process.env.AUTO_OPEN === "1") {
    exec(`cmd /c start "" "${url}"`);
  }
});
