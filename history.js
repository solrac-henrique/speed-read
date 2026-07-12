const HISTORY_KEY = 'swiftread_history';

function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

function addToHistory(text, wordCount) {
  const history = getHistory();
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    preview: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
    wordCount: wordCount
  };
  history.unshift(entry); // mais recente primeiro
  if (history.length > 50) history.pop(); // limite de 50
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  const history = getHistory();
  if (history.length === 0) {
    list.innerHTML = '<li style="color: var(--text-secondary); opacity:0.6;">Nenhuma leitura salva ainda.</li>';
    return;
  }
  list.innerHTML = history.map(item => `
    <li>
      <span>${item.preview}</span>
      <small>${item.wordCount} palavras - ${item.date}</small>
    </li>
  `).join('');
}

function clearHistory() {
  if (confirm('Tem certeza que deseja limpar o histórico?')) {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  }
}

// Salvar leitura atual
document.getElementById('saveHistoryBtn').addEventListener('click', () => {
  const text = document.getElementById('textInput').value.trim();
  if (!text) {
    alert('Cole algum texto antes de salvar!');
    return;
  }
  const words = text.split(/\s+/).filter(w => w.length > 0);
  addToHistory(text, words.length);
  alert('✅ Leitura salva no histórico!');
});

document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);

// Carrega histórico ao iniciar
document.addEventListener('DOMContentLoaded', renderHistory);
