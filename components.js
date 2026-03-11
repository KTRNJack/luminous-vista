/* ======================================================
   components.js — 白光流域 Luminous Vista
   共用 Navbar / Footer 動態注入 + 全站互動元件
   ====================================================== */

/* --- 頁面設定 ------------------------------------------ */
const PAGES = [
  { href: 'index.html',               label: '首頁',     exact: true  },
  { href: 'services.html',            label: '服務項目'               },
  { href: 'products.html',            label: '商品',     parent: true },
  { href: 'courses.html',             label: '精選課程'               },
  { href: 'reviews.html',             label: '學生心得'               },
];

const PRODUCT_PAGES = [
  { href: 'products-spiritual.html',  label: '靈性服務' },
  { href: 'products-magic.html',      label: '魔法商品' },
];

/* --- 判斷 active 頁面 ---------------------------------- */
function isActive(href, exact) {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  if (exact) return current === href || current === '' || current === '/';
  return current === href;
}

function isProductPage() {
  const current = window.location.pathname.split('/').pop();
  return PRODUCT_PAGES.some(p => p.href === current);
}

/* --- Navbar HTML --------------------------------------- */
function buildNavbar() {
  const links = PAGES.map(page => {
    const active = isActive(page.href, page.exact) || (page.parent && isProductPage());

    if (page.parent) {
      const subLinks = PRODUCT_PAGES.map(sub => `
        <li><a href="${sub.href}" class="dropdown__link${isActive(sub.href) ? ' active' : ''}">${sub.label}</a></li>
      `).join('');
      return `
        <li class="navbar__item navbar__item--dropdown">
          <a href="${page.href}" class="navbar__link${active ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">
            ${page.label} <i class="fa-solid fa-chevron-down navbar__chevron" aria-hidden="true"></i>
          </a>
          <ul class="dropdown"><div class="dropdown__inner">${subLinks}</div></ul>
        </li>`;
    }

    return `<li class="navbar__item"><a href="${page.href}" class="navbar__link${active ? ' active' : ''}">${page.label}</a></li>`;
  }).join('');

  return `
    <nav class="navbar" id="navbar" role="navigation" aria-label="主要導覽">
      <div class="navbar__container">
        <a href="index.html" class="navbar__logo" aria-label="白光流域首頁">
          <span class="navbar__logo-zh">白光流域</span>
          <span class="navbar__logo-en">Luminous Vista</span>
        </a>
        <button class="navbar__burger" id="navBurger" aria-label="展開選單" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="navbar__links" id="navLinks">
          ${links}
          <li class="navbar__item">
            <a href="products-spiritual.html" class="navbar__link navbar__link--cta">立即預約</a>
          </li>
        </ul>
      </div>
    </nav>`;
}

