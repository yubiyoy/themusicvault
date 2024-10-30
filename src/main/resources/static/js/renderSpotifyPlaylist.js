// render the spotify playlist iframe
export default function renderSpotifyPlaylist(url) {
  setTimeout(resizer, 0);
  return `
    <div class="spotify-frame-holder">
      <iframe
        class="spotify-playlist-frame"
        src="${url}"
        width="1" 
        height="1" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy">
      ></iframe>
    </div>
  `;
}

// adapt the iframe for different screen sizes
function resizer() {
  let frameHolder = document.querySelector('.spotify-frame-holder');
  if (!frameHolder) { return; }
  let imgHolder = document.querySelector('.img-holder');
  let small = (location.pathname.startsWith('/album-info') && window.innerWidth < 768)
    || (!location.pathname.startsWith('/album-info') && window.innerWidth < 1400)
  imgHolder.classList[small ? 'add' : 'remove']('small');
  let width = frameHolder.getBoundingClientRect().width;
  let frame = document.querySelector('.spotify-playlist-frame');
  frame.setAttribute('width', width);
  frame.setAttribute('height', Math.max(352, width));
  frameHolder.style.height = width + 'px';
}

window.addEventListener('resize', resizer);