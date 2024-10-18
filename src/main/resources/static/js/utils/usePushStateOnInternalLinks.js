import displayPage from "../displayPage.js";

// Do not perform hard page reload on internal links, instead apply popstate
// (except links to pdf - them we open in a new tab)
document.body.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) { return; }
  const href = link.getAttribute('href') || '';
  const internal = !href.startsWith('http');
  const pdfLink = href.endsWith('.pdf');
  pdfLink && link.setAttribute('target', '_blank');
  if (internal && !pdfLink) {
    event.preventDefault();
    window.history.pushState(null, null, href);
    displayPage();
  }
});