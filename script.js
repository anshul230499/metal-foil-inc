const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');
const header = document.querySelector('.site-header');
const scrollProgress = document.querySelector('#scrollProgress');
const ambientGlow = document.querySelector('#ambientGlow');
const heroVisual = document.querySelector('.hero-visual');

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

// Layered hero depth: the two existing images move at different, restrained rates.
if (heroVisual && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let frameId = 0;
  const setHeroDepth = (mainX, mainY, floatX, floatY) => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      heroVisual.style.setProperty('--hero-main-x', `${mainX}px`);
      heroVisual.style.setProperty('--hero-main-y', `${mainY}px`);
      heroVisual.style.setProperty('--hero-float-x', `${floatX}px`);
      heroVisual.style.setProperty('--hero-float-y', `${floatY}px`);
    });
  };

  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - .5;
    const ny = (event.clientY - rect.top) / rect.height - .5;
    setHeroDepth(nx * 5, ny * 4, nx * -9, ny * -7);
  }, { passive: true });

  heroVisual.addEventListener('pointerleave', () => setHeroDepth(0, 0, 0, 0));
}

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

  const mailto = `mailto:sales@metalfoilinc.us?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
