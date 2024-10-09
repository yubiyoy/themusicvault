import { get } from './utils/fetchHelpers.js';
import renderNavBar from './renderNavbar.js';
import displayPage from './displayPage.js';

// NOTE:
// Several JS files in this project has 
// a lot HTML-snippets inside template literals
// by working in Visual Studio Code and installing the extension
// leet-html the html will get nice syntax highlighting.

// Do not add comma when converting arrays to strings
Array.prototype.toString = function () { return this.join(''); }

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
  // Display 'page' depending on hash
  displayPage();
  window.onhashchange = () => displayPage();
}

start();