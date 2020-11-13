import "./todo-list.component.scss";
import { TodoItemComponent } from "../todo-item/todo-item.component";

export const TodoListComponent = (todoItems, title) =>
  !todoItems.length
    ? ""
    : `
  <h2 class="${title.toLowerCase()}-todo-list__title">${title}</h2>
  ${todoItems.map((todo) => TodoItemComponent(todo)).join("")}
  <div class="${title.toLowerCase()}-todo-list__clear-button-wrapper">
    <button
      onclick="todoList.deleteListByFlag('${title}'); updateView();"
      class="${title.toLowerCase()}-todo-list__clear-button"
    >Clear "${title}" list</button>
  </div>
`;
