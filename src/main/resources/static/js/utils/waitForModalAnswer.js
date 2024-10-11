// Show a modal and wait for an answer (call with await)
export default function waitForModalAnswer(title = 'Modal', content = 'A modal', buttons = []) {
  buttons = buttons.map(x => x.split(':')).map(([text, type]) => ({ text, type }));
  document.querySelector('.modal-content').innerHTML = `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      ${content}
    </div>
    <div class="modal-footer">
      ${buttons.map(({ text, type }) => /*html*/`
        <button type="button" class="btn btn-${type}" data-bs-dismiss="modal">${text}</button>
      `)}
    </div>
  `;
  new bootstrap.Modal('#modal').show();
  return new Promise(resolve => document.querySelector('#modal')
    .addEventListener('hide.bs.modal', () => {
      setTimeout(() => { resolve(globalThis.modalChoice) }, 1);
    })
  );
}

// Create the skeleton html for our modal
export function renderModalSkeleton() {
  return `
  <button type="button" class="btn modal-trigger-btn" data-bs-toggle="modal" data-bs-target="#modal">
  </button>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modall" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content"></div>
    </div>
  </div>
`;
}

// Listen to which button the user clicked in the modal
document.body.addEventListener('click', event => {
  const button = event.target.closest('#modal button');
  if (!button) { return; }
  globalThis.modalChoice = button.innerText;
});