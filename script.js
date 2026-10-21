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

// A compact menu never lingers after resizing back to full navigation.
const closeHeaderMenu = () => {
  siteNav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
};
window.addEventListener('resize', () => {
  if (window.innerWidth > 1390) closeHeaderMenu();
}, { passive: true });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav?.classList.contains('open')) {
    closeHeaderMenu();
    menuButton?.focus();
  }
});
document.addEventListener('pointerdown', (event) => {
  if (siteNav?.classList.contains('open') && !header?.contains(event.target)) closeHeaderMenu();
});

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


// v36: editorial scroll choreography. Reveal once on entry whether scrolling
// down or up; no scroll hijacking and no re-hiding of previously read content.
(() => {
 const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(prefersLessMotion || !('IntersectionObserver' in window)) return;
 const groups=[
   '.v34-map-heading', '.v34-map-stage', '.technical-range-heading',
   '.technical-range-row', '.spec-strip .section-intro',
   '.inventory-copy', '.photo-copy h2', '.photo-copy > p:not(.kicker)',
   '.factory-gallery .factory-card', '.manufacturing .section-intro',
   '.v35-mill-header', '.v35-mill-media figure',
   '.cert-section .section-intro', '.about-section .about-copy',
   '.about-section .contact-tiles', '.rfq-copy', '.rfq-form',
   '.sources-compact', '.office-figure'
 ];
 const nodes = [...new Set(groups.flatMap(sel=>[...document.querySelectorAll(sel)]))];
 if(!nodes.length) return;
 nodes.forEach((node,index) => {
  node.classList.add('v36-reveal');
  if(node.matches('.factory-gallery .factory-card,.v35-mill-media figure,.office-figure'))node.classList.add('v36-photo-enter');
  const siblings = node.parentElement ? [...node.parentElement.children].filter(el=>nodes.includes(el)) : [];
  const order=siblings.indexOf(node);
  node.style.setProperty('--v36-delay', `${Math.min(Math.max(order,0),3)*85}ms`);
 });
 document.body.classList.add('v36-motion-ready');
 const watcher=new IntersectionObserver((entries,observer)=>{
   entries.forEach(entry=>{
     if(!entry.isIntersecting) return;
     entry.target.classList.add('v36-revealed','is-visible');
     observer.unobserve(entry.target);
   });
 },{threshold:0.07,rootMargin:'0px 0px -5% 0px'});
 nodes.forEach(el=>watcher.observe(el));
})();


// Show a restrained text fallback only if the official remote emblem is unavailable.
const officialJ = document.querySelector('.jindal-header-symbol img');
if (officialJ) {
  const showJFallback = () => officialJ.closest('.jindal-header-symbol')?.classList.add('image-unavailable');
  officialJ.addEventListener('error', showJFallback, { once: true });
  if (officialJ.complete && officialJ.naturalWidth === 0) showJFallback();
}



