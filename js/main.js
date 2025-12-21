// 🎵 Controle da música
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerText = "🎵 Tocar música";
  } else {
    music.play();
    musicBtn.innerText = "⏸ Pausar música";
  }
  isPlaying = !isPlaying;
});

// 🎧 Select de tema do quiz
const temaSelect = document.getElementById("temaSelect");
const btnQuiz = document.getElementById("btnQuiz");

btnQuiz.addEventListener("click", () => {
  const tema = temaSelect.value;

  if (!tema) {
    alert("Escolhe um tema primeiro 😅");
    return;
  }

  // envia o tema pela URL
  window.location.href = `quiz.html?tema=${tema}`;
});

// ✍️ Efeito máquina de escrever
const titleText = "Ablublublue";
const subtitleText = "ablublbubluevlubaçlsfsnfçlenSK";

const titleElement = document.getElementById("title");
const subtitleElement = document.getElementById("subtitle");

titleElement.setAttribute("data-text", titleText);

let i = 0;
let j = 0;

function typeTitle() {
  if (i < titleText.length) {
    titleElement.innerHTML += titleText.charAt(i);
    titleElement.setAttribute("data-text", titleElement.innerText);
    i++;
    setTimeout(typeTitle, 80);
  } else {
    setTimeout(typeSubtitle, 400);
  }
}

function typeSubtitle() {
  if (j < subtitleText.length) {
    subtitleElement.innerHTML += subtitleText.charAt(j);
    j++;
    setTimeout(typeSubtitle, 50);
  }
}

typeTitle();


// 🌿 Partículas estilo Avatar (mobile friendly)
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let maxParticles = window.innerWidth < 600 ? 40 : 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.alpha = Math.random();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 180, 255, ${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.y -= this.speedY;

    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  }
}

// Cria partículas
for (let i = 0; i < maxParticles; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ✨ Pulso de energia ao toque
document.addEventListener("click", (e) => {
  const pulse = {
    x: e.clientX,
    y: e.clientY,
    r: 0,
    alpha: 0.5
  };

  function drawPulse() {
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,200,255,${pulse.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    pulse.r += 2;
    pulse.alpha -= 0.02;

    if (pulse.alpha > 0) {
      requestAnimationFrame(drawPulse);
    }
  }

  drawPulse();
});
