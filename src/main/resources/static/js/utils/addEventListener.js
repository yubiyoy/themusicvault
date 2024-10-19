// Simplify the use of delegated event listeners
// (if the event is triggered on our body / the whole viewport 
// then see if the target matches the css selector
// and, if so, run the listener function)
export default function addEventListener(type, cssSelector, listener) {
  document.body.addEventListener(type, event => {
    // on submit prevent the default behavior (a hard page reload)
    if (type === "submit") { event.preventDefault(); }
    // check for matched element
    const matchedHtmlElement = event.target.closest(cssSelector);
    if (!matchedHtmlElement) { return; }
    // run the listener
    listener(matchedHtmlElement, event);
  });
}