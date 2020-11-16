import "./todo-list.component.scss";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { sortTodo } from "../../helpers";

const sortOptions = [
  "Text (Asc)",
  "Text (Desk)",
  "Date creation (Asc)",
  "Date creation (Desk)",
];

const doneSortOptions = [
  ...sortOptions,
  "Date complete (Asc)",
  "Date complete (Desk)",
];

export const TodoListComponent = (todoItems, title, selectedSortingOption) =>
  !todoItems.length
    ? ""
    : `
  <div class="${title.toLowerCase()}-todo-list__header">
    <h2 class="${title.toLowerCase()}-todo-list__title">${title}</h2>
    <select 
      class="${title.toLowerCase()}-todo-list__select"
      value="Date creation (Asc)" 
      onchange="selectedSortingOptions['${title.toLowerCase()}'] = this.value; updateView();" 
    >
      ${(title === "Done" ? doneSortOptions : sortOptions)
        .map(
          (option) =>
            `<option ${
              selectedSortingOption === option ? "selected" : ""
            }>${option}</option>`
        )
        .join("")}
    </select>
  </div>
  ${sortTodo(todoItems, selectedSortingOption)
    .map((todo) => TodoItemComponent(todo))
    .join("")}
  <div class="${title.toLowerCase()}-todo-list__clear-button-wrapper">
    <button
      onclick="todoList.deleteListByFlag('${title}'); updateView();"
      class="${title.toLowerCase()}-todo-list__clear-button"
    >Clear "${title}" list</button>
  </div>
`;
