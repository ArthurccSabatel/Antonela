const params = new URLSearchParams(window.location.search);
const tema = params.get("tema");

// Elementos
const quizTitle = document.getElementById("quizTitle");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let currentQuestion = 0;
let score = 0;

// Perguntas
const quizzes = {
  gorillaz: {
    title: "🎧 Quiz Gorillaz",
    questions: [
      {
        question: "Qual música do Gorillaz ela mais gosta?",
        answers: ["Feel Good Inc.", "Clint Eastwood", "On Melancholy Hill"],
        correct: 0
      },
      {
        question: "O estilo do Gorillaz é mais:",
        answers: ["Alternativo / experimental", "Sertanejo", "K-pop"],
        correct: 0
      }
    ]
  },

  bts: {
    title: "💜 Quiz BTS",
    questions: [
      {
        question: "BTS é mais conhecido por:",
        answers: ["K-pop", "Rock pesado", "Eletrônica underground"],
        correct: 0
      },
      {
        question: "O que mais combina com BTS?",
        answers: ["Coreografias incríveis", "Letras sem dança", "Só instrumental"],
        correct: 0
      }
    ]
  },

  eu: {
    title: "😏 Quiz Sobre Mim",
    questions: [
      {
        question: "Quem é o amor da vida dela?",
        answers: ["Eu", "Eu", "Eu"],
        correct: 0
      },
      {
        question: "Quem fez esse site maravilhoso?",
        answers: ["O amor dela", "Um alien azul 👽", "Um gênio anônimo"],
        correct: 0
      }
    ]
  }
};

const quiz = quizzes[tema];
quizTitle.innerText = quiz.title;

loadQuestion();

function loadQuestion() {
  feedbackEl.innerText = "";
  nextBtn.classList.add("d-none");
  answersEl.innerHTML = "";

  const q = quiz.questions[currentQuestion];
  questionEl.innerText = q.question;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light btn-lg";
    btn.innerText = answer;

    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  const correct = quiz.questions[currentQuestion].correct;

  if (index === correct) {
    score++;
    feedbackEl.innerText = "Acertou 😍";
    feedbackEl.className = "text-success mt-3";
  } else {
    feedbackEl.innerText = "Errado 😅";
    feedbackEl.className = "text-warning mt-3";
  }

  nextBtn.classList.remove("d-none");
}

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < quiz.questions.length) {
    loadQuestion();
  } else {
    showFinalMessage();
  }
};

function showFinalMessage() {
  answersEl.innerHTML = "";
  nextBtn.classList.add("d-none");

  const total = quiz.questions.length;

  let message = "";

  if (score === total) {
    message = "PERFEITO 💙 Você acertou tudo! Eu te amo 😍";
  } else if (score === 1) {
    message = "Quase lá 😄 mas o importante é o carinho 💕";
  } else {
    message = "Hmm… precisamos conversar 😏💙";
  }

  questionEl.innerText = "Resultado final:";
  feedbackEl.innerText = message;
  feedbackEl.className = "fs-4 text-info mt-4";
}
