export const sortTodo = (todos, sortingOption) => {
  return [...todos].sort((leftTodo, rightTodo) => {
    switch (sortingOption) {
      case "Date creation (Asc)":
        return leftTodo.creationDateValue - rightTodo.creationDateValue;
      case "Date creation (Desk)":
        return rightTodo.creationDateValue - leftTodo.creationDateValue;
      case "Date complete (Asc)":
        return leftTodo.closingDateValue - rightTodo.closingDateValue;
      case "Date complete (Desk)":
        return rightTodo.closingDateValue - leftTodo.closingDateValue;
      case "Text (Asc)":
        return leftTodo.name.length - rightTodo.name.length;
      case "Text (Desk)":
      default:
        return rightTodo.name.length - leftTodo.name.length;
    }
  });
};
