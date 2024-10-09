// Set the active menu item (corresponding to the url hash)
export default function setActiveMenu() {
  // remove the css class active on all nav links
  const navLinks = [...document.querySelectorAll('.navbar li a')];
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  // add the css class active on the correct nav link
  let hash = location.hash;
  if (hash.includes('artist-info')) { hash = ''; }
  const activeNavLink = navLinks
    .find(navLink => navLink.getAttribute('href').includes(hash));
  activeNavLink.classList.add('active');
  console.log(location.hash.split('-')[0], activeNavLink);
}