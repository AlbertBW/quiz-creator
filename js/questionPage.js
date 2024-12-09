import { createButton } from "./createButton.js";
import { playGame } from "./playGame.js";
import { clearPage } from "./utils.js";

export function addQuestionUI(game) {
  const gameRound = game.getLength() + 1;
  const main = document.querySelector("main");

  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.justifyContent = "center";
  form.style.alignItems = "center";

  const h2 = document.createElement("h2");
  h2.textContent = `Question ${gameRound}`;
  h2.style.textAlign = "center";
  h2.style.fontSize = "2rem";
  h2.style.marginBottom = "2rem";

  const innerDiv = document.createElement("div");
  innerDiv.style.cssText =
    "display: flex; flex-direction: column; align-items: center; margin-bottom: 1rem; border: solid 0.1rem #ccc; border-radius: 1rem; padding: 1rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #1e293b;";

  const question = createLabelAndInput("question", `Enter Question:`);

  question.input.setAttribute("min", "3");

  const span = document.createElement("span");
  span.style.fontWeight = "bold";
  span.style.marginBottom = "0.5rem";
  span.textContent = "Possible Answers";

  const answerDiv = document.createElement("div");
  answerDiv.style.width = "100%";
  answerDiv.style.marginBottom = "0.5rem";

  const answer1 = createLabelAndInput("answer1", "1");
  const answer2 = createLabelAndInput("answer2", "2");
  const answer3 = createLabelAndInput("answer3", "3");
  const answer4 = createLabelAndInput("answer4", "4");
  const answers = [answer1, answer2, answer3, answer4];

  const correctAnswerDiv = document.createElement("div");
  correctAnswerDiv.style.cssText =
    "width: 100%; margin-top: 1rem; align-items: center; display: flex; flex-direction: column; margin-bottom: 2rem;";
  const correctLabel = document.createElement("label");
  const correctInput = document.createElement("input");
  correctInput.setAttribute("required", "true");

  const nextQuestionBtn = createButton("next-question", "Next question");
  gameRound >= 10 && nextQuestionBtn.setAttribute("disabled", "true");
  const completeBtn = createButton("complete-questions", "Complete");

  correctLabel.style.fontWeight = "bold";
  correctLabel.style.marginBottom = "0.5rem";
  correctLabel.setAttribute("for", "correct-answer");
  correctLabel.textContent = "Correct Answer";
  correctInput.setAttribute("type", "number");
  correctInput.setAttribute("min", "1");
  correctInput.setAttribute("max", "4");
  correctInput.setAttribute("name", "correct-answer");
  correctInput.setAttribute("id", "correct-answer");
  correctInput.style.cssText =
    "width: 3rem; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem; background-color: #0f172a; color: #e5e7eb;";

  innerDiv.appendChild(h2);
  innerDiv.appendChild(question.label);
  innerDiv.appendChild(question.input);
  innerDiv.appendChild(span);
  innerDiv.appendChild(answerDiv);
  answers.forEach((answer) => {
    answerDiv.appendChild(answer.label);
    answerDiv.appendChild(answer.input);
  });
  correctAnswerDiv.appendChild(correctLabel);
  correctAnswerDiv.appendChild(correctInput);
  innerDiv.appendChild(correctAnswerDiv);
  innerDiv.appendChild(nextQuestionBtn);
  innerDiv.appendChild(completeBtn);
  form.appendChild(innerDiv);
  main.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data["correct-answer"] = Number(data["correct-answer"]);

    game.addQuestion(data);

    if (event.submitter.classList.contains("next-question")) {
      // Action for the "Next question" button
      clearPage();
      addQuestionUI(game);
    } else if (event.submitter.classList.contains("complete-questions")) {
      // Action for the "Complete" button
      clearPage();
      playGame(game);
    }
  });
}

function createLabelAndInput(id, text) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.style.cssText =
    "font-weight: bold; margin-bottom: 0.5rem; margin-left: 0.4rem;";
  label.textContent = text;

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", id);
  input.setAttribute("id", id);
  input.setAttribute("required", "true");
  input.style.cssText =
    "width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 0.5rem; background-color: #0f172a; color: #e5e7eb;";

  return { label, input };
}
