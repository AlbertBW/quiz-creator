export function createButton(className, text) {
  const button = document.createElement("button");
  button.setAttribute("class", className);
  button.textContent = text;
  button.style.width = "11rem";
  button.style.height = "4rem";
  button.style.borderRadius = "1rem";
  button.style.backgroundColor = "#cbd5e1";
  button.style.boxShadow =
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
  button.style.transition =
    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)";

  // if className is not a number, number means it's an answer button
  if (isNaN(className)) {
    button.addEventListener("mouseenter", function (event) {
      event.target.style.backgroundColor =
        event.type === "mouseenter" ? "#94a3b8" : "#cbd5e1";
    });
    button.addEventListener("mouseleave", function (event) {
      event.target.style.backgroundColor =
        event.type === "mouseleave" ? "#cbd5e1" : "#94a3b8";
    });
  }
  return button;
}
