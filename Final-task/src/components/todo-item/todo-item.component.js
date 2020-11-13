import "./todo-item.component.scss";
import { trashIcon } from "../../assets/trash-icon";

export const TodoItemComponent = (todoItem) => `
  <div class="todo-item">
    <div class="todo-item__left-side">
      <input
        type="checkbox" 
        class="todo-item__checkbox" 
        ${todoItem.isDone ? "checked" : ""} 
        onclick="todo.triggerStatys(); updateView()" 
      />
      <p>${todoItem.name}</p>
    </div>
    <div class="todo-item__right-side">
      <div class="todo-item__date">
        <p>${todoItem.creationDate}</p>
        ${todoItem.closingDate ? "<p>" + todoItem.closingDate + "</p>" : ""}
      </div>
      <div class="todo-item__trash">${trashIcon}</div>
    </div>
  </div>
`;
