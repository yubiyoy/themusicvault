import './utils/followExternalLinksInNewTab.js';
import './utils/usePushStateOnInternalLinks.js';
import './utils/noCommasOnArrayToString.js';
import renderNavBar from './renderNavbar.js';
import displayPage from './displayPage.js';
import { renderModalSkeleton } from './utils/waitForModalAnswer.js';
import { get, getOne } from './utils/fetchHelpers.js';

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
  // Render the navbar
  renderNavBar();
  // Display 'page' depending on url - SPA frontend routing
  displayPage();
  window.addEventListener('popstate', displayPage);
}

start();

// Write our startup message to the console
console.log('%c' + (await (await fetch('/index.html')).text())
  .split('<!--')[1].split('-->')[0], "font-family:monospace");