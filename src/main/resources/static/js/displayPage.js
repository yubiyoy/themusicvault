import { renderArtists, renderArtist } from './renderArtists.js';
import { renderAlbums, renderAlbum } from './renderAlbums.js';
import renderArtistForm from './renderArtistForm.js';
import renderAlbumForm from './renderAlbumForm.js';
import renderUserForm from './renderUserForm.js';
import render404 from './render404.js';
import setActiveMenuChoice from './utils/setActiveMenuChoice.js';
import closeHamburgerBar from './utils/closeHamburgerBar.js';
import navigate from './utils/navigate.js';

// Display different 'pages' depending on the url / location path
// (this is an Single Page Applicaiton so a 'page change'
//  corresponds to changing the content of the main element)
export default function displayPage() {
  const { artists, albums, user } = globalThis;
  const choice = location.pathname.replace('/', '');
  // redirect to startpage if not logged in and edit or add in url
  if (!user && (choice.startsWith('edit-') || choice.startsWith('add-'))) {
    navigate('/');
    return;
  }
  // display the correct page
  let html;
  if (choice === '') {
    html = renderArtists(artists);
  }
  else if (choice.includes('artist-info')) {
    let id = +choice.split('/').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtist(artist);
  }
  else if (choice.startsWith('add-artist')) {
    html = renderArtistForm();
  }
  else if (choice.startsWith('edit-artist')) {
    let id = +choice.split('/').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtistForm(artist);
  }
  else if (choice === 'albums') {
    html = renderAlbums(albums);
  }
  else if (choice.startsWith('album-info')) {
    let id = +choice.split('/').pop();
    let album = albums.find(artist => artist.id === id);
    html = renderAlbum(album);
  }
  else if (choice === 'add-album') {
    html = renderAlbumForm();
  }
  else if (choice.startsWith('edit-album')) {
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