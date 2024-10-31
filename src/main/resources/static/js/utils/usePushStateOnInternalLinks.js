import addEventListener from "./addEventListener.js";
import navigate from "./navigate.js";

// Do not perform hard page reload on internal links, instead apply popstate
// (except links to pdf - them we open in a new tab)
addEventListener('click', 'a', (link, event) => {
  const href = link.getAttribute('href') || '';
  const internal = !href.startsWith('http');
  const pdfLink = href.includes('.pdf');
  pdfLink && link.setAttribute('target', '_blank');
  if (internal && !pdfLink) {
    event.preventDefault();
    href !== '#' && navigate(href);
  }
});