import displayPage from "../displayPage.js";

// Do not perform hard page reload on internal links, instead apply popstate
document.body.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) { return; }
  const href = link.getAttribute('href') || '';
  const internal = !href.startsWith('http');
  if (internal) {
    event.preventDefault();
    window.history.pushState(null, null, href);
    displayPage();
  }
});