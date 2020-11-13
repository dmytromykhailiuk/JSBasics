export const searchInTodoList = (todoList, searchingValue) =>
  todoList.filter((todo) =>
    !searchingValue.trim()
      ? true
      : `${todo.name} ${todo.creationDate} ${
          todo.closingDate ? todo.closingDate : ""
        }`
          .toLowerCase()
          .includes(searchingValue.trim().toLowerCase())
  );
