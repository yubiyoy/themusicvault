export default function displayToast(title, message) {
  document.querySelector('.toast-container').innerHTML = `
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  const toast = bootstrap.Toast.getOrCreateInstance(document.querySelector('#liveToast'));
  toast.show();
}

window.displayToast = displayToast;