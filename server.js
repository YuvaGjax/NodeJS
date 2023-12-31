const http = require("http");
const app = require("./Server/app");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT);
