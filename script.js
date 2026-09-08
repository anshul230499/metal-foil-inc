const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

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
    `Steel Origin Preference: ${get('origin') || 'No preference'}`
  ];

  if (get('finish')) materialLines.push(`Surface Finish: ${get('finish')}`);
  if (get('edge')) materialLines.push(`Edge Condition: ${get('edge')}`);

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