/* --- Footer HTML --------------------------------------- */
function buildFooter() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="container footer__container">
        <div class="footer__brand">
          <p class="footer__logo-zh">白光流域</p>
          <p class="footer__logo-en">Luminous Vista</p>
          <p class="footer__tagline">接引第七次元以上純淨白光<br/>讓這股無條件的愛流動</p>
        </div>
        <nav class="footer__nav" aria-label="頁尾導覽">
          <div class="footer__nav-group">
            <p class="footer__nav-title">頁面</p>
            <a href="index.html">首頁</a>
            <a href="services.html">服務項目</a>
            <a href="courses.html">精選課程</a>
            <a href="reviews.html">學生心得</a>
          </div>
          <div class="footer__nav-group">
            <p class="footer__nav-title">商品</p>
            <a href="products.html">商品總覽</a>
            <a href="products-spiritual.html">靈性服務</a>
            <a href="products-magic.html">魔法商品</a>
          </div>
          <div class="footer__nav-group">
            <p class="footer__nav-title">聯絡我們</p>
            <a href="https://www.instagram.com/luminous_vista___/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/woo.tarot/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://line.me/R/ti/p/@tye7794w" target="_blank" rel="noopener">LINE 官方帳號</a>
            <a href="mailto:wootarot@gmail.com">wootarot@gmail.com</a>
          </div>
        </nav>
        <div class="footer__bottom">
          <p class="footer__copy">© <span class="footer__year"></span> 白光流域 Luminous Vista. All rights reserved.</p>
          <div class="footer__socials">
            <a href="https://www.instagram.com/luminous_vista___/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/woo.tarot/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://line.me/R/ti/p/@tye7794w" target="_blank" rel="noopener" aria-label="LINE"><i class="fa-brands fa-line"></i></a>
          </div>
        </div>
      </div>
    </footer>`;
}

/* --- Loading Screen ------------------------------------ */
function buildLoading() {
  return `
    <div class="lv-loading" id="lvLoading" aria-hidden="true">
      <div class="lv-loading__orb"></div>
      <p class="lv-loading__text">白光流域</p>
      <p class="lv-loading__sub">Luminous Vista</p>
    </div>`;
}

/* --- Back to Top Button -------------------------------- */
function buildBackToTop() {
  return `
    <button class="back-to-top" id="backToTop" aria-label="回到頂端" title="回到頂端">
      <i class="fa-solid fa-chevron-up"></i>
    </button>`;
}

/* --- 注入 HTML ----------------------------------------- */
function inject() {
  // Loading screen (inject before <body> content)
  document.body.insertAdjacentHTML('afterbegin', buildLoading());

  // Back to top button
  document.body.insertAdjacentHTML('beforeend', buildBackToTop());

  const navPlaceholder    = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder)    navPlaceholder.outerHTML    = buildNavbar();
  if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter();

  // 設定頁尾年份
  document.querySelectorAll('.footer__year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  initNavbar();
  initReveal();
  initLoading();
  initBackToTop();
}

/* --- Loading Screen 邏輯 ------------------------------- */
function initLoading() {
  const loader = document.getElementById('lvLoading');
  if (!loader) return;

  // 字體與圖片載入後消失，最短顯示 600ms，資源好了就消失
  const hide = () => {
    loader.classList.add('lv-loading--done');
    setTimeout(() => loader.remove(), 700);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }
}

/* --- Back to Top 邏輯 ---------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Navbar 互動邏輯 ----------------------------------- */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });
    // Close menu when clicking a non-dropdown link
    navLinks.querySelectorAll('a:not(.navbar__link[aria-haspopup])').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile dropdown accordion — smooth open/close
  document.querySelectorAll('.navbar__item--dropdown').forEach(item => {
    const toggle = item.querySelector('.navbar__link');
    toggle?.addEventListener('click', (e) => {
      if (window.innerWidth <= 640) {
        e.preventDefault();
        const wasOpen = item.classList.contains('open');
        // Close all other open dropdowns first
        document.querySelectorAll('.navbar__item--dropdown.open').forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open', !wasOpen);
        toggle.setAttribute('aria-expanded', !wasOpen);
      }
    });
  });
}

/* --- Scroll Reveal ------------------------------------- */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80 * i);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* --- Star Canvas --------------------------------------- */
function initStars(canvasId = 'starCanvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], w, h;

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  function createStar() {
    return { x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.2,
             alpha: Math.random(), speed: Math.random() * 0.004 + 0.002,
             drift: (Math.random() - 0.5) * 0.15, twinkle: Math.random() * Math.PI * 2 };
  }
  function loop() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.twinkle += s.speed;
      s.alpha = 0.4 + Math.sin(s.twinkle) * 0.55;
      s.x += s.drift;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(176, 138, 62,${Math.max(0, s.alpha) * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); stars = Array.from({ length: 200 }, createStar); });
  resize();
  stars = Array.from({ length: 200 }, createStar);
  loop();
}

/* --- 執行 --------------------------------------------- */
document.addEventListener('DOMContentLoaded', inject);

// 匯出給各頁面使用
window.LV = { initStars };
