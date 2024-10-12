import './eventsForUserForm.js';
import { checkLoggedIn } from './utils/loginAndRegister.js';

// Render a form for registering a user or alter user info
export default function renderUserForm() {
  let { id, firstName, lastName, email } = checkLoggedIn();
  let password = id ? '_PASSWORD_NOT_CHANGED' : '';
  return `
    <form name="user">
      ${id ? `<input type="hidden" name="id" value="${id}">` : ''}
      <div class="row">
        <div class="col">
          <h1>${id ? `Edit: ${firstName} ${lastName}` : 'Register'}</h1>
          <label class="form-label mt-4">
            First name:
            <input name="firstName" class="form-control"
              required minlength="2" placeholder="First name"
              value="${firstName || ''}"
            >
          </label>
          <label class="form-label mt-4">
            Last name:
            <input name="lastName" class="form-control"
              required minlength="2" placeholder="Last name"
              value="${lastName || ''}"
            >
          </label>
          </label>
          <label class="form-label mt-4">
            Email:
            <input name="email" class="form-control"
              required minlength="2" placeholder="Email"
              value="${email || ''}" type="email"
            >
          </label>
          <label class="form-label mt-4">
            Password:
            <input name="password" class="form-control"
              required minlength="8" placeholder="Password"
              value="${password || ''}" type="password"
            >
          </label>
          <label class="form-label mt-4">
            Repeat password:
            <input name="repeatPassword" class="form-control"
              required minlength="8" placeholder="Repeat password"
              value="${password || ''}" type="password"
            >
          </label>
          <button type="submit" class="btn btn-secondary my-3 float-end">
            ${id ? 'Change my info' : 'Register'}
          </button>
        </div>
      </div>
    </form>
  `;
}