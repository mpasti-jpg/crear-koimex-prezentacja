// Nawigacja i skalowanie kanwy 1920x1080 do okna (bez zmiany układu).
(function () {
  var deck = document.getElementById('deck');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var current = 0;

  function fit() {
    if (document.body.classList.contains('no-fit')) return;
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    deck.style.transform = 'scale(' + s + ')';
  }

  function show(n, push) {
    current = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === current); });
    if (push !== false) history.replaceState(null, '', '#' + (current + 1));
  }

  function fromHash() {
    var n = parseInt((location.hash || '').replace('#', ''), 10);
    show(isNaN(n) ? 0 : n - 1, false);
  }

  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        e.preventDefault(); show(current + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); show(current - 1); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(slides.length - 1); break;
      case 'f': case 'F':
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
      case 's': case 'S': // 1:1 (100%) vs dopasowanie do okna
        document.body.classList.toggle('no-fit'); fit(); break;
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    show(current + (e.clientX < window.innerWidth * 0.25 ? -1 : 1));
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', fromHash);

  fit();
  fromHash();
})();
