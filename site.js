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

/* The refusal block: one 400ms highlight of the changed field, once, when it enters the viewport.
   Static when the visitor prefers reduced motion. */
(function () {
  var changed = document.querySelector('.rf-changed');
  if (!changed || !window.matchMedia) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  if (!('IntersectionObserver' in window)) { return; }
  var once = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('hl-once');
        once.disconnect();
      }
    });
  }, { threshold: 0.6 });
  once.observe(changed);
}());
