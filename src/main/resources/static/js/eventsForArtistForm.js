
import fileToBase64 from "./utils/fileToBase64.js";
import formDataCollector from "./utils/formDataCollector.js";
import { post, put } from './utils/fetchHelpers.js'
import displayPage from "./displayPage.js";

// on image chosen - encode to base64 and show preview image
document.body.addEventListener('change', async event => {
  const fileField = event.target.closest('form[name="artist"] [type="file"]');
  if (!fileField) { return; }
  const encoded = await fileToBase64(fileField);
  document.querySelector('form[name="artist"] [name="base64image"]').value = encoded;
  document.querySelector('form[name="artist"] img.preview').src = encoded;
});

// on submit - post the new artist via our REST-api
// or put the changes if we are editing an artist
document.body.addEventListener('submit', async event => {
  const artistForm = event.target.closest('form[name="artist"]');
  if (!artistForm) { return; }
  // do not make hard page reload
  event.preventDefault();
  // collect the data form the form and post/put it via the REST-api
  const data = formDataCollector(artistForm);
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
  window.history.pushState(null, null, '/');
  displayPage();
  // scroll the artist into view
  setTimeout(() => {
    document.querySelector(`.artist[data-id="${artistFromDb.id}"]`)
      .scrollIntoView();
  }, 500);
});