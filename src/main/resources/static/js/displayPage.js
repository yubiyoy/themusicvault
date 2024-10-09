import { renderArtists, renderArtist } from './renderArtists.js';
import renderArtistForm from './renderArtistForm.js';
import render404 from './render404.js';
import closeHamburgerBar from './utils/closeHamburgerBar.js';

// display different 'pages' depending on hash
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
  else {
    html = render404();
  }
  closeHamburgerBar();
  document.querySelector('main').innerHTML = html;
}