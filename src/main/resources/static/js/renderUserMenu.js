import { remove } from './utils/fetchHelpers.js';
import displayPage from './displayPage.js';
import renderLoginForm from './renderLoginForm.js';
import renderNavBar from './renderNavbar.js';
import displayToast from './utils/displayToast.js';

// Render the user menu part of the navbar
export default function renderUserMenu() {

  const user = globalThis.user;
  const loggedIn = !!globalThis.user;

  return `
    <div class="dropdown user-profile">
      <a class="dropdown-toggle btn" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="/images/person-circle.svg">
      </a>
      <ul class="dropdown-menu">
        ${loggedIn ? `
          <li><a class="dropdown-item" href="/register">${user.firstName} ${user.lastName}</a></li>
          <li><a class="dropdown-item" >Logout</a></li>
        ` : `
          <li><a class="dropdown-item">Login</a></li>
          <li><a class="dropdown-item" href="/register">Register</a></li>
        `}
      </ul>
    </div>
  `;
}

// events for login and logout choices
document.body.addEventListener('click', async event => {
  const choiceEl = event.target.closest('.user-profile .dropdown-item');
  if (!choiceEl || choiceEl.getAttribute('href')) { return; }
  const choice = choiceEl.innerText;
  // react on choice
  if (choice === 'Login') {
    renderLoginForm();
  }
  else if (choice === 'Logout') {
    await remove('login');
    globalThis.user = null;
    renderNavBar();
    displayToast('Logged out', 'You successfully logged out!!');
    // navigate to the artist page
    window.history.pushState(null, null, '/');
    displayPage();
  }
});