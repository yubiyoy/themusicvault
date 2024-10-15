import formDataCollector from "./utils/formDataCollector.js";
import displayPage from "./displayPage.js";
import renderNavBar from "./renderNavbar.js";
import { post, get, put } from './utils/fetchHelpers.js';
import waitForModalAnswer from "./utils/waitForModalAnswer.js";

// require that the repeatPasswordField equals the password field
document.body.addEventListener('keyup', event => {
  const repeatPasswordField = event.target
    .closest('form[name="user"] input[name="repeatPassword"]');
  if (!repeatPasswordField) { return; }
  const passwordField = document
    .querySelector('form[name="user"] input[name="password"]');
  repeatPasswordField.setCustomValidity(
    passwordField.value === repeatPasswordField.value ?
      '' : 'Password doesn\'t match!'
  );
});

// on submit - post the new user via our REST-api
// or put the changes to the REST-api if we are editing a user
document.body.addEventListener('submit', async event => {
  const userForm = event.target.closest('form[name="user"]');
  if (!userForm) { return; }
  // do not make hard page reload
  event.preventDefault();
  // collect the data form the form and post/put it via the REST-api
  const data = formDataCollector(userForm);
  const { id } = data;
  // post or put the user
  const result = globalThis.user ?
    await put('register', '', data) :
    await post('register', data);
  // check for errors
  if (result.error) {
    await waitForModalAnswer(
      'Something went wrong...',
      '<p>Most likely you have used a email already in use.</p><p>Have you registered before?</p>',
      ["OK, I'll try again:secondary"]
    );
    return;
  }
  // update logged in user and rerender the nav bar
  globalThis.user = await get('login');
  renderNavBar();
  // navigate to the artist page
  window.history.pushState(null, null, '/');
  displayPage();
});