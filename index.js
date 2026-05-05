/* ═══════════════════════════════════════════════
   RITUAL — Discord Community
   index.js
   ═══════════════════════════════════════════════ */

/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  let mx = 0, my = 0;  // mouse position
  let rx = 0, ry = 0;  // ring position (lagged)

  // Move dot cursor instantly
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Animate ring with lag
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand cursor on interactive elements
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '14px';
      cursor.style.height = '14px';
      ring.style.width    = '56px';
      ring.style.height   = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '8px';
      cursor.style.height = '8px';
      ring.style.width    = '36px';
      ring.style.height   = '36px';
    });
  });
})();


/* ── 2. SCROLL REVEAL ── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Small stagger delay per element
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all elements that need reveal
  document.querySelectorAll('.reveal, .feature, .testi').forEach((el) => {
    observer.observe(el);
  });
})();


/* ── 3. COUNTER ANIMATION ── */
(function initCounters() {
  function animateCount(el, target) {
    const DURATION = 1800; // ms
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / DURATION, 1);
      // Quartic ease-out: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(eased * target);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          if (!isNaN(target)) animateCount(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach((el) => {
    counterObserver.observe(el);
  });
})();


/* ── 4. STAGGER DELAYS ── */
(function initStagger() {
  // Features slide in one by one
  document.querySelectorAll('.feature').forEach((el, i) => {
    el.style.transitionDelay = (i * 80) + 'ms';
  });

  // Testimonials fade in one by one
  document.querySelectorAll('.testi').forEach((el, i) => {
    el.style.transitionDelay = (i * 100) + 'ms';
  });
})();