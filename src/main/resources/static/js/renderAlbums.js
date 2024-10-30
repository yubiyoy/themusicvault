import displayPage from './displayPage.js';
import renderSpotifyPlaylist from './renderSpotifyPlaylist.js';
import waitForModalAnswer from './utils/waitForModalAnswer.js';
import addEventListener from './utils/addEventListener.js';
import navigate from './utils/navigate.js';
import { remove } from './utils/fetchHelpers.js';

// Render a list of albums
export function renderAlbums(albums) {
  return `
    <div class="row">
      ${albums.map((album) => `
        <div class="col-md-6">
          ${renderAlbum(album, true)}
        </div>
      `)}
    </div>
  `;
}

// Render one album
export function renderAlbum({ id, name, description, base64image, spotifyLink, artists }, short) {
  let html = `<div class="card mb-4 album ${short ? 'short' : ''}" data-id="${id}">
    <a href="${short ? '/album-info/' + id : '/albums'}">
      <div class="img-holder">
        <img src="${base64image}" class="card-img-top" alt="${name}">
        ${renderSpotifyPlaylist(spotifyLink)}
      </div>
    </a>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <div class="description">
        ${description.split('\n\n').map(para => `<p>${para}</p>`).slice(0, short ? 1 : Infinity)}
      </div>
      ${!short && artists ? `
        <div class="album-artists">
          <h3>Read more about the artist${artists.length < 2 ? '' : 's'}</h3>
          ${artists.map(({ id, name, base64image }) => /*html*/`
            <div class="album-artist">
              <a href="/artist-info/${id}"><img src="${base64image}"></a>
              <p>${name}</p>
            </div>
          `)}
        </div>
      ` : ''}
      ${short ? `
          <a href="/album-info/${id}" class="mt-4 btn btn-secondary float-end">Read more</a>
        ` : `
          <a href="/albums" class="mt-4 btn btn-secondary float-end">Back to all albums</a>
      `}
      <button class="removeAlbum edit-mode-on mt-4 btn btn-danger float-end me-3">
        Remove
      </button>
      <button class="editAlbum edit-mode-on mt-4 btn btn-info float-end me-3">
        Edit
      </button>
    </div>
  </div>`;
  return short ? html : /*html*/`<div class="row"><div class="col">${html}</div></div>`;
}

// Remove an album
addEventListener('click', 'button.removeAlbum', async removealbumButton => {
  const id = +removealbumButton.closest('.album[data-id]').getAttribute('data-id');
  // get the name of the album
  const { name } = globalThis.albums.find(album => album.id === id);
  // confirm removal
  const answer = await waitForModalAnswer(
    `Remove ${name}`,
    /*html*/`<p><i>This will permanently remove ${name}...</i></p><p>Are you sure?</p>`,
    ['Cancel:secondary', 'Remove:danger']
  );
  if (answer !== 'Remove') { return; }
  // remove the album via the REST-api
  await remove('albums', id);
  // remove from globalThis.albums
  globalThis.albums = globalThis.albums.filter(album => album.id !== id);
  // navigate to the album page
  navigate('/');
});

// Edit an album
addEventListener('click', 'button.editAlbum', async editalbumButton => {
  // get id of album to edit
  const id = +editalbumButton.closest('.album[data-id]').getAttribute('data-id');
  // navigate to edit form
  window.history.pushState(null, null, `/edit-album/${id}`);
  displayPage();
});