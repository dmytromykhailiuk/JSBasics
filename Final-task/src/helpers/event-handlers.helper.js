export const callEventHandlers = (...handlers) => (event) => {
  handlers.forEach((handler) => handler(event));
};

export const enterPresed = (...handlers) => (keyEvent) => {
  if (keyEvent.code === "Enter") {
    handlers.forEach((handler) => {
      handler();
    });
  }
};

export const escapePresed = (...handlers) => (keyEvent) => {
  if (keyEvent.code === "Escape") {
    handlers.forEach((handler) => {
      handler();
    });
  }
};
