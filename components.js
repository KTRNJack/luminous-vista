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

/* --- 學生心得資料 -------------------------------------- */
const REVIEWS_DATA = [
  {
    "name": "Jun",
    "course": "獨角獸初階靈氣學員",
    "avatar": "J",
    "content": "獨角獸靈氣三天的課程，在星星的帶領下很輕鬆愉快又愜意地度過。我突然覺得這其實是獨角獸正在告訴我，這就是我的本質，讓自己快樂並分享出去為大家帶來快樂喜悅，就是我最喜歡的事情，也能讓我充滿著滿滿的活力。"
  },
  {
    "name": "Ivan",
    "course": "獨角獸初階靈氣學員",
    "avatar": "I",
    "content": "自信、表達、信任內在的聲音、直覺，療癒 / 放下和解過往的傷口，靈性世界，千變萬化，無奇不有，以開放的心去面對。放下執著不拘小節，你想的是美好，自然就會吸引美好，這是我學獨角獸靈氣這段期間所學到的。感恩 Molly 老師的教導，讓我意識到了自身的不足！"
  },
  {
    "name": "Jack",
    "course": "獨角獸進階靈氣學員",
    "avatar": "J",
    "content": "上週的獨角獸進階課程，因為小班制，在上課時可以紮紮實實的練習到。跟老師的距離不會出現聽不清楚的情況。星星老師的講解跟解釋也很清楚，感謝老師這次的授課。有老師的帶領就只需要順從聲音的指引就好啦～"
  },
  {
    "name": "Whisper",
    "course": "獨角獸初階靈氣學員",
    "avatar": "W",
    "content": "在上課前我其實一直覺得自己不能連到，但因為被之前的分享燒到所以決定試看看，上完課的心得只能說很超值！不只是連接到自己的獨角獸（我的獨角獸叫小莓），還透過同學之間的練習，更看清自己目前的盲點。星星老師也不是武斷、絕對的給我們正確解答，很適合沒有接觸過、想給自己賦能的人。"
  },
  {
    "name": "Ellie",
    "course": "獨角獸初階靈氣學員",
    "avatar": "E",
    "content": "在日常生活裡面我有幾個蠻常需要去處理的議題，例如：情緒困擾、人際關係界線、不知道自己想要什麼。然而在這次的上課中，我覺得都有找到一些可以讓我自己更舒適的方式。因為感受到舒適的感覺才發現原來能量對自己有很大的影響，自己是能夠如此平靜。"
  },
  {
    "name": "UC",
    "course": "獨角獸初階靈氣學員",
    "avatar": "U",
    "content": "老師會帶著溫柔堅定的態度提問，來引導我們慢慢靠近答案。即使如我一般，對於能收穫什麼沒有特定目標的人，也在這兩天當中有很多收穫。像是長大過程中會有的生長痛一樣，會一邊不舒服、一邊知道自己正在變得更好，我覺得很適合希望內在穩定但找不到方法的人嘗試。"
  },
  {
    "name": "Ariel",
    "course": "獨角獸初階靈氣學員",
    "avatar": "A",
    "content": "獨角獸能量跟其他靈氣很不一樣，有一種很喜悅的感受。課堂上第一次連結獨角獸王國的時候，居然有種像出國一樣，興奮、激動、開心的感覺，這是上其他靈氣課程完全沒有的。星星老師人超親切，就像自己的朋友一樣，沒有距離感，課程結束後有問必答。"
  },
  {
    "name": "Rose",
    "course": "獨角獸進階靈氣學員",
    "avatar": "R",
    "content": "星星老師與其他老師授課不同的地方在於，會保有課程的自由與彈性，且尊重並聆聽學生的分享。課程中也會有離開教室與大自然融為一體的時間，讓我感受到獨角獸與大自然的關係與連結。很喜歡課程的自由與彈性度，讓我們更為敞開與大地萬物連結。"
  },
  {
    "name": "Mini",
    "course": "獨角獸初階靈氣學員",
    "avatar": "M",
    "content": "起初我對靈氣一無所知，完全是個「靈氣麻瓜」。課程中，我從一開始的懷疑，到漸漸被療癒的能量驚喜地打開。最大的收穫，是學會了「相信自己」。這是一段「後勁很強」的旅程，療癒的能量不只在課程中發生，而是持續在生活中擴展。"
  },
  {
    "name": "Does",
    "course": "獨角獸進階靈氣學員",
    "avatar": "D",
    "content": "初階課程認識的是「獨角獸」，而進階課程則是認識「飛馬」。兩者讓我有很不同的感覺，如果我的獨角獸是活潑的話，飛馬大概就是行動力滿點的霸道總裁了！和水晶、植物對話是非常特別的經驗，也讓我更了解自己跟調整自己的能力。"
  },
  {
    "name": "Ellie",
    "course": "獨角獸初階靈氣學員",
    "avatar": "E",
    "content": "我們是很早就決定要上這堂課了！星星老師非常有耐心的且溫柔的回答我們的每一個疑問，有問必答真的很讚！課程內容也非常充實，多次練習也讓我慢慢抓到接受訊息的訣竅。感謝同學跟老師也給了我很多的鼓勵與支持，期待接下來的進階課程！"
  }
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

/* --- Reviews HTML -------------------------------------- */
function buildReviews() {
  if (typeof REVIEWS_DATA === 'undefined' || !REVIEWS_DATA.length) return '';
  return REVIEWS_DATA.map(review => `
    <article class="review-card reveal">
      <div class="review-card__quote">"</div>
      <p class="review-card__body">${review.content}</p>
      <div class="review-card__footer">
        <div class="review-card__avatar">${review.avatar}</div>
        <div><p class="review-card__name">${review.name}</p><p class="review-card__course">${review.course}</p></div>
      </div>
    </article>
  `).join('');
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
  const reviewsPlaceholder = document.getElementById('reviews-placeholder');
  
  if (navPlaceholder)    navPlaceholder.outerHTML    = buildNavbar();
  if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter();
  if (reviewsPlaceholder) reviewsPlaceholder.innerHTML = buildReviews();

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
