// ===== ESTADO =====
let words = [];
let currentIndex = 0;
let timer = null;
let isPlaying = false;
let speed = 300;

// ===== DOM =====
const textInput = document.getElementById('textInput');
const wordDisplay = document.getElementById('wordDisplay');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const speedControl = document.getElementById('speedControl');
const speedDisplay = document.getElementById('speedDisplay');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

// ===== VELOCIDADE =====
speedControl.addEventListener('input', () => {
  speed = parseInt(speedControl.value);
  speedDisplay.textContent = speed;
  if (isPlaying) {
    clearInterval(timer);
    timer = setInterval(showWord, 60000 / speed);
  }
});

// ===== FUNÇÃO PRINCIPAL =====
function showWord() {
  if (currentIndex < words.length) {
    wordDisplay.textContent = words[currentIndex];
    updateProgress();
    currentIndex++;
  } else {
    clearInterval(timer);
    isPlaying = false;
    playBtn.textContent = document.getElementById('langSelector').value === 'pt' ? '▶ Play' : 
                         document.getElementById('langSelector').value === 'en' ? '▶ Play' : '▶ Play';
    const lang = document.getElementById('langSelector').value;
    wordDisplay.textContent = translations[lang]?.readingComplete || '✅ Leitura concluída!';
  }
}

function updateProgress() {
  const total = words.length || 1;
  const current = Math.min(currentIndex, total);
  progressText.textContent = `${current} / ${total}`;
  progressFill.style.width = `${(current / total) * 100}%`;
}

function startReading() {
  const text = textInput.value.trim();
  if (!text) {
    const lang = document.getElementById('langSelector').value;
    wordDisplay.textContent = translations[lang]?.clickPlay || '📖 Cole algum texto!';
    return;
  }

  if (timer) clearInterval(timer);

  words = text.split(/\s+/).filter(word => word.length > 0);
  currentIndex = 0;
  isPlaying = true;
  playBtn.textContent = '⏳ Lendo...';

  const interval = 60000 / speed;
  timer = setInterval(showWord, interval);
  showWord();
}

// ===== EVENTOS =====
playBtn.addEventListener('click', startReading);

pauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    clearInterval(timer);
    isPlaying = false;
    playBtn.textContent = '▶ Continuar';
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isPlaying = false;
  currentIndex = 0;
  const lang = document.getElementById('langSelector').value;
  playBtn.textContent = translations[lang]?.play || '▶ Play';
  wordDisplay.textContent = translations[lang]?.clickPlay || '📖 Clique em Play';
  progressText.textContent = '0 / 0';
  progressFill.style.width = '0%';
});

// ===== TEMA =====
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('prefTheme', newTheme);
});

// Carrega tema salvo
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('prefTheme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});
