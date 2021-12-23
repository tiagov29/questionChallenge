const question = document.querySelector("#question");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const out = document.querySelector("#out");
const choices = Array.from(document.querySelectorAll(".choice-text"));

export { question, progressText, scoreText, progressBarFull, choices, out };