// v48: a real cyclic showcase, not an auto-scrolling strip. Cards move from left to center.
// Animation only runs while this section is onscreen and motion is permitted.
(() => {
  const section = document.getElementById('industries');
  const track = document.getElementById('industryTrack');
  if (!section || !track) return;
  const cards = Array.from(track.querySelectorAll('.industry-card'));
  if (!cards.length) return;
  const count = document.getElementById('industryCount');
  const arrows = Array.from(section.querySelectorAll('.industry-scroll'));
  const pauseButton = document.getElementById('industryAutoplay');
  const pauseIcon = pauseButton?.querySelector('.industry-autoplay-icon');
  const pauseLabel = pauseButton?.querySelector('.industry-autoplay-label');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let intervalId = null;
  let flipTimeout = null;
  let resumeTimeout = null;
  let inView = false;
  let userPaused = false;
  let interactionPaused = false;
  const intervalMs = 3600;

  function stopRotation() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }
  function beginRotation() {
    stopRotation();
    if (!inView || document.hidden || userPaused || interactionPaused || motionQuery.matches) return;
    intervalId = window.setInterval(() => setActive(activeIndex - 1), intervalMs);
  }
  function clearFlip() {
    if (flipTimeout !== null) window.clearTimeout(flipTimeout);
    flipTimeout = null;
    cards.forEach(card => {
      card.classList.remove('is-flipped');
      card.setAttribute('aria-pressed', 'false');
    });
  }
  function positionCards() {
    cards.forEach((card, index) => {
      const raw = (index - activeIndex + cards.length) % cards.length;
      const offset = raw > cards.length / 2 ? raw - cards.length : raw;
      const distance = Math.abs(offset);
      const clamped = Math.max(-3, Math.min(3, offset));
      card.style.setProperty('--deck-offset', String(clamped));
      card.style.setProperty('--deck-scale', distance === 0 ? '1' : distance === 1 ? '.86' : '.70');
      card.style.setProperty('--deck-yaw', `${offset === 0 ? 0 : offset < 0 ? 12 : -12}deg`);
      card.style.setProperty('--deck-opacity', distance <= 1 ? '1' : distance === 2 ? '.25' : '0');
      card.style.setProperty('--deck-z', String(Math.max(1, 10 - distance)));
      card.classList.toggle('is-active', distance === 0);
      card.classList.toggle('is-prev', offset === -1);
      card.classList.toggle('is-next', offset === 1);
      // Keep only the featured card in keyboard tab order; arrows provide full deck access.
      card.tabIndex = distance === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', distance <= 1 ? 'false' : 'true');
      card.setAttribute('aria-current', distance === 0 ? 'true' : 'false');
    });
    if (count) count.textContent = `${cards[activeIndex].querySelector('.industry-title')?.textContent || 'INDUSTRY'}  /  APPLICATIONS`;
  }
  function setActive(index) {
    clearFlip();
    activeIndex = (index + cards.length) % cards.length;
    positionCards();
  }
  function pauseBriefly(milliseconds = 5500) {
    interactionPaused = true;
    stopRotation();
    if (resumeTimeout !== null) window.clearTimeout(resumeTimeout);
    resumeTimeout = window.setTimeout(() => {
      interactionPaused = false;
      clearFlip();
      beginRotation();
      resumeTimeout = null;
    }, milliseconds);
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== activeIndex) {
        setActive(index);
        pauseBriefly(3600);
        return;
      }
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
      pauseBriefly(flipped ? 7200 : 2700);
    });
  });
  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      setActive(activeIndex + (arrow.dataset.direction === 'prev' ? -1 : 1));
      pauseBriefly(4300);
    });
  });
  function updatePauseButton() {
    if (!pauseButton) return;
    pauseButton.setAttribute('aria-pressed', String(userPaused));
    pauseButton.setAttribute('aria-label', userPaused ? 'Resume automatic carousel' : 'Pause automatic carousel');
    if (pauseLabel) pauseLabel.textContent = userPaused ? 'Play' : 'Pause';
    if (pauseButton) pauseButton.title = userPaused ? 'Resume automatic carousel' : 'Pause automatic carousel';
  }
  pauseButton?.addEventListener('click', () => {
    userPaused = !userPaused;
    interactionPaused = false;
    if (resumeTimeout !== null) window.clearTimeout(resumeTimeout);
    resumeTimeout = null;
    clearFlip();
    updatePauseButton();
    beginRotation();
  });
  // Respect both OS motion preferences and page visibility.
  motionQuery.addEventListener?.('change', () => {
    const reduce = motionQuery.matches;
    section.classList.toggle('industry-deck-ready', !reduce);
    if (pauseButton) pauseButton.hidden = reduce;
    cards.forEach(card => { card.tabIndex = 0; card.removeAttribute('aria-hidden'); });
    if (!reduce) positionCards();
    beginRotation();
  });
  document.addEventListener('visibilitychange', beginRotation);

  // If animations are disabled, retain the original horizontally scrolling, fully readable cards.
  if (motionQuery.matches) {
    if (pauseButton) pauseButton.hidden = true;
    return;
  }
  // Set positions while cards are still in the offscreen setup state, avoiding layout jumps.
  positionCards();
  section.classList.add('industry-deck-ready');
  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      beginRotation();
    }, { threshold: 0.15 });
    visibilityObserver.observe(section);
  } else {
    inView = true;
    beginRotation();
  }
})();


// v50: Replace an unavailable Electronics photo with a second licensed image, then the bundled SVG.
(() => {
  const img = document.querySelector('.industry-card[data-application="electronics"] .industry-photo img');
  if (!img) return;
  const swap = () => {
    if (img.dataset.fallbackStage === 'local') return;
    if (img.dataset.fallbackStage !== 'alternate' && img.dataset.alternateSrc) {
      img.dataset.fallbackStage = 'alternate';
      img.src = img.dataset.alternateSrc;
    } else {
      img.dataset.fallbackStage = 'local';
      img.src = img.dataset.fallbackSrc || 'assets/electronics-fallback.svg';
    }
  };
  img.addEventListener('error', swap);
  if (img.complete && img.naturalWidth === 0) swap();
})();


// v52: introduce the three product fact tiles gently once they enter view.
// Content stays visible even if IntersectionObserver or JavaScript is unavailable.
(() => {
  const facts = document.querySelector('.hero-facts');
  if (!facts || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries, currentObserver) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('mfi-facts-visible');
      currentObserver.unobserve(entry.target);
    }
  }, { threshold: 0.18 });
  observer.observe(facts);
})();
