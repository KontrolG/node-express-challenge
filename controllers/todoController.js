const todosModel = require("../models/Todo");
const sendResponse = require("../utils/sendResponse");

const getAllTodos = (request, response) => {
  sendResponse.dataInJson(response, todosModel.todos);
};

const createTodo = async (request, response) => {
  const newTodo = await insertTodo(request);
  sendResponse.dataInJson(response, newTodo);
};

const insertTodo = ({ body: newTodo }) => todosModel.insertOne(newTodo);

const parseIdParam = (request, response, next, value) => {
  request.params.id = parseFloat(value);
  next();
};

const getTodo = (request, response) => {
  const todo = getTodoFromRequestedId(request);
  if (todo) {
    sendResponse.dataInJson(response, todo);
  } else {
    sendResponse.notFound(response);
  }
};

const getTodoFromRequestedId = ({ params: query }) => todosModel.findOne(query);

const deleteTodo = async (request, response) => {
  await deleteRequestedTodo(request);
  sendResponse.dataInJson(response, { result: "success" });
};

const deleteRequestedTodo = ({ params: query }) => todosModel.deleteOne(query);

const updateTodo = async (request, response) => {
  await updateRequestedTodo(request);
  sendResponse.dataInJson(response, { result: "success" });
};

const updateRequestedTodo = ({ params: query, body: newProperties }) =>
  todosModel.updateOne(query, newProperties);

module.exports = {
  getAllTodos,
  createTodo,
  parseIdParam,
  getTodo,
  updateTodo,
  deleteTodo
};
