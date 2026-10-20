const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');
const header = document.querySelector('.site-header');
const scrollProgress = document.querySelector('#scrollProgress');
const ambientGlow = document.querySelector('#ambientGlow');

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

// Scroll progress + subtle sticky-header state.
const updateScrollUI = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  header?.classList.toggle('scrolled', window.scrollY > 18);
};
updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });

// Cursor-following ambient highlight on pointer devices.
if (ambientGlow && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });
}

// Hero motion is CSS-only for a stable, crisp first impression.

const rfqForm = document.querySelector('#rfqForm');
rfqForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!rfqForm.reportValidity()) return;

  const form = new FormData(rfqForm);
  const get = (key) => String(form.get(key) || '').trim();

  const subject = `RFQ - ASTM ${get('grade')} - ${get('thickness')} x ${get('width')} - ${get('company')}`;
  const materialLines = [
    `ASTM Grade: ${get('grade')}`,
    `Thickness: ${get('thickness')}`,
    `Width: ${get('width')}`,
    `Length: ${get('length')}`,
    `Quantity: ${get('quantity')}`,
    `Origin / Compliance Preference: ${get('origin') || 'No Preference'}`
  ];


  const body = [
    'Metal Foil Inc. - Request for Quotation',
    '',
    `Company: ${get('company')}`,
    `Contact: ${get('name')}`,
    `Email: ${get('email')}`,
    `Phone: ${get('phone') || 'Not provided'}`,
    '',
    'Material Requirements',
    ...materialLines,
    '',
    'End Use / Special Requirements:',
    get('requirements') || 'Not specified',
    '',
    'Please provide pricing, availability and estimated lead time.'
  ].join('\n');

  const mailto = `mailto:sales@metalfoil.us?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

// Reveal choreography across the page. Elements are selected automatically so new sections inherit motion.
const motionSelectors = [
  '.split-intro > *', '.inventory-copy', '.inventory-table-wrap', '.photo-large', '.photo-copy',
  '.mini-cards > div', '.process-grid', '.process-grid article', '.cert-card', '.about-grid > *',
  '.contact-tiles > div', '.rfq-copy', '.rfq-form', '.sources-compact', '.spec-grid article'
];
const motionTargets = [...new Set(motionSelectors.flatMap(selector => [...document.querySelectorAll(selector)]))];
motionTargets.forEach((el, index) => {
  el.classList.add(el.matches('.photo-large,.inventory-table-wrap,.rfq-form') ? 'motion-scale' : 'motion-item');
  el.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 65}ms`);
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  motionTargets.forEach(el => observer.observe(el));
} else {
  motionTargets.forEach(el => el.classList.add('is-visible'));
}

// Number counters animate once when the inventory table becomes visible.
const countEls = document.querySelectorAll('.count');
if (countEls.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countEls.forEach((el) => {
        const target = Number(el.textContent.trim());
        if (!Number.isFinite(target)) return;
        const start = performance.now();
        const duration = 800;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.max(1, Math.round(target * eased)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      countObserver.disconnect();
    });
  }, { threshold: .3 });
  const table = document.querySelector('.inventory-table-wrap');
  if (table) countObserver.observe(table);
}


// v29: a single, low-key map reveal; never hide the map if JS is unavailable.
const geographicStory = document.querySelector('.v29-global-story');
if (geographicStory) {
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const mapObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('map-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    mapObserver.observe(geographicStory);
  } else geographicStory.classList.add('map-revealed');
}

// RFQ alternative: preserve the original mailto workflow, but let buyers copy
// the full structured inquiry when their browser has no configured mail client.
const copyRfq = document.querySelector('#copyRfq');
const rfqFeedback = document.querySelector('#rfqFeedback');
copyRfq?.addEventListener('click', async () => {
  if (!rfqForm || !rfqForm.reportValidity()) return;
  const form = new FormData(rfqForm);
  const value = key => String(form.get(key) || '').trim();
  const details = [
    'Metal Foil Inc. - Request for Quotation',
    `Company: ${value('company')}`, `Contact: ${value('name')}`,
    `Email: ${value('email')}`, `Phone: ${value('phone') || 'Not provided'}`,
    '', 'Material Requirements', `ASTM Grade: ${value('grade')}`,
    `Thickness: ${value('thickness')}`, `Width: ${value('width')}`,
    `Length: ${value('length')}`, `Quantity: ${value('quantity')}`,
    `Origin / Compliance Preference: ${value('origin') || 'No Preference'}`,
    '', 'End Use / Special Requirements:',value('requirements') || 'Not specified',
    '', 'Please provide pricing, availability and estimated lead time.'
  ].join('\n');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(details);
    if (rfqFeedback) rfqFeedback.textContent = 'RFQ details copied. Paste them into an email to sales@metalfoil.us.';
  } catch (_) {
    if (rfqFeedback) rfqFeedback.textContent = 'Clipboard permission is unavailable. Use Prepare an RFQ to open your email draft.';
  }
});


// V33: External manufacturer imagery retains a branded metal-surface fallback
// if an image is blocked or unavailable in the visitor's browser.
document.querySelectorAll('.hero-frame img').forEach(img => {
  const markUnavailable = () => {
    img.hidden = true;
    img.closest('.hero-frame')?.classList.add('image-unavailable');
  };
  img.addEventListener('error', markUnavailable);
  if (img.complete && img.naturalWidth === 0) markUnavailable();
});
// v33 visual fallbacks for externally hosted source photographs and emblem.
document.querySelectorAll('.v33-original-refined .who-v22-image img, .jindal-floating-mark img').forEach(img => {
  const onMissing = () => {
    img.hidden = true;
    img.parentElement?.classList.add('image-unavailable');
    img.closest('.who-v22-image, .jindal-floating-mark')?.classList.add('image-unavailable');
  };
  img.addEventListener('error',onMissing);
  if (img.complete && img.naturalWidth === 0) onMissing();
});

// v34: reveal the geographical manufacturing connection only when visible.
const mapStage = document.querySelector('.v34-map-stage');
if(mapStage){
 if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const o = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('is-visible');o.unobserve(e.target)}}) }, {threshold:.15});
  o.observe(mapStage);
 } else mapStage.classList.add('is-visible');
}
