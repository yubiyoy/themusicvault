// Follow all external links i a new tab
document.body.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) { return; }
  const external = (link.getAttribute('href') || '').startsWith('http');
  if (external) { link.setAttribute('target', '_blank'); }
});