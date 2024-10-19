import displayPage from './displayPage.js';
import waitForModalAnswer from './utils/waitForModalAnswer.js';
import addEventListener from './utils/addEventListener.js';
import navigate from './utils/navigate.js';
import { remove } from './utils/fetchHelpers.js';

// Render a list of artists
export function renderArtists(artists) {
  return `
    <div class="row">
      ${artists.map((artist) => `
        <div class="col-md-6">
          ${renderArtist(artist, true)}
        </div>
      `)}
    </div>
  `;
}

// Render one artist
export function renderArtist({ id, name, description, base64image }, short) {
  let html = `<div class="card mb-4 artist ${short ? 'short' : ''}" data-id="${id}">
    <a href="${short ? '/artist-info/' + id : '/'}">
      <img src="${base64image}" class="card-img-top" alt="${name}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <div class="description">
        ${description.split('\n\n').map(para => `<p>${para}</p>`).slice(0, short ? 1 : Infinity)}
      </div>
      ${short ? `
          <a href="/artist-info/${id}" class="mt-4 btn btn-secondary float-end">Read more</a>
        ` : `
          <a href="/" class="mt-4 btn btn-secondary float-end">Back to all artists</a>
      `}
      <button class="removeArtist edit-mode-on mt-4 btn btn-danger float-end me-3">
        Remove
      </button>
      <button class="editArtist edit-mode-on mt-4 btn btn-info float-end me-3">
        Edit
      </button>
    </div>
  </div>`;
  return short ? html : /*html*/`<div class="row"><div class="col">${html}</div></div>`;
}

// Remove an artist
addEventListener('click', 'button.removeArtist', async removeArtistButton => {
  const id = +removeArtistButton.closest('.artist[data-id]').getAttribute('data-id');
  // get the name of the artist
  const { name } = globalThis.artists.find(artist => artist.id === id);
  // confirm removal
  const answer = await waitForModalAnswer(
    `Remove ${name}`,
    /*html*/`<p><i>This will permanently remove ${name}...</i></p><p>Are you sure?</p>`,
    ['Cancel:secondary', 'Remove:danger']
  );
  if (answer !== 'Remove') { return; }
  // remove the artist via the REST-api
  await remove('artists', id);
  // remove from globalThis.artists
  globalThis.artists = globalThis.artists.filter(artist => artist.id !== id);
  // navigate to the artist page
  navigate('/');
});

// Edit an artist
addEventListener('click', 'button.editArtist', async editArtistButton => {
  // get id of artist to remove
  const id = +editArtistButton.closest('.artist[data-id]').getAttribute('data-id');
  // navigate to edit form
  window.history.pushState(null, null, `edit-artist/${id}`);
  displayPage();
});