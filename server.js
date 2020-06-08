const http = require("http");
const handleRequest = require("./app");

const port = process.env.PORT || 7777;

const server = http.createServer();
server.on("request", handleRequest);

server.listen(port, () => console.log(`Server listening at port: ${port}`));
