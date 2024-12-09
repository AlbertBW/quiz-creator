import { createButton } from "./createButton.js";

export function playGame(game) {
  const gameLength = game.getLength();
  const main = document.querySelector("main");
  const ready = readyState(gameLength);
  main.appendChild(ready.readyDiv);

  ready.playButton.addEventListener("click", () => {
    clearReadyState();

    gameRound(game, 1);
  });
}

function createScoreBoard(gameLength) {
  const div = document.createElement("div");
  div.style.cssText =
    "display: flex; justify-content: center; align-items: stretch; gap: 1rem; flex-wrap: wrap;";

  for (let i = 1; i <= gameLength; i++) {
    const gameRoundBox = document.createElement("div");
    gameRoundBox.style.cssText =
      "max-width: 3.5rem; aspect-ratio: 1; flex: 1 1 2.8rem; border: solid #6b7280 0.2rem; border-radius: 0.2rem; display: flex; justify-content: center; align-items: center;";

    gameRoundBox.textContent = `Q${i}`;

    div.appendChild(gameRoundBox);
  }

  return div;
}

function readyState(gameLength) {
  const readyDiv = document.createElement("div");
  readyDiv.setAttribute("class", "ready-section");
  readyDiv.style.flex = "1";
  readyDiv.style.display = "flex";
  readyDiv.style.flexDirection = "column";
  readyDiv.style.justifyContent = "center";
  readyDiv.style.alignItems = "center";

  const h2 = document.createElement("h2");
  h2.textContent = "Are you ready to play the quiz?";

  const p = document.createElement("p");
  p.innerHTML = `You have ${gameLength} questions to answer <br/><br/>  Press Play when you're ready to begin <br/> <br/>`;
  p.style.textAlign = "center";

  const playButton = createButton("play", "Play");

  readyDiv.appendChild(h2);
  readyDiv.appendChild(p);
  readyDiv.appendChild(playButton);

  return { readyDiv, playButton };
}

function clearReadyState() {
  const readyDiv = document.querySelector(".ready-section");
  if (readyDiv) {
    readyDiv.remove();
  }
}

