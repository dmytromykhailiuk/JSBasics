export const focusOnTodoInput = () => {
  const focusedInput = document.getElementById("editable-input");
  if (focusedInput) {
    focusedInput.focus();
  }
};
