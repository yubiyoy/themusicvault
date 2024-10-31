import addEventListener from "./utils/addEventListener.js";

// Convert README.md to html + add image for big viewports
const readMeAsHtml = globalThis.marked.parse(
  await (await fetch('/README.md')).text()
).replace(/<p>/, `
  <img class="float-end d-none d-lg-block ms-5 mb-4" src="/images/pdf-preview.jpg" alt="Documentation"><p>
`);

// About page
export default function renderAboutFromReadMe() {
  return `
    <div class="row mb-4">
      <div class="col px-2 px-sm-4 px-md-5 about-page">
        <img class="d-block d-lg-none mt-5 mb-4" src="/images/pdf-preview.jpg">
        ${readMeAsHtml}
      </div>
    </div>
  `;
}

// Click on image opens the pdf
addEventListener('click', 'img[src="/images/pdf-preview.jpg"]', () =>
  document.querySelector('.about-page a').click());