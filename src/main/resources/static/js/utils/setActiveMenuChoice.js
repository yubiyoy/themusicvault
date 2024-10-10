// Set the active menu item (corresponding to the url path)
export default function setActiveMenuChoice() {
  // remove the css class active on all nav links
  const navLinks = [...document.querySelectorAll('.navbar li a')];
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  // add the css class active on the correct nav link
  let path = location.pathname
  if (path.includes('artist-info')) { path = ''; }
  const activeNavLink = navLinks
    .find(navLink => navLink.getAttribute('href').includes(path));
  if (!activeNavLink) { return; }
  activeNavLink.classList.add('active');
}