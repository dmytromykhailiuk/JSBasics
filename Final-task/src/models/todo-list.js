import { TodoItem } from "./todo-item";

export class TodoList {
  constructor(todoItems = []) {
    this.todoItems = todoItems;
    this.todoInEditMode = null;
  }

  addTodo(todo) {
    this.todoItems.push(todo);
    this.closeEdidMode();
  }

  editTodoByMessage(message) {
    this.closeEdidMode();
    this.todoInEditMode = this.todoItems.find((todo) => todo.name === message);
    this.todoInEditMode.isEditMode = true;
  }

  updateTodoInEdidMode() {
    this.todoInEditMode.name = document.getElementById("editable-input").value;
    this.closeEdidMode();
  }

  triggerTodoStatusByMessage(message) {
    this.todoItems.find((todo) => todo.name === message).triggerStatus();
    this.closeEdidMode();
  }

  deleteTodoByMessage(message) {
    const index = this.todoItems.findIndex((todo) => todo.name === message);
    this.todoItems.splice(index, 1);
    this.closeEdidMode();
  }

  closeEdidMode() {
    if (this.todoInEditMode) {
      this.todoInEditMode.isEditMode = false;
      this.todoInEditMode = null;
    }
  }

  replaceTodoByMessage(message) {
    this.deleteTodoByMessage(message);
    this.addTodo(new TodoItem(message));
  }

  has(message) {
    return !!this.todoItems.find((todo) => todo.name === message);
  }

  deleteListByFlag(flag) {
    const isDone = flag === "Done";
    this.todoItems = this.todoItems.filter((todo) => isDone !== todo.isDone);
  }

  get openedTodoItems() {
    return this.todoItems.filter((todo) => !todo.isDone);
  }

  get closedTodoItems() {
    return this.todoItems.filter((todo) => todo.isDone);
  }
}
