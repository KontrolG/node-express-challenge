const {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const route = {
  withoutParameter: {
    GET: getAllTodos,
    POST: createTodo
  },
  withParameter: {
    GET: getTodo,
    PATCH: updateTodo,
    DELETE: deleteTodo
  }
};

const urlHasParameter = url => url.startsWith("/todos/");

const use = (request, response) => {
  const { url, method } = request;
  const subRoute = urlHasParameter(url) ? "withParameter" : "withoutParameter";
  route[subRoute][method](request, response);
};

module.exports = { use };
