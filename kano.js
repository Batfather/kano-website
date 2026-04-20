/* ═══════════════════════════════════════════════════════════════════════════
   KANO.STUDIO - vanilla JS
   · Session ID generator
   · EN / RU language toggle
   · Scroll fade-in
   · Mobile nav
   · Footer year
   ═══════════════════════════════════════════════════════════════════════════ */

// ── i18n strings ───────────────────────────────────────────────────────────
const LANG = {
  en: {
    nav_about:      'ABOUT US',
    nav_epher:      'MANIFESTO',
    nav_services:   'SERVICES',
    nav_process:    'PROCESS',
    nav_contact:    'CONTACT',

    scroll:         'SCROLL',

    srv_title:      'Services',
    srv_sub:        '',
    srv1_title:     'DEVELOPMENT',
    srv1_desc:      'Building functional systems and services using modern technologies, tailored to a specific request or task.',
    srv2_title:     'INTEGRATION',
    srv2_desc:      'Embedding products and solutions into existing business processes, optimising workflows and delivering results.',
    srv3_title:     'EDUCATION',
    srv3_desc:      'Training and consultation on all aspects of AI and business adaptation.',
    srv4_title:     'SUPPORT',
    srv4_desc:      'Supporting and maintaining delivered solutions in the first months after deployment.',

    proc_title:     'Process',
    proc_sub:       'Working with me is divided into several high-level stages:',
    proc1_title:    'DISCOVERY',
    proc1_desc:     'I carefully study your request, the specifics of your business, and gather all the necessary information.',
    proc2_title:    'STRATEGY',
    proc2_desc:     'Within 1–2 weeks I prepare a detailed project plan, conduct additional research, identify risks, and outline the solution architecture. All key points are discussed openly.',
    proc3_title:    'DEVELOPMENT',
    proc3_desc:     'I get to work and move according to the plan. If nuances arise along the way — and they usually do — I adapt. I maintain constant feedback with you and iteratively deliver progress. I take full responsibility for the entire implementation and deployment process.',
    proc4_title:    'EDUCATION',
    proc4_desc:     'I will provide you with all necessary materials, codebases, documentation, and knowledge to work with the solution after its completion. I also conduct training and transfer knowledge to all colleagues who need it.',
    proc5_title:    'EVOLUTION',
    proc5_desc:     'I remain available even after the project is complete. Support is provided in an agreed manner depending on the specifics of the project.',

    about_title:    'About',
    about_desc1:    'Kano Studio is a one-person project.',
    about_desc2:    'I founded it in 2025, driven by the belief that technology can and should genuinely serve the world and humanity. In an era of rapid technological change, people and industries often struggle to keep pace. My mission is to make technology — and AI in particular — accessible to people and useful for business.',
    about_desc3:    'In my work I use a network of AI agents I designed myself to deliver projects of any complexity.',
    about_quote:    'Preserving the sovereignty of human work, and moving toward the principle of do more with less.',

    epher_name:     'EPHER AI',
    epher_count:    'MANIFESTO',
    epher_title:    'do more<br>with less',
    epher_p1:       'Business is a system. Every system has an output. Any system can be made more complex or more simple. Any output can be made worse or better.',
    epher_p2:       'Ephemeralization - a term coined by Buckminster Fuller - describes the ability of technological progress to do more and more with less and less, until eventually almost everything can be done with almost nothing.',
    epher_p3:       'I adapted this term to modern AI and created the <em>Epher AI</em> approach - a continuous drive to simplify the system while improving the result.',

    contact_title:  'Tell about your project',
    form_email:     'EMAIL',
    form_company:   'COMPANY',
    form_msg:       'MESSAGE',
    form_send:      'SEND →',

    footer_desc:    'An indie AI studio building ethical solutions for businesses who believe technology should serve humanity.',
    footer_rights:  'ALL RIGHTS RESERVED',
  },

  ru: {
    nav_about:      'О СТУДИИ',
    nav_epher:      'МАНИФЕСТ',
    nav_services:   'СЕРВИСЫ',
    nav_process:    'ПРОЦЕСС',
    nav_contact:    'КОНТАКТЫ',

    scroll:         'SCROLL',

    srv_title:      'Услуги',
    srv_sub:        '',
    srv1_title:     'РАЗРАБОТКА',
    srv1_desc:      'Создание работающих систем и сервисов на базе современных технологий под конкретный запрос или задачу.',
    srv2_title:     'ВНЕДРЕНИЕ',
    srv2_desc:      'Внедрение продуктов и решений в существующие бизнес-процессы, оптимизируя воркфлоу и работая на результат.',
    srv3_title:     'ОБУЧЕНИЕ',
    srv3_desc:      'Обучение и консультация по всем аспектам AI и адаптации бизнеса под его внедрение.',
    srv4_title:     'ПОДДЕРЖКА',
    srv4_desc:      'Поддержка и сопровождение созданных решений в первые месяцы после внедрения.',

    proc_title:     'Процесс',
    proc_sub:       'Наше с вами взаимодействие разделяется на несколько верхнеуровневых этапов:',
    proc1_title:    'DISCOVERY',
    proc1_desc:     'Внимательно изучаю ваш запрос, специфику бизнеса и собираю всю необходимую информацию.',
    proc2_title:    'STRATEGY',
    proc2_desc:     'В течение 1-2 недель готовлю детальный план проекта, провожу дополнительные исследования, выявляю риски и описываю подробную архитектуру решения. Все ключевые моменты обсуждаю открыто.',
    proc3_title:    'DEVELOPMENT',
    proc3_desc:     'Берусь за работу и движусь по плану. Если в процессе возникают нюансы (а они как правило возникают) - адаптируюсь. Постоянно веду с вами обратную связь и итеративно внедряю наработки. Беру на себя ответственность за весь процесс реализации и внедрения.',
    proc4_title:    'EDUCATION',
    proc4_desc:     'Я предоставлю вам все необходимые материалы, кодовые базы, документации и знания для работы с решением после его реализации. Также провожу обучение и передаю знания всем вашим коллегам, кому это необходимо.',
    proc5_title:    'EVOLUTION',
    proc5_desc:     'Я на связи даже после завершения проекта. Поддержка осуществляется в оговоренном порядке в зависимости от специфики проекта.',


    about_title:    'О студии',
    about_desc1:    'Kano Studio - это проект одного человека.',
    about_desc2:    'Я основал его в 2025 году, основываясь на идее, что технологии в действительности могут и должны служить миру и человечеству. В связи со стремительным их развитием в современном мире человек и индустрия зачастую не успевают за ними. Моя миссия состоит в том, чтобы сделать их - технологии, и в первую очередь ИИ - доступными для человека и полезными для бизнеса.',
    about_desc3:    'В своей работе я использую спроектированную мной сеть ИИ-агентов для реализации проектов любой сложности.',
    about_quote:    'Сохраняя суверенитет человеческого труда и двигаясь к принципу do more with less.',

    epher_name:     'EPHER AI',
    epher_count:    'МАНИФЕСТ',
    epher_title:    'do more with less',
    epher_p1:       'Бизнес - это система. У любой системы есть результат. Любую систему можно усложнить, а можно упростить. Любой результат можно ухудшить, а можно улучшить.',
    epher_p2:       'Эфемерализация - термин, придуманный Бакминстером Фуллером, описывающий способность технологического прогресса делать всё больше и больше с меньшим количеством ресурсов, пока в конечном итоге можно будет делать практически всё из ничего.',
    epher_p3:       'Я адаптировал этот термин к современному AI и создал подход <em>Epher AI</em> - непрерывное стремление к упрощению системы параллельно с улучшением результата.',

    contact_title:  'Расскажите о вашем проекте',
    form_email:     'EMAIL',
    form_company:   'КОМПАНИЯ',
    form_msg:       'СООБЩЕНИЕ',
    form_send:      'ОТПРАВИТЬ →',

    footer_desc:    '',
    footer_rights:  'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
  }
};

