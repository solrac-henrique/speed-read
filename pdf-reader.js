// Usando PDF.js via CDN (carregado no index.html)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + ' ';
  }

  return fullText.trim();
}

// Integração com o upload
document.getElementById('fileInput').addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (!file) return;

  let text = '';

  if (file.type === 'application/pdf') {
    // Carrega PDF.js dinamicamente se não estiver carregado
    if (typeof pdfjsLib === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    text = await extractTextFromPDF(file);
  } else {
    text = await file.text();
  }

  document.getElementById('textInput').value = text;
  // Atualiza contagem
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  document.getElementById('progressText').textContent = `0 / ${words.length || 0}`;

  // Feedback visual
  alert(`📄 Arquivo carregado! ${words.length || 0} palavras encontradas.`);
});
