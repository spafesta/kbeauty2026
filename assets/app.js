/* 주제 페이지 공통 동작: 읽은 정도 표시, 목차 칩, 좌우로 밀어 이동 */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  /* 읽은 정도 */
  var bar = document.querySelector('.progress i');
  function onScroll() {
    if (!bar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + '%';
  }

  /* 목차 칩 (본문의 소제목에서 자동 생성) */
  var toc = document.querySelector('.toc');
  var heads = [];
  if (toc) {
    document.querySelectorAll('main > section').forEach(function (sec, i) {
      if (sec.classList.contains('callout')) return;
      var h = sec.querySelector(':scope > h3');
      if (!h) return;
      sec.id = sec.id || 's' + (i + 1);
      var a = document.createElement('a');
      a.href = '#' + sec.id;
      a.textContent = h.textContent;
      toc.appendChild(a);
      heads.push({ sec: sec, a: a });
    });
    if (heads.length < 2) toc.innerHTML = '';
  }
  function spy() {
    if (!heads.length) return;
    var cur = heads[0], y = window.scrollY + 140;
    heads.forEach(function (o) { if (o.sec.offsetTop <= y) cur = o; });
    heads.forEach(function (o) { o.a.classList.toggle('on', o === cur); });
    if (cur.a.scrollIntoView && toc.scrollWidth > toc.clientWidth) {
      toc.scrollTo({ left: cur.a.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScroll(); spy(); ticking = false; });
  }, { passive: true });
  onScroll(); spy();

  /* 이전·다음 이야기로 이동 */
  var prev = body.getAttribute('data-prev'), next = body.getAttribute('data-next');
  function go(url) { if (url) location.href = url; }
  var x0 = null, y0 = 0;
  document.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1 || e.target.closest('.toc, table, input, textarea')) { x0 = null; return; }
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) go(dx < 0 ? next : prev);
  }, { passive: true });
  document.addEventListener('keydown', function (e) {
    if (/input|textarea|select/i.test(e.target.tagName) || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') go(next);
    if (e.key === 'ArrowLeft') go(prev);
  });
})();
