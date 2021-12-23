const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const out = document.querySelector("#out");
import { questions } from "../db/questions";

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;

let level = 0;
let questionsAlreadyUsedForLevel = [];

out.addEventListener("click", (e) => {
  localStorage.setItem("mostRecentScore", score);

  return window.location.assign("/end.html");
});

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

const startGame = () => {
  level = 0;
  questionsAlreadyUsedForLevel = [];
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

const throwRandomQuestion = (chunkQuestions) => {
  let index = Math.floor(Math.random() * 5 + 0);
  return chunkQuestions[index];
};

const getNewQuestion = () => {
  if (questionCounter === MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  currentQuestion = throwRandomQuestion(questions[level]);
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  level++;
  //   availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else {
      localStorage.setItem("mostRecentScore", score);

      return window.location.assign("/end.html");
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
