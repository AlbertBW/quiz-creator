export function header(headerText) {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const link = document.createElement("a");
  link.textContent = headerText;
  link.href = "/";
  link.style.textDecoration = "none";
  link.style.color = "inherit";
  link.addEventListener("mouseover", () => {
    link.style.color = "#94a3b8"; // Change to desired hover color
  });
  link.addEventListener("mouseout", () => {
    link.style.color = "inherit";
  });

  h1.appendChild(link);

  headerStyle(header);

  header.appendChild(h1);
  document.body.appendChild(header);
}

function headerStyle(header) {
  header.style.display = "flex";
  header.style.justifyContent = "center";
  header.style.margin = "0.8rem auto";
  header.style.border = "solid #6b7280 0.2rem";
  header.style.borderRadius = "0.6rem";
  header.style.backgroundColor = "#1e293b";
  header.style.maxWidth = "80rem";
  header.style.width = "90%";
  header.style.boxShadow =
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);";
}
