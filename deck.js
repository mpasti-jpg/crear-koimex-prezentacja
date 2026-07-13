// crear × KOIMEX — sterowanie prezentacją
(function () {
  const stage = document.getElementById('stage');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  const total = slides.length;
  let idx = 0;

  // --- wstrzyknięcie stopki + numeru strony (spójnie, bez powtórzeń w HTML) ---
  slides.forEach(function (s, i) {
    if (s.classList.contains('cover')) return;
    const pill = s.querySelector('.pagepill');
    if (pill && !pill.textContent.trim()) {
      pill.textContent = String(i + 1).padStart(2, '0') + '/' + String(total).padStart(2, '0');
    }
    if (!s.querySelector('.slide-footer')) {
      const f = document.createElement('div');
      f.className = 'slide-footer';
      f.innerHTML =
        '<span class="logo"><img src="assets/crear-logo.svg" alt="crear"></span>' +
        '<span class="meta">Oferta SEO · Grupa KOIMEX · 07.2026</span>';
      s.appendChild(f);
    }
  });

  // --- skalowanie sceny 1920x1080 do okna ---
  function fit() {
    const marginY = 30; // górny i dolny margines ~30px
    const vw = window.innerWidth, vh = window.innerHeight;
    const scale = Math.min(vw / 1920, (vh - marginY * 2) / 1080);
    stage.style.transform = `scale(${scale})`;
  }

  function show(n) {
    idx = Math.max(0, Math.min(total - 1, n));
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    if (counter) counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    if (progress) progress.style.width = ((idx + 1) / total * 100) + '%';
    if (history.replaceState) history.replaceState(null, '', '#' + (idx + 1));
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { show(0); }
    else if (e.key === 'End') { show(total - 1); }
  });

  // klik w prawą/lewą połowę ekranu (poza panelem nawigacji)
  document.getElementById('viewport').addEventListener('click', function (e) {
    if (e.target.closest('#nav')) return;
    const half = window.innerWidth / 2;
    if (e.clientX > half) next(); else prev();
  });

  window.addEventListener('hashchange', function () {
    const n = parseInt((location.hash || '').replace('#', ''), 10);
    if (Number.isFinite(n)) show(n - 1);
  });

  window.addEventListener('resize', fit);
  fit();

  const start = parseInt((location.hash || '').replace('#', ''), 10);
  show(Number.isFinite(start) && start >= 1 ? start - 1 : 0);
})();
