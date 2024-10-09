import displayPage from './displayPage.js';
import { remove } from './utils/fetchHelpers.js';

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

export function renderArtist({ id, name, description, base64image }, short) {
  let html = `<div class="card mb-4 artist ${short ? 'short' : ''}" data-id="${id}">
    <a href="${short ? '#artist-info-' + id : '#'}">
      <img src="${base64image}" class="card-img-top" alt="${name}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <div class="description">
        ${description.split('\n\n').map(para => `<p>${para}</p>`).slice(0, short ? 1 : Infinity)}
      </div>
      ${short ? `
          <a href="#artist-info-${id}" class="mt-4 btn btn-secondary float-end">Read more</a>
        ` : `
          <a href="#" class="mt-4 btn btn-secondary float-end">Back to all artists</a>
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

// remove an artist
document.body.addEventListener('click', async event => {
  const removeArtistButton = event.target.closest('button.removeArtist');
  if (!removeArtistButton) { return; }
  // get id of artist to remove
  const id = +removeArtistButton.closest('.artist[data-id]').getAttribute('data-id');
  // remove the artist via the REST-api
  await remove('artists', id);
  // remove from globalThis.artists
  globalThis.artists = globalThis.artists.filter(artist => artist.id !== id);
  // navigate to the artist page
  location.hash = '#';
  displayPage();
});

// edit an artist
document.body.addEventListener('click', async event => {
  const editArtistButton = event.target.closest('button.editArtist');
  if (!editArtistButton) { return; }
  // get id of artist to remove
  const id = +editArtistButton.closest('.artist[data-id]').getAttribute('data-id');
  // navigate to edit form
  location.hash = `#edit-artist-${id}`;
});