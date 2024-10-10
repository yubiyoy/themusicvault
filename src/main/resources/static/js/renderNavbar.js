import closeHamburgerBar from './utils/closeHamburgerBar.js';

// Render the navbar with menu choices + toggle for edit mode
export default function renderNavBar() {

  const choices = {
    'Artists': '/',
    'Albums': '/albums',
    'Add an artist': '/add-artist',
    'Add an album': '/add-album',
    'About': '/about'
  };

  document.querySelector('header').innerHTML = `
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand px-2 px-md-4" href="#">Classic Artists</a>
        <button
            class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            ${Object.entries(choices).map(([label, path]) => /*html*/`
              <li class="nav-item">
                <a class="nav-link px-5 px-lg-2" href="${path}">${label}</a>
              </li>
            `)}
            <li class="nav-item toggle-edit-mode">
              <a class="edit-mode-on nav-link px-5 px-lg-2">Hide edit buttons</a>
              <a class="edit-mode-off nav-link px-5 px-lg-2">Show edit buttons</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Toggle edit mode
document.body.addEventListener('click', event => {
  const toggleEditMode = event.target.closest('li.toggle-edit-mode');
  if (!toggleEditMode) { return; }
  // toggle edit mode
  document.body.classList.toggle('edit-mode');
  closeHamburgerBar();
});