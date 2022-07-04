window.addEventListener("load", init);
const input = document.getElementById("input-word");
const button = document.getElementById("button");
const value = document.getElementById("value");
const timer = document.getElementById("timer");
const form = document.getElementById("form");
const randomWords = document.getElementById("randomWords");
const scoreH = document.getElementById("score");
const last = document.getElementById("last");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

let words;
let lastScore;
const hardTime = 3;
const mediumTime = 5;
const easyTime = 7;
let game = true;
let countdown;
let current;
let score = 0;

function random() {
  fetch("https://random-word-api.herokuapp.com/word")
    .then((response) => response.json())
    .then((data) => ((words = data[0]), (randomWords.innerHTML = words)));
}

function init() {
  random();
  countdown = mediumTime;
  current = mediumTime;
  game = true;
  setInterval(stats, 50);
  setInterval(time, 1000);
  input.addEventListener("input", start);
  easy.addEventListener("click", function () {
    countdown = easyTime;
    current = easyTime;
    game = false;
  });
  medium.addEventListener("click", function () {
    countdown = mediumTime;
    current = mediumTime;
    game = false;
  });
  hard.addEventListener("click", function () {
    countdown = hardTime;
    current = hardTime;
    game = false;
  });
}

function start() {
  if (match() == true) {
    score += 1;
    countdown = current;
    random();
  }
  if (score === 0) {
    scoreH.innerHTML = 0;
  } else {
    scoreH.innerHTML = score;
  }
  //scoreH.innerHTML = score;
}

function match() {
  if (input.value == randomWords.innerHTML) {
    console.log("Correct");
    input.value = "";
    return true;
  } else {
    console.log("False");
    return false;
  }
}

function time() {
  if (countdown > 0) {
    game = true;
    countdown -= 1;
    timer.innerHTML = countdown;
  } else if (countdown === 0) {
    game = false;
  }
}

function stats() {
  if (game) {
    console.log("Game is still running !");
  } else if (game == false) {
    score = 0;
    console.log("Game over ...");
  }
}
