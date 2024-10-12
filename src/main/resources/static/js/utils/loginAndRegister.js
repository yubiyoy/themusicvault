import { get, post, put } from './fetchHelpers.js';
import renderNavBar from '../renderNavbar.js';
import displayPage from '../displayPage.js';

// Functions for registering and updating a user, 
// checking that a email is available (not used by anaother user),
// logging in,  logging out and checking who is logged in

// TODO IN FUTURE VERSION: 
// We should move some of this logic to the backend
// since it is not safe to have it on the frontend
// (but this requires a improved knowledge of sessions in Spring)

const salt = "hardToGuess@fsl3183wausoidjdaeaawdan";
let users = await get('users');

export async function registerOrUpdate(userData, passwordChanged = true) {
  const password = userData.password;
  const encryptedPassword = window.btoa(password + salt);
  let foundUser = users.find(user => user.id === +userData.id);
  userData.encryptedPassword = passwordChanged ?
    encryptedPassword : foundUser.encryptedPassword;
  const user = userData.id ?
    await put('users', userData.id, userData) :
    await post('users', userData);
  users = await get('users');
  if (!userData.id) {
    login(userData.email, password);
  }
  else {
    foundUser = users.find(user => user.id === +userData.id);
    globalThis.sessionStorage.user = JSON.stringify(foundUser);
    renderNavBar();
  }
}

export function emailAvailable(email) {
  return !users.find(user => user.email === email);
}

export function login(email, password) {
  const encryptedPassword = window.btoa(password + salt);
  const user = users.find(
    user => user.email === email && user.encryptedPassword === encryptedPassword
  );
  if (user) { globalThis.sessionStorage.user = JSON.stringify(user) };
  renderNavBar();
  return user;
}

export function logout() {
  delete globalThis.sessionStorage.user;
  renderNavBar();
  // turn off edit mode
  document.body.classList.remove('edit-mode');
  // navigate to the artist page
  window.history.pushState(null, null, '/');
  displayPage();
  return true;
}

export function checkLoggedIn() {
  return JSON.parse(globalThis.sessionStorage.user || '""')
    || { error: 'Not logged in' };
}