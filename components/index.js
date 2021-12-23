// game elements
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const out = document.querySelector("#out");

// end elements

export { question, choices, progressText, scoreText, progressBarFull, out };
