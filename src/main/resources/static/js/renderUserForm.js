import './eventsForUserForm.js';

// Render a form for registering a user or alter user info
export default function renderUserForm() {
  let { firstName, lastName, email } = globalThis.user || {};
  let password = globalThis.user ? '_DO_NOT_CHANGE' : '';
  return `
    <form name="user">
      <div class="row">
        <div class="col">
          <h1>${globalThis.user ? `Edit: ${firstName} ${lastName}` : 'Register'}</h1>
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
            ${globalThis.user ? 'Change my info' : 'Register'}
          </button>
        </div>
      </div>
    </form>
  `;
}