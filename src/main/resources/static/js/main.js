import './utils/followExternalLinksInNewTab.js';
import './utils/usePushStateOnInternalLinks.js';
import './utils/noCommasOnArrayToString.js';
import renderNavBar from './renderNavbar.js';
import displayPage from './displayPage.js';
import { renderModalSkeleton } from './utils/waitForModalAnswer.js';
import { get, getOne } from './utils/fetchHelpers.js';
import addRelations from './utils/addRelations.js';

// Start the application
async function start() {
  // Basic html structure
  document.body.innerHTML = `
    <header></header>
    <main class="container mt-5"></main>
    <footer class="text-center py-3 mt-4">
      © Jacob Koberstein Productions ${new Date().getFullYear()}
    </footer>
    <div class="toast-container"></div>
    ${renderModalSkeleton()}
  `;
  // Get the logged in user and store in globalThis
  globalThis.user = await getOne('login');
  // Get a list of all artists and store in globalThis
  globalThis.artists = await get('artists');
  // Get a list of all albums and store in globalThis
  globalThis.albums = await get('albums');
  // Get a list of all relations between artists and albums
  // and add relations between artists and albums
  globalThis.artistXAlbums = await get('artistXAlbums')
  addRelations(globalThis.artistXAlbums);
  // Render the navbar
  renderNavBar();
  // Display 'page' depending on url - SPA frontend routing
  displayPage();
  window.addEventListener('popstate', displayPage);
}

start();

// Write our startup message to the console
// (extracted from the html comment at the top of index.html)
console.log(
  '%c' + document.getRootNode().childNodes[1].nodeValue,
  'font-family:monospace'
);