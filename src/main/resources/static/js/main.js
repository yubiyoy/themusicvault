import './utils/followExternalLinksInNewTab.js';
import './utils/usePushStateOnInternalLinks.js';
import './utils/noCommasOnArrayToString.js';
import { get } from './utils/fetchHelpers.js';
import renderNavBar from './renderNavbar.js';
import displayPage from './displayPage.js';

// Start the application
async function start() {
  // Basic html structure
  document.body.innerHTML = `
    <header></header>
    <main class="container mt-5"></main>
    <footer class="text-center py-3 mt-3">
      © Jakob Koberstein Productions ${new Date().getFullYear()}
    </footer>
  `;
  // Render the navbar
  renderNavBar();
  // Get a list of all artists and store in globalThis
  globalThis.artists = await get('artists');
  // Display 'page' depending on url - SPA frontend routing
  displayPage();
  window.addEventListener('popstate', displayPage);
}

start();