const http = require("http");
const app = require("./server/app");

const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

server.listen(PORT);
