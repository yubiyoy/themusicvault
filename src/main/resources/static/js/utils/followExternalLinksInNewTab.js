import addEventListener from "./addEventListener.js";

// Follow all external links in a new tab
// (external links start with "http")
addEventListener('click', 'a[href^="http"]',
  link => link.setAttribute('target', '_blank'));