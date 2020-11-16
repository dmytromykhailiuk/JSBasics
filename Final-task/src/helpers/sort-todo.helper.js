export const sortTodo = (todos, sortingOption) => {
  return [...todos].sort((leftTodo, rightTodo) => {
    switch (sortingOption) {
      case "Date creation (Asc)":
        return leftTodo.dateValue - rightTodo.dateValue;
      case "Date creation (Desk)":
        return rightTodo.dateValue - leftTodo.dateValue;
      case "Text (Asc)":
        return leftTodo.name.length - rightTodo.name.length;
      case "Text (Desk)":
      default:
        return rightTodo.name.length - leftTodo.name.length;
    }
  });
};
