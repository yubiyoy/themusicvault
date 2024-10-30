
import fileToBase64 from "./utils/fileToBase64.js";
import formDataCollector from "./utils/formDataCollector.js";
import { get, post, put, remove } from './utils/fetchHelpers.js'
import addEventListener from "./utils/addEventListener.js";
import navigate from "./utils/navigate.js";
import addRelations from "./utils/addRelations.js";

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
  const artists = data.artists;
  delete data.artists;
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
  // handle artist relations
  await updateArtistRelations(albumFromDb.id, artists);
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

async function updateArtistRelations(albumId, artistIds) {
  // remove old relations
  let album = globalThis.albums.find(x => x.id === albumId);
  let oldArtistIds = (album.artists || []).map(x => x.id);
  for (let artistId of oldArtistIds) {
    let id = globalThis.artistXAlbums.find(
      x => x.artistId === artistId && x.albumId === albumId
    ).id;
    await remove('artistXAlbums', id);
  }
  // add new relations
  for (let artistId of artistIds) {
    await post('artistXAlbums', { artistId, albumId });
  }
  globalThis.artistXAlbums = await get('artistXAlbums')
  addRelations(globalThis.artistXAlbums);
}