export default function render404() {

  // Render a 404 page
  return `
    <div class="row">
      <div class="col">
        <a href="/" class="float-end btn btn-secondary">Back to all artists</a>
        <h1>Missing page</h1>
        <p class="mt-3">We are sorry, but we can't find that page for you!</p>
        <a href="#"><img src="/images/404.png" alt="Missing page"></a>
      </div>
    </div>
  `;
}