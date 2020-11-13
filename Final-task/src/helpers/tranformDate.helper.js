export const tranformDate = (date) =>
  date
    .toLocaleDateString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ")
    .slice(1)
    .join(" ");
