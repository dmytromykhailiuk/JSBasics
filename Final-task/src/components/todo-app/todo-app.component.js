import { searchInTodoList } from "../../helpers";
import { TodoListComponent } from "../todo-list/todo-list.component";

export const TodoAppComponent = (
  todoList,
  searchingValue,
  selectedSortingOptions
) => `
  ${TodoListComponent(
    searchInTodoList(todoList.openedTodoItems, searchingValue),
    "Open",
    selectedSortingOptions.open
  )}
  ${TodoListComponent(
    searchInTodoList(todoList.closedTodoItems, searchingValue),
    "Done",
    selectedSortingOptions.done
  )}
`;
