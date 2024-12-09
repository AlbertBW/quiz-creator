export function createGame() {
  let questions = [];
  let score = 0;
  let id = 1;

  return {
    addQuestion(formData) {
      const newQuestion = {
        id,
        question: formData.question,
        answers: {
          1: formData.answer1,
          2: formData.answer2,
          3: formData.answer3,
          4: formData.answer4,
        },
        correctAnswer: formData["correct-answer"],
        userAnswer: null,
      };

      questions.push(newQuestion);

      id++;
    },

    addUserAnswer(questionId, userAnswer) {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        question.userAnswer = parseInt(userAnswer);
      }
    },

    incrementScore() {
      score++;
      console.log(score);
    },

    getScore() {
      return score;
    },

    resetGame() {
      questions = [];
      score = 0;
      id = 1;
    },

    getQuestion(questionId) {
      const q = questions.find((q) => q.id === questionId);

      return q;
    },

    getAllQuestions() {
      return questions;
    },

    getLength() {
      return questions.length;
    },
  };
}

export const exampleQuestions = [
  {
    question: "What is the capital of France?",
    answer1: "Berlin",
    answer2: "Paris",
    answer3: "Madrid",
    answer4: "Rome",
    "correct-answer": 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer1: "Earth",
    answer2: "Venus",
    answer3: "Mars",
    answer4: "Jupiter",
    "correct-answer": 3,
  },
  {
    question: "What is the largest ocean on Earth?",
    answer1: "Atlantic Ocean",
    answer2: "Indian Ocean",
    answer3: "Pacific Ocean",
    answer4: "Arctic Ocean",
    "correct-answer": 3,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer1: "William Shakespeare",
    answer2: "Charles Dickens",
    answer3: "Jane Austen",
    answer4: "Mark Twain",
    "correct-answer": 1,
  },
  {
    question: "What is the boiling point of water at sea level?",
    answer1: "100°C",
    answer2: "212°F",
    answer3: "Both 1 and 2",
    answer4: "Neither 1 nor 2",
    "correct-answer": 3,
  },
  {
    question: "What is the square root of 64?",
    answer1: "6",
    answer2: "7",
    answer3: "8",
    answer4: "9",
    "correct-answer": 3,
  },
  {
    question: "What is the chemical symbol for gold?",
    answer1: "Ag",
    answer2: "Au",
    answer3: "Pb",
    answer4: "Fe",
    "correct-answer": 2,
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answer1: "Tiger",
    answer2: "Lion",
    answer3: "Elephant",
    answer4: "Cheetah",
    "correct-answer": 2,
  },
  {
    question: "How many continents are there?",
    answer1: "5",
    answer2: "6",
    answer3: "7",
    answer4: "8",
    "correct-answer": 3,
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answer1: "0°C",
    answer2: "32°C",
    answer3: "-1°C",
    answer4: "-100°C",
    "correct-answer": 1,
  },
];
