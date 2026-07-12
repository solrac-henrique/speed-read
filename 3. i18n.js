const translations = {
  pt: {
    title: 'Leitor Rápido',
    placeholder: 'Cole seu texto aqui ou carregue um arquivo...',
    speed: 'Velocidade (palavras/min):',
    play: '▶ Play',
    pause: '⏸ Pausa',
    reset: '⏹ Reset',
    save: '💾 Salvar',
    upload: '📤 Carregar arquivo (.txt ou .pdf)',
    history: '📚 Histórico de leituras',
    clear: '🗑️ Limpar histórico',
    readingComplete: '✅ Leitura concluída!',
    clickPlay: '📖 Clique em Play'
  },
  en: {
    title: 'Speed Reader',
    placeholder: 'Paste your text here or upload a file...',
    speed: 'Speed (words/min):',
    play: '▶ Play',
    pause: '⏸ Pause',
    reset: '⏹ Reset',
    save: '💾 Save',
    upload: '📤 Upload file (.txt or .pdf)',
    history: '📚 Reading history',
    clear: '🗑️ Clear history',
    readingComplete: '✅ Reading complete!',
    clickPlay: '📖 Click Play'
  },
  es: {
    title: 'Lector Rápido',
    placeholder: 'Pega tu texto aquí o carga un archivo...',
    speed: 'Velocidad (palabras/min):',
    play: '▶ Play',
    pause: '⏸ Pausa',
    reset: '⏹ Reiniciar',
    save: '💾 Guardar',
    upload: '📤 Cargar archivo (.txt o .pdf)',
    history: '📚 Historial de lecturas',
    clear: '🗑️ Limpiar historial',
    readingComplete: '✅ ¡Lectura completada!',
    clickPlay: '📖 Haz clic en Play'
  }
};

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholder
  const textarea = document.getElementById('textInput');
  const placeholderKey = textarea.getAttribute('data-i18n-placeholder');
  if (translations[lang] && translations[lang][placeholderKey]) {
    textarea.placeholder = translations[lang][placeholderKey];
  }
}

// Event listener
document.getElementById('langSelector').addEventListener('change', function() {
  setLanguage(this.value);
  // Salva preferência
  localStorage.setItem('prefLang', this.value);
});

// Carrega idioma salvo
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('prefLang') || 'pt';
  document.getElementById('langSelector').value = savedLang;
  setLanguage(savedLang);
});