// ── State ──────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('kano_lang') || 'ru';

// ── Apply translations ─────────────────────────────────────────────────────
function applyLang(lang) {
  const strings = LANG[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) {
      // Preserve line breaks in blockquotes
      if (el.tagName === 'BLOCKQUOTE' || el.tagName === 'P') {
        el.innerHTML = strings[key].replace(/\n/g, '<br>');
      } else {
        el.textContent = strings[key];
      }
    }
  });
  document.documentElement.lang = lang;
  document.getElementById('langToggle').textContent = lang === 'en' ? 'RU' : 'EN';
}

// ── Session ID ─────────────────────────────────────────────────────────────
function genSessionId() {
  const chars = 'abcdef0123456789';
  let id = 'KN-';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id.toUpperCase();
}

// ── Footer year ───────────────────────────────────────────────────────────
document.getElementById('footer-year').textContent =
  '© ' + new Date().getFullYear();

// ── Session ID animation ──────────────────────────────────────────────────
(function animateSessionId() {
  const el = document.getElementById('session-id');
  const finalId = genSessionId();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_·';
  let frame = 0;
  const totalFrames = 22;

  function step() {
    if (frame >= totalFrames) { el.textContent = finalId; return; }
    el.textContent = 'SESSION: ' + Array.from(finalId).map((ch, i) => {
      if (i < frame - 3) return ch;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    frame++;
    setTimeout(step, 55);
  }
  step();
})();

// ── Language toggle ────────────────────────────────────────────────────────
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ru' : 'en';
  localStorage.setItem('kano_lang', currentLang);
  applyLang(currentLang);
});

