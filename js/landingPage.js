import { createButton } from "./createButton.js";

export function landingPage() {
  const main = document.createElement("main");
  main.style.flex = "1";
  main.style.flexDirection = "column";
  main.style.maxWidth = "80rem";
  main.style.width = "90%";
  main.style.margin = "auto";
  main.style.display = "flex";
  main.style.justifyContent = "center";

  const div = createLandingDiv();
  const subheading = createLandingHeader();
  const bodyText = createlandingBodyText();
  bodyText.style.marginBottom = "2rem";

  const createQuiz = createButton("create-game", "Create your quiz");
  const playExample = createButton("play-example", "Play example game");
  const buttonDiv = document.createElement("div");
  buttonDiv.style.display = "flex";
  buttonDiv.style.flexDirection = "column";
  buttonDiv.style.gap = "1rem";

  buttonDiv.appendChild(createQuiz);
  buttonDiv.appendChild(playExample);

  div.appendChild(subheading);
  div.appendChild(bodyText);
  div.appendChild(buttonDiv);

  main.appendChild(div);
  document.body.appendChild(main);
}

function createLandingDiv() {
  const div = document.createElement("div");
  div.setAttribute("class", "landing-description");

  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.height = "80%";
  div.style.marginBottom = "3rem";

  return div;
}

function createLandingHeader() {
  const h2 = document.createElement("h2");
  h2.textContent = "Create you own quiz!";

  return h2;
}

function createlandingBodyText() {
  const p = document.createElement("p");
  p.innerHTML =
    "You can create up to 10 questions <br /> Each question can have up to 4 possible answers <br /> Only one answer can be correct";

  p.style.textAlign = "center";

  return p;
}
