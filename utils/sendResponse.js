const notFound = response => {
  response.writeHead(404, "Not Found");
  response.end();
};

const dataInJson = (response, data) => {
  response.writeHead(200, { "Content-type": "application/json" });
  response.end(JSON.stringify(data));
};

module.exports = { notFound, dataInJson };
