import fileToBase64 from "./utils/fileToBase64.js";
import formDataCollector from "./utils/formDataCollector.js";
import { post, put } from './utils/fetchHelpers.js'

// Render a form for adding or editing artist info
export default function renderArtistForm(artist = {}) {
  let { id, name, description, base64image } = artist;
  return `
    <form name="addArtist">
      ${id ? `<input type="hidden" name="id" value="${id}">` : ''}
      <div class="row">
        <div class="col">
          <h1>${id ? `Edit: ${artist.name}` : 'Add a new artist'}</h1>
          <label class="form-label mt-4">
            Artist name:
            <input name="name" class="form-control"
              required minlength="2" placeholder="Artist name"
              value="${name || ''}"
            >
          </label>
          <label class="form-label mt-4">
            Description:
            <textarea name="description" class="form-control"
              required minlength="2" placeholder="Description"
            >${description || ''}</textarea>
          </label>
          <label class="form-label mt-4">
            ${id ? 'Change image:' : 'Choose an image:'}
            <img class="preview d-block mb-3 mt-lg-3 mb-lg-0 float-lg-end"
              src="${base64image || '/images/placeHolderImage.jpg'}">
            <input type="file" class="form-control"
              ${id ? '' : 'required'} accept=".jpg,.jpeg">
            <input type="hidden" name="base64image" value="${base64image || ''}">
          </label>
          <button type="submit" class="btn btn-secondary my-3 float-end">
            ${id ? 'Make changes' : 'Add artist'}
          </button>
        </div>
      </div>
    </form>
  `;
}

// on image chosen - encode to base64 and show preview image
document.body.addEventListener('change', async event => {
  const fileField = event.target.closest('form[name="addArtist"] [type="file"]');
  if (!fileField) { return; }
  const encoded = await fileToBase64(fileField);
  document.querySelector('form[name="addArtist"] [name="base64image"]').value = encoded;
  document.querySelector('form[name="addArtist"] img.preview').src = encoded;
});

// on submit - post the new artist via our REST-api
// or put the changes if we are editing an artist
document.body.addEventListener('submit', async event => {
  const addArtistForm = event.target.closest('form[name="addArtist"]');
  if (!addArtistForm) { return; }
  // do not make hard page reload
  event.preventDefault();
  // collect the data form the form and post/put it via the REST-api
  const data = formDataCollector(addArtistForm);
  const { id } = data;
  // post or put the new artist and remember they
  let artistFromDb = !id ?
    await post('artists', data) :
    await put('artists', id, data);
  // add or change the new artist in our list of artists
  !id ?
    globalThis.artists.push(artistFromDb) :
    Object.assign(
      globalThis.artists.find(artist => artist.id === +id),
      artistFromDb
    );
  // sort artists by name
  globalThis.artists.sort((a, b) => a.name > b.name ? 1 : -1);
  // navigate to the artist page
  location.hash = "#";
  // scroll the artist into view
  setTimeout(() => {
    document.querySelector(`.artist[data-id="${artistFromDb.id}"]`)
      .scrollIntoView();
  }, 100);
});