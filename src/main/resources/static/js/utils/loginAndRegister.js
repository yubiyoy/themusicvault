import { get, post } from './fetchHelpers.js';

const salt = "hardToGuess@fsl3183wausoidjdaeaawdan";
let users = await get('users');

export async function register(email, password) {
  const encryptedPassword = window.btoa(password + salt);
  const newUser = await post('users', { email, encryptedPassword });
  users = await get('users');
  return newUser;
}

export function login(email, password) {
  console.log(users);
  const encryptedPassword = window.btoa(password + salt);
  const user = users.find(
    user => user.email = email && user.encryptedPassword === encryptedPassword
  );
  globalThis.sessionStorage.user = JSON.stringify({ user });
}

export function checkLoggedIn() {
  return JSON.parse(globalThis.sessionStorage.user);
}

export function logout() {
  delete globalThis.sessionStorage.user;
}

globalThis.register = register;
globalThis.login = login;
globalThis.checkLoggedIn = checkLoggedIn;
globalThis.logout = logout;