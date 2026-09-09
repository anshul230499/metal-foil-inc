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

// Download the original JMA certificate file while keeping the on-page image preview unchanged.
// The content type returned by the source decides the saved extension, so PDFs stay PDFs
// and image-based originals (such as the ISSDA source) keep their native image format.
const downloadButtons = document.querySelectorAll('.cert-button[data-download-source]');

function extensionFor(contentType = '') {
  const type = contentType.toLowerCase();
  if (type.includes('pdf')) return '.pdf';
  if (type.includes('png')) return '.png';
  if (type.includes('jpeg') || type.includes('jpg')) return '.jpg';
  if (type.includes('webp')) return '.webp';
  if (type.includes('gif')) return '.gif';
  return '';
}

downloadButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const source = button.dataset.downloadSource;
    const baseName = button.dataset.downloadFilename || 'JMA-certificate';
    const label = button.querySelector('span');
    const originalLabel = label?.textContent || 'Download';

    try {
      if (label) label.textContent = 'Downloading…';
      button.setAttribute('aria-busy', 'true');

      const response = await fetch(source, { mode: 'cors', credentials: 'omit' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob = await response.blob();
      const ext = extensionFor(blob.type);
      const objectUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = objectUrl;
      tempLink.download = baseName + ext;
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    } catch (error) {
      // If a browser or CDN blocks programmatic cross-origin downloading,
      // fall back to opening the original JMA-hosted source document.
      console.warn('Direct certificate download failed; opening source instead:', error);
      window.open(source, '_blank', 'noopener,noreferrer');
    } finally {
      if (label) label.textContent = originalLabel;
      button.removeAttribute('aria-busy');
    }
  });
});
