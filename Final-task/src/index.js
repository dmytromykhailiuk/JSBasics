import "./index.scss";
import {
  focusOnTodoInput,
  enterPresed,
  callEventHandlers,
  escapePresed,
} from "./helpers";
import { TodoItem, TodoList } from "./models";
import { TodoStorage } from "./storage";
import { TodoAppComponent } from "./components";

window.callEventHandlers = callEventHandlers;
window.enterPresed = enterPresed;
window.escapePresed = escapePresed;

const searchingInput = document.querySelector(".header__searching-input");
const newTaskInput = document.querySelector(".create-task-section__input");
const newTaskButton = document.querySelector(".create-task-section__button");
const root = document.getElementById("root");

window.todoList = new TodoList();

const storage = new TodoStorage("todoItems", todoList);

storage.getData((todoItems) =>
  todoItems.forEach((todo) =>
    todoList.addTodo(
      new TodoItem(todo.name, todo.isDone, todo.creationDate, todo.closingDate)
    )
  )
);

const addTodo = () => {
  if (newTaskInput.value.trim()) {
    todoList.addTodo(new TodoItem(newTaskInput.value.trim()));
    newTaskInput.value = "";
    updateView();
  }
};

window.updateView = () => {
  storage.saveData();
  root.innerHTML = TodoAppComponent(todoList, searchingInput.value);
  focusOnTodoInput();
};

searchingInput.oninput = updateView;
newTaskButton.onclick = addTodo;
newTaskInput.onkeyup = enterPresed(addTodo, () => newTaskInput.blur());

updateView();
