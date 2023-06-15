import http from "http";
import fs from "fs";
import path from "path";
import mime from "mime";

const PORT = 8080;

const server = http.createServer((request, response) => {
  let filePath = "." + request.url;

  if (filePath === "./") {
    // Serve the index.html file
    filePath = "./index3.html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("File not found");
      } else {
        // Other error
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Server error");
      }
    } else {
      // Serve the file with the appropriate MIME type
      const contentType = mime.getType(filePath);
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default server;