function gameRound(game, questionId) {
  const gameLength = game.getLength();
  const userScore = game.getScore();
  const question = game.getQuestion(questionId);
  const correctAnswer = question.answers[question.correctAnswer];

  const main = document.querySelector("main");
  const scoreBoard = createScoreBoard(gameLength);
  const bottomGapFiller = document.createElement("div");
  bottomGapFiller.style.cssText = "height: 6rem; width: full;";

  let selectedAnswer;

  const gameSection = document.createElement("div");
  gameSection.style.flex = "1";
  gameSection.style.display = "flex";
  gameSection.style.flexDirection = "column";
  gameSection.style.justifyContent = "center";
  gameSection.style.alignItems = "center";

  const h2 = document.createElement("h2");
  h2.textContent = `Question ${questionId}`;

  const questionText = document.createElement("p");
  questionText.textContent = question.question;
  questionText.style.marginTop = "0";
  questionText.style.marginBottom = "2rem";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "answer-buttons";
  buttonsDiv.style.display = "flex";
  buttonsDiv.style.flexDirection = "column";

  Object.entries(question.answers).forEach(([key, value]) => {
    const button = createButton(key, value);
    button.id = key;
    buttonsDiv.appendChild(button);
  });

  const answerButtons = buttonsDiv.querySelectorAll("button");

  const confirmBtn = createButton(0, "Confirm");
  confirmBtn.style.marginTop = "0.4rem";
  confirmBtn.style.backgroundColor = "#16a34a";
  confirmBtn.style.color = "white";
  confirmBtn.style.opacity = "0.4";
  confirmBtn.style.border = "0.1rem solid #cbd5e1";
  confirmBtn.disabled = true;

  const nextRoundBtn = createButton(0, "Next Question");
  nextRoundBtn.style.marginTop = "0.4rem";
  nextRoundBtn.style.border = "0.1rem solid #cbd5e1";

  confirmBtn.addEventListener("mouseenter", function (event) {
    event.target.style.backgroundColor =
      event.type === "mouseenter" ? "#166534" : "#16a34a";
  });
  confirmBtn.addEventListener("mouseleave", function (event) {
    event.target.style.backgroundColor =
      event.type === "mouseleave" ? "#16a34a" : "#166534";
  });

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      confirmBtn.disabled = false;
      confirmBtn.style.opacity = "1";
      selectedAnswer = button.className;
      answerButtons.forEach((btn) => {
        btn.style.backgroundColor = "";
        if (selectedAnswer === btn.className) {
          btn.style.backgroundColor = "#67e8f9";
        }
      });
    });
  });

  confirmBtn.addEventListener("click", function () {
    const correctBtn = document.getElementById(question.correctAnswer);
    game.addUserAnswer(questionId, selectedAnswer);
    if (question.correctAnswer == selectedAnswer) {
      correctBtn.style.backgroundColor = "#16a34a";
      correctBtn.style.color = "white";
      game.incrementScore();
      score.textContent = `Score: ${userScore + 1} / ${gameLength}`;
    } else {
      const selectedBtn = document.getElementById(selectedAnswer);
      selectedBtn.style.backgroundColor = "#dc2626";
      selectedBtn.style.color = "white";
      correctBtn.style.color = "black";
      correctBtn.style.backgroundColor = "#67e8f9";
    }

    correctAnswerText.textContent = `Correct Answer: ${correctAnswer}`;
    answerButtons.forEach((btn) => {
      btn.disabled = true;
    });

    gameSection.removeChild(confirmBtn);
    gameSection.insertBefore(nextRoundBtn, score);
    if (questionId < gameLength) {
      nextRoundBtn.addEventListener("click", () => {
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }
        gameRound(game, questionId + 1);
      });
    } else {
      score.textContent = `Final Score: ${userScore + 1} / ${gameLength}`;
      // Final score screen
      nextRoundBtn.textContent = "Summary";
      nextRoundBtn.addEventListener("click", () => {
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }
        summary(game);
      });
    }
  });

  const score = document.createElement("p");
  score.textContent = `Score: ${userScore} / ${gameLength}`;

  const correctAnswerText = document.createElement("p");
  correctAnswerText.style.margin = "0";
  correctAnswerText.style.marginTop = "0.4rem";
  correctAnswerText.style.minHeight = "1rem";
  correctAnswerText.textContent = ``;

  gameSection.appendChild(h2);
  gameSection.appendChild(questionText);
  gameSection.appendChild(buttonsDiv);
  gameSection.appendChild(correctAnswerText);
  gameSection.appendChild(confirmBtn);
  gameSection.appendChild(score);

  main.appendChild(scoreBoard);
  main.appendChild(gameSection);
  main.appendChild(bottomGapFiller);
}

function summary(game) {
  const gameLength = game.getLength();
  const userScore = game.getScore();
  const questions = game.getAllQuestions();

  const h2 = document.createElement("h2");
  h2.textContent = "Final Summary";

  const finalScore = document.createElement("h3");
  finalScore.textContent = `You got ${userScore} out of ${gameLength} answers correct!`;

  const main = document.querySelector("main");
  main.appendChild(h2);
  main.appendChild(finalScore);

  questions.forEach((q) => {
    const questionHeader = document.createElement("h4");
    questionHeader.textContent = `Question ${q.id}`;
    questionHeader.style.borderTop = "1px solid white";
    questionHeader.style.paddingTop = "1rem";

    const questionText = document.createElement("h5");
    questionText.textContent = q.question;

    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Correct answer: ${q.answers[q.correctAnswer]}`;

    const userAnswer = document.createElement("p");
    userAnswer.innerHTML = `Your answer: <span id="user-answer-${q.id}">${
      q.answers[q.userAnswer]
    }</span>`;

    const questionResult = document.createElement("p");

    main.appendChild(questionHeader);
    main.appendChild(questionResult);
    main.appendChild(questionText);
    main.appendChild(correctAnswer);
    main.appendChild(userAnswer);

    const userAnswerSpan = document.querySelector(`#user-answer-${q.id}`);
    if (q.userAnswer === q.correctAnswer) {
      questionResult.textContent = "Correct";
      questionResult.style.color = "green";
      userAnswerSpan.style.color = "green";
    } else {
      questionResult.textContent = "Wrong";
      userAnswerSpan.style.color = "red";
      questionResult.style.color = "red";
    }
  });

  const home = document.createElement("a");
  home.href = "/";
  home.textContent = "Play another game";
  home.style.borderTop = "1px solid white";
  home.style.padding = "2rem";
  home.style.textAlign = "center";
  main.appendChild(home);
}
