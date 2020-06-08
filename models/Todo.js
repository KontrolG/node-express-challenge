const fileSystem = require("fs");

class Todo {
  constructor() {
    this.filePath = `${__dirname}/../data/todos.json`;
    this.retrieveTodos();
  }

  retrieveTodos() {
    const data = fileSystem.readFileSync(this.filePath, "utf-8");
    this.todos = JSON.parse(data);
  }

  saveTodos() {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(this.todos);
      fileSystem.writeFile(this.filePath, data, error =>
        error ? reject(error) : resolve()
      );
    });
  }

  findOne(queryObject) {
    const queryEntries = Object.entries(queryObject);
    const { matchesQueryEntries } = this;
    return this.todos.find(matchesQueryEntries, queryEntries);
  }

  matchesQueryEntries(todo) {
    const queryEntries = this;
    return queryEntries.every(([key, value]) => todo[key] === value);
  }

  async insertOne(todo) {
    const newTodo = this.getNewTodo(todo);
    await this.saveNewTodo(newTodo);
    return newTodo;
  }

  saveNewTodo(todo) {
    this.todos.push(todo);
    return this.saveTodos();
  }

  getNewTodo({ name, completed = false }) {
    const id = this.getNewId();
    return { id, name, completed };
  }

  getNewId() {
    const lastId = this.todos[this.todos.length - 1].id;
    return lastId + 1 || 0;
  }

  async deleteOne(queryObject) {
    const todoIndex = this.getTodoIndex(queryObject);
    this.spliceTodo(todoIndex);
    return await this.saveTodos();
  }

  getTodoIndex(queryObject) {
    const todo = this.findOne(queryObject);
    return this.todos.indexOf(todo);
  }

  spliceTodo(todoIndex) {
    this.todos.splice(todoIndex, 1);
  }

  async updateOne(queryObject, newProperties) {
    this.modifyTodo(queryObject, newProperties);
    await this.saveTodos();
  }

  modifyTodo(queryObject, newProperties) {
    const todo = this.findOne(queryObject);
    Object.assign(todo, newProperties);
  }
}

module.exports = new Todo();
