const todoRouter = require("./routes/todoRoutes");
const sendResponse = require("./utils/sendResponse");

const pathnameMatchesRoute = (pathname, route) =>
  pathname.startsWith(route + "/") || pathname === route;

const bodyParser = request =>
  new Promise(resolve => {
    let data = "";
    request.on("data", chunk => (data += chunk));
    request.on("end", () => resolve(JSON.parse(data || "{}")));
  });

const getIdParameterFromRequestUrl = requestUrl => {
  const urlSegments = requestUrl.split("/");
  const [, , parameter] = urlSegments;
  return parseFloat(parameter);
};

const parseBodyAndParams = async request => {
  request.body = await bodyParser(request);
  const id = getIdParameterFromRequestUrl(request.url);
  request.params = { id };
};

module.exports = async (request, response) => {
  await parseBodyAndParams(request);
  const { url } = request;

  if (pathnameMatchesRoute(url, "/todos")) {
    todoRouter.use(request, response);
  } else {
    sendResponse.notFound(response);
  }
};
