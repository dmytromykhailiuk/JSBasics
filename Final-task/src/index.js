import "./index.scss";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoItem } from "./models/todo-item";

const searchingInput = document.querySelector(".header__searching-input");
const root = document.getElementById("root");

window.todo = new TodoItem("Finish final task");

window.updateView = () => {
  root.innerHTML = TodoItemComponent(todo);
};

updateView();
