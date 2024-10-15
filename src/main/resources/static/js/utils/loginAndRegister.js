/*import { get, post, put } from './fetchHelpers.js';
import renderNavBar from '../renderNavbar.js';
import displayPage from '../displayPage.js';
import displayToast from './displayToast.js';

// Functions for registering and updating a user, 

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

export function login(email, password) {
  const encryptedPassword = window.btoa(password + salt);
  const user = users.find(
    user => user.email === email && user.encryptedPassword === encryptedPassword
  );
  if (user) {
    globalThis.sessionStorage.user = JSON.stringify(user);
    displayToast('Logged in', `Welcome <b>${user.firstName} ${user.lastName}</b>!`)
  };
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
  displayToast('Logged out', `You successfully logged out!!`)
  return true;
}

export function checkLoggedIn() {
  return JSON.parse(globalThis.sessionStorage.user || '""')
    || { error: 'Not logged in' };
}*/