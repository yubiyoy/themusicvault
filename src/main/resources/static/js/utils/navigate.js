import displayPage from "../displayPage.js";

// Navigate
// (goto a frontend route programatically)
export default function navigate(route) {
  window.history.pushState(null, null, route);
  displayPage();
}