export default function closeHamburgerBar() {
  document.querySelector('.navbar-collapse.show')
    && document.querySelector('.navbar-toggler').click();
}
