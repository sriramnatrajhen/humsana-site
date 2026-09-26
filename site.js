/* Two small behaviours: the navigation border once the page moves, and the
   mechanism rail. Everything else on the site is static markup. */
(function () {
  var nav = document.querySelector('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  var rail = document.querySelector('.rail');
  if (!rail) { return; }
  var steps = Array.prototype.slice.call(rail.querySelectorAll('.step'));
  var bodies = Array.prototype.slice.call(document.querySelectorAll('.step-body'));
  var select = function (i) {
    steps.forEach(function (s, j) { s.setAttribute('aria-selected', i === j ? 'true' : 'false'); });
    bodies.forEach(function (b, j) {
      if (i === j) { b.removeAttribute('hidden'); } else { b.setAttribute('hidden', ''); }
    });
  };
  steps.forEach(function (s, i) {
    s.addEventListener('click', function () { select(i); });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
    });
  });
}());
