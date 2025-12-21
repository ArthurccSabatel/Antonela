const musicTitle = document.getElementById("musicTitle");
const coversEl = document.getElementById("covers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
let score = 0;

// 🎵 BANCO DE QUESTÕES (EXEMPLO)
// depois você troca músicas e imagens
const gameData = [
  {
    music: "Feel Good Inc.",
    covers: [
      "assets/img/gorillaz1.jpg",
      "assets/img/gorillaz2.jpg",
      "assets/img/gorillaz3.jpg"
    ],
    correct: 0
  },
  {
    music: "Dynamite",
    covers: [
      "assets/img/bts1.jpg",
      "assets/img/bts2.jpg",
      "assets/img/bts3.jpg"
    ],
    correct: 1
  }
];

loadRound();

function loadRound() {
  feedbackEl.innerText = "";
  nextBtn.classList.add("d-none");
  coversEl.innerHTML = "";

  const round = gameData[current];
  musicTitle.innerText = round.music;

  round.covers.forEach((src, index) => {
    const col = document.createElement("div");
    col.className = "col-4";

    const div = document.createElement("div");
    div.className = "cover";

    const img = document.createElement("img");
    img.src = src;

    div.appendChild(img);
    col.appendChild(div);
    coversEl.appendChild(col);

    div.onclick = () => checkAnswer(div, index);
  });
}

function checkAnswer(element, index) {
  const correct = gameData[current].correct;

  if (index === correct) {
    element.classList.add("correct");
    feedbackEl.innerText = "Acertou 😍🎉";
    feedbackEl.className = "text-success mt-3";
    score++;
  } else {
    element.classList.add("wrong");
    feedbackEl.innerText = "Errado 😅";
    feedbackEl.className = "text-warning mt-3";
  }

  nextBtn.classList.remove("d-none");
}

nextBtn.onclick = () => {
  current++;

  if (current < gameData.length) {
    loadRound();
  } else {
    showResult();
  }
};

function showResult() {
  coversEl.innerHTML = "";
  musicTitle.innerText = "Resultado final 🎉";

  let message = "";

  if (score === gameData.length) {
    message = "PERFEITO 💙 você acertou todas!";
  } else if (score >= 1) {
    message = "Mandou bem 😄 quase perfeito!";
  } else {
    message = "Vamos treinar mais 🎧😏";
  }

  feedbackEl.innerText = message;
  feedbackEl.className = "fs-4 text-info mt-4";
}
