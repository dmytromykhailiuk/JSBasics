import "./todo-item.component.scss";
import { trashIcon } from "../../assets/trash-icon";

export const TodoItemComponent = (todoItem) => `
  <div class="todo-item">
    <div class="todo-item__left-side">
      <input
        type="checkbox" 
        class="todo-item__checkbox" 
        ${todoItem.isDone ? "checked" : ""} 
        onclick="todoList.triggerTodoStatusByMessage('${
          todoItem.name
        }'); updateView();"
      />
      ${
        todoItem.isEditMode
          ? `
        <input
          id="editable-input"
          value='${todoItem.name}'
          onkeyup="callEventHandlers(enterPresed(() => todoList.updateTodoInEdidMode(), updateView), escapePresed(() => todoList.closeEdidMode(), updateView))(event);"
          ondblclick="todoList.updateTodoInEdidMode(); updateView()"
        />
      `
          : `<p ondblclick="todoList.editTodoByMessage('${todoItem.name}'); updateView();"
          >${todoItem.name}</p>`
      }   
    </div>
    <div class="todo-item__right-side">
      <div class="todo-item__date">
        <p>${todoItem.creationDate}</p>
        ${todoItem.closingDate ? "<p>" + todoItem.closingDate + "</p>" : ""}
      </div>
      <div 
        class="todo-item__trash"
        onclick="todoList.deleteTodoByMessage('${
          todoItem.name
        }'); updateView();"
      >${trashIcon}</div>
    </div>
  </div>
`;
