// Close the Bootstrap hamburger menu bar
// (call after menu choices)

export default function closeHamburgerBar() {
  document.querySelector('.navbar-collapse.show')
    && document.querySelector('.navbar-toggler').click();
}
