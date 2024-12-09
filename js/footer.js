export function footer(author, linkText, linkHref) {
  const footer = document.createElement("footer");
  const span = document.createElement("span");
  const a = document.createElement("a");

  span.textContent = author;
  a.textContent = linkText;
  a.href = linkHref;

  footer.style.cssText =
    "display: flex; justify-content: space-around; padding: 1rem; width: 90%; max-width: 80rem; margin: auto;";

  footer.appendChild(span);
  footer.appendChild(a);
  document.body.appendChild(footer);
}
