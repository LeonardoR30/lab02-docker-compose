const http = require("http");
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;
const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end(`Hola mundo desde ${process.env.API_NAME || "API"}\n`);
});
server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});