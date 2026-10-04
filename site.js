/* Two small behaviours: the navigation border once the page moves, and the
   mechanism rail. Everything else on the site is static markup. */
(function () {
  var nav = document.querySelector('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  /* Wire every rail that actually carries mechanism steps. Taking the first .rail on the page is not
     enough: the action map also contains a .rail, and it holds no steps, so a page with a map would
     hand the wiring an empty list and the mechanism would stop switching. */
  var rails = Array.prototype.slice.call(document.querySelectorAll('.rail')).filter(function (r) {
    return r.querySelector('.step');
  });
  if (!rails.length) { return; }
  rails.forEach(function (rail) {
    var steps = Array.prototype.slice.call(rail.querySelectorAll('.step'));
    var scope = (rail.closest && rail.closest('section')) || document;
    var bodies = Array.prototype.slice.call(scope.querySelectorAll('.step-body'));
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

/* Generic tablists: the boundary switch, the recorded-answer toggle and the case list.
   Each button names its panel with aria-controls, so one implementation covers all three.
   Arrow keys move and select, which is what a tablist owes a keyboard. */
(function () {
  var lists = Array.prototype.slice.call(document.querySelectorAll('[role="tablist"]'));
  lists.forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    if (!tabs.length || tabs.some(function (t) { return !t.getAttribute('aria-controls'); })) { return; }
    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.setAttribute('tabindex', on ? '0' : '-1');
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) {
          if (on) {
            panel.removeAttribute('hidden');
            /* restart the changed-value flash so switching tabs shows the drift rather than only
               naming it. Removing the class and forcing a reflow is what restarts the animation. */
            if (panel.classList.contains('acts-panel')) {
              panel.classList.remove('enter');
              void panel.offsetWidth;
              panel.classList.add('enter');
            }
          } else {
            panel.setAttribute('hidden', '');
          }
        }
        var when = on ? tab.getAttribute('data-case') : null;
        if (when) {
          var scope = tab.closest('[data-scene-scope]') || document;
          var target = scope.querySelector('.scene');
          if (target) { target.setAttribute('data-case', when); }
        }
      });
      if (focus) { tabs[index].focus(); }
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var last = tabs.length - 1, next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next = i === last ? 0 : i + 1; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { next = i === 0 ? last : i - 1; }
        else if (e.key === 'Home') { next = 0; }
        else if (e.key === 'End') { next = last; }
        if (next === null) { return; }
        e.preventDefault();
        select(next, true);
      });
    });
  });
}());

/* The action map carries one authored moment: an action travels to the boundary and is stopped there.
   The finished diagram is the default state and this only adds the animation, so if the observer is
   missing, javascript is off, or the visitor prefers reduced motion, nothing is lost from the page. */
(function () {
  if (!('IntersectionObserver' in window) || !window.matchMedia) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  var maps = Array.prototype.slice.call(document.querySelectorAll('.bmap'));
  if (!maps.length) { return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      entry.target.classList.add('play');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  maps.forEach(function (map) { io.observe(map); });
}());

/* The changed value flashes once, the first time the comparison is seen. This is the same wash the
   action-class panels use, so the deviation reads the same wherever it appears. */
(function () {
  if (!('IntersectionObserver' in window) || !window.matchMedia) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  var wrap = document.querySelector('.acts');
  var audit = document.querySelector('.audit');
  if (!wrap && !audit) { return; }
  if (audit) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('enter');
        io2.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    io2.observe(audit);
  }
  if (!wrap) { return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      var panel = wrap.querySelector('.acts-panel:not([hidden])');
      if (panel) { panel.classList.add('enter'); }
      io.disconnect();
    });
  }, { threshold: 0.25 });
  io.observe(wrap);
}());
