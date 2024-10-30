import renderUserMenu from './renderUserMenu.js';
import closeHamburgerBar from './utils/closeHamburgerBar.js';
import addEventListener from './utils/addEventListener.js';

// Render the navbar with menu choices + toggle for edit mode
export default function renderNavBar() {

  let choices = {
    'Artists': { route: '/', userRoles: ['visitor', 'user'] },
    'Albums': { route: '/albums', userRoles: ['visitor', 'user'] },
    'Add an artist': { route: '/add-artist', userRoles: ['user'] },
    'Add an album': { route: '/add-album', userRoles: ['user'] },
    'About': { route: '/about', userRoles: ['visitor', 'user'] }
  };

  // check user role and remove choices not matching the user role
  const userRole = (globalThis.user || {}).role || 'visitor';
  for (let key in choices) {
    if (!choices[key].userRoles.includes(userRole)) {
      delete choices[key];
    }
  }

  document.querySelector('header').innerHTML = `
    ${renderUserMenu()}
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand px-2 px-md-4" href="/">The Music Vault</a>
        <button
            class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            ${Object.entries(choices).map(([label, { route, userRoles }]) => /*html*/`
              <li class="nav-item">
                <a class="nav-link px-5 px-lg-2" href="${route}">${label}</a>
              </li>
            `)}
            ${userRole === 'visitor' ? '' : /*html*/`
              <li class="nav-item toggle-edit-mode">
                <a class="edit-mode-on nav-link px-5 px-lg-2">Hide edit buttons</a>
                <a class="edit-mode-off nav-link px-5 px-lg-2">Show edit buttons</a>
              </li>
            `}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Toggle edit mode
addEventListener('click', 'li.toggle-edit-mode', toggleEditMode => {
  // toggle edit mode
  document.body.classList.toggle('edit-mode');
  closeHamburgerBar();
});