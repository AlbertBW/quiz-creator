import { bodyStyle } from "./js/bodyStyle.js";
import { addQuestionUI } from "./js/questionPage.js";
import { footer } from "./js/footer.js";
import { createGame, exampleQuestions } from "./js/gameData.js";
import { header } from "./js/header.js";
import { landingPage } from "./js/landingPage.js";
import { clearPage } from "./js/utils.js";
import { playGame } from "./js/playGame.js";

// addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   e.returnValue = true;
// });

const title = document.createElement("title");
title.textContent = "Quiz Creator";
document.head.appendChild(title);

bodyStyle();
header("Quiz Creator");
landingPage();
footer("© Albert Wales 2024", "GitHub", "");

const game = createGame();

document
  .querySelector(".create-game")
  .addEventListener("click", handleCreateQuiz);
document
  .querySelector(".play-example")
  .addEventListener("click", handlePlayExample);

function handleCreateQuiz() {
  clearPage();
  addQuestionUI(game);
}

function handlePlayExample() {
  clearPage();
  exampleQuestions.forEach((q) => {
    const formData = new FormData();

    formData.append("question", q.question);
    formData.append("answer1", q.answer1);
    formData.append("answer2", q.answer2);
    formData.append("answer3", q.answer3);
    formData.append("answer4", q.answer4);
    formData.append("correct-answer", q["correct-answer"]);

    const data = Object.fromEntries(formData);
    data["correct-answer"] = Number(data["correct-answer"]);

    game.addQuestion(data);
  });

  playGame(game);
}
