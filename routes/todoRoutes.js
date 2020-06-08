const router = require("express").Router();
const {
  getAllTodos,
  createTodo,
  parseIdParam,
  getTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo);

router.param("id", parseIdParam);

router
  .route("/:id")
  .get(getTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;
