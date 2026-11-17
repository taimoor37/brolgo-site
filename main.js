(function () {
  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('siteNav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Header border once scrolled
  var header = document.getElementById('siteHeader');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // XMAS-START: Christmas offer, ends end of 27 Dec 2026 Brisbane time. Auto hides after that.
  (function () {
    var live = Date.now() < Date.parse('2026-12-28T00:00:00+10:00');
    [].forEach.call(document.querySelectorAll('[data-xmas]'), function (el) { if (!live) el.remove(); });
    [].forEach.call(document.querySelectorAll('[data-regular]'), function (el) { if (live) el.remove(); });
    if (!live) {
      var o = document.querySelector('#service option[value="review"]');
      if (o) o.textContent = 'App production review ($990)';
    }
  })();
  // XMAS-END

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Preselect service on the contact form from ?service=
  var select = document.getElementById('service');
  if (select) {
    var m = /[?&]service=([a-z]+)/.exec(location.search);
    if (m) select.value = m[1];
  }

  // Home page checklist animation
  var items = [].slice.call(document.querySelectorAll('#checklist li'));
  if (items.length) {
    var meter = document.getElementById('meter');
    var label = document.getElementById('meterLabel');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var show = function (n) {
      items.forEach(function (li, i) {
        var done = i < n;
        li.classList.toggle('done', done);
        li.querySelector('.state').textContent = done ? 'ready' : 'open';
      });
      meter.style.setProperty('--p', Math.max(n / items.length * 100, 4) + '%');
      label.textContent = n + ' of ' + items.length + ' ready';
    };
    if (reduce) { show(items.length); return; }
    var n = 0;
    show(0);
    setInterval(function () { n = n >= items.length ? 0 : n + 1; show(n); }, 1400);
  }
})();
