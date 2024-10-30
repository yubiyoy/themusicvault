
import fileToBase64 from "./utils/fileToBase64.js";
import formDataCollector from "./utils/formDataCollector.js";
import { post, put } from './utils/fetchHelpers.js'
import addEventListener from "./utils/addEventListener.js";
import navigate from "./utils/navigate.js";

// on image chosen - encode to base64 and show preview image
addEventListener('change', 'form[name="album"] [type="file"]', async fileField => {
  const encoded = await fileToBase64(fileField);
  document.querySelector('form[name="album"] [name="base64image"]').value = encoded;
  document.querySelector('form[name="album"] img.preview').src = encoded;
});

// on submit - post the new album via our REST-api
// or put the changes if we are editing an album
addEventListener('submit', 'form[name="album"]', async albumForm => {
  // collect the data form the form and post/put it via the REST-api
  const data = formDataCollector(albumForm);
  const { id } = data;
  // post or put the new album and remember they
  let albumFromDb = !id ?
    await post('albums', data) :
    await put('albums', id, data);
  // add or change the new album in our list of albums
  !id ?
    globalThis.albums.push(albumFromDb) :
    Object.assign(
      globalThis.albums.find(album => album.id === +id),
      albumFromDb
    );
  // sort albums by name
  globalThis.albums.sort((a, b) => a.name > b.name ? 1 : -1);
  // navigate to the album page
  navigate('/albums');
  // scroll the album into view
  setTimeout(() => {
    document.querySelector(`.album[data-id="${albumFromDb.id}"]`)
      .scrollIntoView();
  }, 500);
});