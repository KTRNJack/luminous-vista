/* ======================================================
   script.js — 白光流域 Luminous Vista
   ====================================================== */

/* ------ 1. Star Canvas Animation ---------------------- */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x:       Math.random() * w,
      y:       Math.random() * h,
      r:       Math.random() * 1.4 + 0.2,
      alpha:   Math.random(),
      speed:   Math.random() * 0.004 + 0.002,
      drift:   (Math.random() - 0.5) * 0.15,
      twinkle: Math.random() * Math.PI * 2
    };
  }

  function initStarField() {
    stars = Array.from({ length: 200 }, createStar);
  }

  function drawStar(s) {
    s.twinkle += s.speed;
    s.alpha    = 0.4 + Math.sin(s.twinkle) * 0.55;
    s.x       += s.drift;
    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232, 213, 163, ${Math.max(0, s.alpha)})`;
    ctx.fill();
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(drawStar);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initStarField(); });
  resize();
  initStarField();
  loop();
})();


/* ------ 2. Navbar: scroll effect + burger ------------- */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const links   = navLinks ? navLinks.querySelectorAll('.navbar__link') : [];

  // Scroll → add "scrolled" class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Burger toggle
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (mobile)
    links.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();


/* ------ 3. Scroll Reveal (Intersection Observer) ------ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings revealed together
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80 * i);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ------ 4. Footer year --------------------------------- */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ------ 5. Smooth active nav highlight on scroll ------- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.navbar__link[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();