// ── Mobile nav ────────────────────────────────────────────────────────────
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobile() {
  mobileNav.classList.remove('open');
}

// ── Scroll fade-in ────────────────────────────────────────────────────────
(function initFadeIn() {
  // Tag elements to fade
  const targets = [
    '.service-item',
    '.proc-item',
    '.value-item',
    '.mf-item',
    '.contact-detail',
    '.section-title',
    '.section-subtitle',
    '.about-text p',
    'blockquote',
  ].join(',');

  document.querySelectorAll(targets).forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// ── Contact form ──────────────────────────────────────────────────────────
// Replace FORMSPREE_ID with your form ID from formspree.io (e.g. "xabcdefg")
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqegwnbo';

async function handleSubmit(e) {
  e.preventDefault();
  const email   = document.getElementById('emailInput').value.trim();
  const company = document.getElementById('companyInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  const btn  = document.getElementById('submitBtn');
  const span = btn.querySelector('span');
  btn.disabled = true;
  span.textContent = '...';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, company, message }),
    });

    if (res.ok) {
      span.textContent = currentLang === 'en' ? 'SENT ✓' : 'ОТПРАВЛЕНО ✓';
      setTimeout(() => {
        span.dataset.i18n = 'form_send';
        span.textContent = LANG[currentLang].form_send;
        btn.disabled = false;
        e.target.reset();
      }, 3000);
    } else {
      span.textContent = currentLang === 'en' ? 'ERROR — TRY AGAIN' : 'ОШИБКА — ПОПРОБУЙ ЕЩЁ';
      setTimeout(() => {
        span.dataset.i18n = 'form_send';
        span.textContent = LANG[currentLang].form_send;
        btn.disabled = false;
      }, 3000);
    }
  } catch {
    span.textContent = currentLang === 'en' ? 'ERROR — TRY AGAIN' : 'ОШИБКА — ПОПРОБУЙ ЕЩЁ';
    setTimeout(() => {
      span.dataset.i18n = 'form_send';
      span.textContent = LANG[currentLang].form_send;
      btn.disabled = false;
    }, 3000);
  }
}

// ── Side nav: update active section on scroll ─────────────────────────────
(function initSideNav() {
  const sections = ['hero', 'services', 'process', 'about', 'contact'];
  const items = document.querySelectorAll('.sn-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        items.forEach(el => el.classList.remove('active'));
        const active = document.querySelector(`.sn-item[data-section="${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

// ── Theme toggle ──────────────────────────────────────────────────────────
let currentTheme = localStorage.getItem('kano_theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀' : '☽';
}

document.getElementById('themeToggle').addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('kano_theme', currentTheme);
  applyTheme(currentTheme);
});

// ── Init ──────────────────────────────────────────────────────────────────
applyLang(currentLang);
applyTheme(currentTheme);
