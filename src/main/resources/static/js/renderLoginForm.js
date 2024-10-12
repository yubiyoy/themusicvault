import { login } from './utils/loginAndRegister.js';
import formDataCollector from './utils/formDataCollector.js';
import waitForModalAnswer from './utils/waitForModalAnswer.js';

// Render the login form in a modal and try to login
export default async function renderLoginForm() {
  let loggedIn = false;
  let email = '';
  while (!loggedIn) {
    const choice = await waitForModalAnswer(
      'Login',
      /*html*/`
       <form name="login" class="my-3">
         ${!email ? '' : /*html*/`<p>Wrong credentials, please try again...</p>`}
         <label class="form-label">
            Email:
            <input name="email" class="form-control"
              required minlength="2" placeholder="Email"
              type="email" value=${email}
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
    const { email: _email, password } = formDataCollector(
      document.querySelector('form[name="login"]')
    );
    document.querySelector('.modal-content').innerHTML = '';
    email = _email;
    loggedIn = login(email, password);
  }
}

// Perform the log in if the user presses enter in the password field
document.body.addEventListener('keyup', event => {
  let passwordField = event.target.closest('form[name="login"] input[name="password"]');
  if (!passwordField) { return; }
  if (event.key === 'Enter') {
    document.querySelector('.modal-footer .btn-primary').click();
  }
});