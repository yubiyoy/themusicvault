import './eventsForAlbumForm.js';

// Render a form for adding or editing album info
export default function renderAlbumForm(album = {}) {
  let { id, name, description, base64image, spotifyLink } = album;
  return `
    <form name="album">
      ${id ? `<input type="hidden" name="id" value="${id}">` : ''}
      <div class="row">
        <div class="col">
          <h1>${id ? `Edit: ${album.name}` : 'Add a new album'}</h1>
          <label class="form-label mt-4">
            Album name:
            <input name="name" class="form-control"
              required minlength="2" placeholder="album name"
              value="${name || ''}"
            >
          </label>
          <label class="form-label mt-4">
            Spotify link:
            <input name="spotifyLink" class="form-control"
              required minlength="2" placeholder="Spotify link"
              value="${spotifyLink || ''}"
            >
          </label>
          <label class="form-label mt-4">
            ${id ? 'Change image:' : 'Choose an image:'}
            <img class="preview album d-block mb-3 mt-lg-3 mb-lg-0 float-lg-end"
              src="${base64image || '/images/placeHolderImage.jpg'}">
            <input type="file" class="form-control"
              ${id ? '' : 'required'} accept=".jpg,.jpeg">
            <input type="hidden" name="base64image" value="${base64image || ''}">
          </label>
          <label class="form-label mt-4">
            Description:
            <textarea name="description" class="form-control"
              required minlength="2" placeholder="Description"
            >${description || ''}</textarea>
          </label>
          <button type="submit" class="btn btn-secondary my-3 float-end">
            ${id ? 'Make changes' : 'Add album'}
          </button>
        </div>
      </div>
    </form>
  `;
}