import renderNavBar from './renderNavbar.js';
import formDataCollector from './utils/formDataCollector.js';
import waitForModalAnswer from './utils/waitForModalAnswer.js';
import displayToast from './utils/displayToast.js';
import addEventListener from './utils/addEventListener.js';
import { post } from './utils/fetchHelpers.js';

// Render the login form in a modal and try to login
export default async function renderLoginForm() {
  let email = '';
  while (!globalThis.user) {
    const choice = await waitForModalAnswer(
      'Login',
      /*html*/`
       <form name="login" class="my-3">
         ${email ? `<p>Wrong credentials, please try again...</p>` : ''}
         <label class="form-label">
            Email:
            <input name="email" class="form-control"
              required minlength="2" placeholder="Email"
              type="email" value="${email}"
            >
          </label>
          <label class="form-label mt-4">
            Password:
            <input name="password" class="form-control"
              required minlength="8" placeholder="Password"
              type="password"
            >
          </label>
        </form>
      `,
      ['Cancel:secondary', 'Login:primary']
    );
    if (choice !== 'Login') { return; }
    const reqBody = formDataCollector(
      document.querySelector('form[name="login"]')
    );
    email = reqBody.email;
    globalThis.user = await post('login', reqBody);
  }
  document.querySelector('.modal-content').innerHTML = '';
  renderNavBar();
  let { firstName, lastName } = globalThis.user;
  displayToast('Logged in', `Welcome <b>${firstName} ${lastName}</b>!`)
}

// Perform the log in if the user presses enter in the password field
addEventListener('keyup', 'form[name="login"] input[name="password"]', (_field, event) => {
  if (event.key === 'Enter') {
    document.querySelector('.modal-footer .btn-primary').click();
  }
});