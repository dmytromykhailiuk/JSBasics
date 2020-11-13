export class TodoList {
  constructor(todoItems = []) {
    this.todoItems = todoItems;
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }

  triggerTodoStatysByMessage(message) {
    this.todoItems.find((todo) => todo.name === message).triggerStatys();
  }

  deleteTodoByMessage(message) {
    const index = this.todoItems
      .findIndex((todo) => todo.name === message)
      .triggerStatys();
    this.todoItems.splice(index, 1);
  }

  get openedTodoItems() {
    return this.todoItems.map((todo) => !todo.isDone);
  }

  get closedTodoItems() {
    return this.todoItems.map((todo) => todo.isDone);
  }
}
