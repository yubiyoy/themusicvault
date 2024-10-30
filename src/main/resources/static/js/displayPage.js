import { renderArtists, renderArtist } from './renderArtists.js';
import { renderAlbums, renderAlbum } from './renderAlbums.js';
import renderArtistForm from './renderArtistForm.js';
import renderAlbumForm from './renderAlbumForm.js';
import renderAboutFromReadMe from './renderAboutFromReadMe.js';
import renderUserForm from './renderUserForm.js';
import render404 from './render404.js';
import setActiveMenuChoice from './utils/setActiveMenuChoice.js';
import closeHamburgerBar from './utils/closeHamburgerBar.js';

// Display different 'pages' depending on the url / location path
// (this is an Single Page Applicaiton so a 'page change'
//  corresponds to changing the content of the main element)
export default function displayPage() {
  const { artists, albums } = globalThis;
  const choice = location.pathname.replace('/', '');
  let html;
  if (choice === '') {
    html = renderArtists(artists);
  }
  else if (choice.includes('artist-info')) {
    let id = +choice.split('/').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtist(artist);
  }
  else if (choice === 'add-artist') {
    html = renderArtistForm();
  }
  else if (choice.includes('edit-artist')) {
    let id = +choice.split('/').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtistForm(artist);
  }
  else if (choice === 'albums') {
    html = renderAlbums(albums);
  }
  else if (choice.includes('album-info')) {
    let id = +choice.split('/').pop();
    let album = albums.find(artist => artist.id === id);
    html = renderAlbum(album);
  }
  else if (choice === 'add-album') {
    html = renderAlbumForm();
  }
  else if (choice.includes('edit-album')) {
    let id = +choice.split('/').pop();
    let album = albums.find(album => album.id === id);
    html = renderAlbumForm(album);
  }
  else if (choice === 'about') {
    html = renderAboutFromReadMe();
  }
  else if (choice === 'register') {
    html = renderUserForm();
  }
  else {
    html = render404();
  }
  setActiveMenuChoice();
  closeHamburgerBar();
  document.querySelector('main').innerHTML = html;
  // scroll to the top of page
  setTimeout(() => window.scrollTo(0, 0), 200);
}