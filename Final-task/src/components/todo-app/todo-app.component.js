import { searchInTodoList } from "../../helpers";
import { TodoListComponent } from "../todo-list/todo-list.component";

export const TodoAppComponent = (todoList, searchingValue) => `
  ${TodoListComponent(
    searchInTodoList(todoList.openedTodoItems, searchingValue),
    "Open"
  )}
  ${TodoListComponent(
    searchInTodoList(todoList.closedTodoItems, searchingValue),
    "Done"
  )}
`;
