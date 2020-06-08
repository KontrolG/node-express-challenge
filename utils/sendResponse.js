const notFound = response => {
  response.status(404).end("Not Found");
};

const dataInJson = (response, data) => {
  response.status(200).json(data);
};

module.exports = { notFound, dataInJson };
