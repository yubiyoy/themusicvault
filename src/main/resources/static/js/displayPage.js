import { renderArtists, renderArtist } from './renderArtists.js';
import renderArtistForm from './renderArtistForm.js';
import renderAboutFromReadMe from './renderAboutFromReadMe.js';
import render404 from './render404.js';
import setActiveMenuChoice from './utils/setActiveMenuChoice.js';
import closeHamburgerBar from './utils/closeHamburgerBar.js';


// Display different 'pages' depending on hash
// (this is an Single Page Applicaiton so a 'page change'
//  corresponds to changing the content of the main element)
export default function displayPage() {
  const artists = globalThis.artists;
  const choice = location.hash.replaceAll('#', '');
  let html;
  if (choice === '') {
    html = renderArtists(artists);
  }
  else if (choice.includes('artist-info')) {
    let id = +choice.split('-').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtist(artist);
  }
  else if (choice === 'add-artist') {
    html = renderArtistForm();
  }
  else if (choice.includes('edit-artist')) {
    let id = +choice.split('-').pop();
    let artist = artists.find(artist => artist.id === id);
    html = renderArtistForm(artist);
  }
  else if (choice === 'about') {
    html = renderAboutFromReadMe();
  }
  else {
    html = render404();
  }
  setActiveMenuChoice();
  closeHamburgerBar();
  document.querySelector('main').innerHTML = html;
}