import { remove } from './utils/fetchHelpers.js';
import renderLoginForm from './renderLoginForm.js';
import renderNavBar from './renderNavbar.js';
import displayToast from './utils/displayToast.js';
import addEventListener from './utils/addEventListener.js';
import navigate from './utils/navigate.js';
import { hideToast } from './utils/displayToast.js';

// Render the user menu part of the navbar
export default function renderUserMenu() {

  const user = globalThis.user;
  const loggedIn = !!globalThis.user;

  return `
    <div class="dropdown user-profile">
      <a class="dropdown-toggle btn" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="/images/person-circle.svg" alt="user-menu">
      </a>
      <ul class="dropdown-menu">
        ${loggedIn ? `
          <li><a class="dropdown-item" href="/register">${user.firstName} ${user.lastName}</a></li>
          <li><a class="dropdown-item" href="#">Logout</a></li>
        ` : `
          <li><a class="dropdown-item" href="#">Login</a></li>
          <li><a class="dropdown-item" href="/register">Register</a></li>
        `}
      </ul>
    </div>
  `;
}

// events for login and logout choices
addEventListener('click', '.user-profile .dropdown-item', async choiceEl => {
  const choice = choiceEl.innerText;

  // react on choice
  if (choice === 'Login') {
    renderLoginForm();
  }
  else if (choice === 'Logout') {
    await remove('login');
    globalThis.user = null;
    renderNavBar();
    displayToast('Logged out', 'You successfully logged out!');
    // navigate to the artist page
    navigate('/');
  }
});

// if the user menu is opened - hide toast if visible
addEventListener('click', '.user-profile .btn.show', () => hideToast());