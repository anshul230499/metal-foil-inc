import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

const previews = document.querySelectorAll('.doc-preview[data-cert-type="pdf"]');

async function renderCertificate(preview) {
  const source = preview.dataset.certSrc;
  const canvas = preview.querySelector('.cert-canvas');
  const loader = preview.querySelector('.cert-loader');

  try {
    const pdf = await pdfjsLib.getDocument({ url: source, withCredentials: false }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.45 });
    const context = canvas.getContext('2d', { alpha: false });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    context.save();
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    await page.render({ canvasContext: context, viewport }).promise;
    preview.classList.add('cert-loaded');
    if (loader) loader.remove();
  } catch (error) {
    preview.classList.add('cert-load-failed');
    if (loader) loader.remove();
    console.warn('Certificate preview could not be rendered:', source, error);
  }
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    renderCertificate(entry.target);
    obs.unobserve(entry.target);
  });
}, { rootMargin: '400px 0px' });

previews.forEach((preview) => observer.observe(preview));
