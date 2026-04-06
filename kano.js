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
    nav_about:      'ABOUT',
    nav_epher:      'MANIFESTO',
    nav_services:   'SERVICES',
    nav_process:    'PROCESS',
    nav_contact:    'CONTACT',

    scroll:         'SCROLL',

    srv_title:      'What we do',
    srv_sub:        'AI solutions built for real business needs.',
    srv1_title:     'DEVELOPMENT',
    srv1_desc:      'We build functional systems and services based on modern technologies, tailored to a specific request or task.',
    srv2_title:     'INTEGRATION',
    srv2_desc:      'We embed products and solutions into existing business processes, optimising workflows and delivering results.',
    srv3_title:     'EDUCATION',
    srv3_desc:      'We train and consult on all aspects of AI and business adaptation for its implementation.',
    srv4_title:     'SUPPORT',
    srv4_desc:      'We maintain and support delivered solutions during the first months after deployment.',

    proc_title:     'How we work',
    proc_sub:       'Transparency at every step.',
    proc1_title:    'DISCOVERY',
    proc1_desc:     'We listen carefully to the client, study the specifics of the business, and gather all necessary information.',
    proc2_title:    'STRATEGY',
    proc2_desc:     'Within 1–2 weeks we prepare a project plan, conduct additional research, flag risks, and outline the system architecture. Every stage and every nuance is communicated to the client in full.',
    proc3_title:    'DEVELOPMENT',
    proc3_desc:     'We get to work and move according to the plan. If nuances arise along the way - and they usually do - we adapt. We take full responsibility for the entire implementation process.',
    proc4_title:    'EDUCATION',
    proc4_desc:     'We provide support for the solution after delivery. Duration depends on the project.',
    proc5_title:    'EVOLUTION',
    proc5_desc:     'AI systems improve over time. We provide ongoing support, monitoring, and optimisation to ensure continued alignment with your goals.',

    about_title:    'A small studio with a large mission',
    about_desc1:    'We are a boutique technology studio focused on developing and integrating AI into existing businesses and industries.',
    about_desc2:    'Kano Studio grew from a belief that technology can genuinely serve the world and humanity. In an era of rapid technological change, people and industries are struggling to keep pace. We take on the mission of making technology - and AI in particular - accessible to people and useful for business.',
    about_quote:    '"Preserving the sovereignty of human work,\nand moving toward the principle of do more with less."',
    values_title:   'OUR VALUES',
    val1_title:     'ETHICS FIRST',
    val1_desc:      'Every solution considers its impact on users, society, and the environment. We refuse projects that conflict with our ethical standards.',
    val2_title:     'TRANSPARENCY',
    val2_desc:      'We believe in explainable AI and open communication. Our clients understand not just what we build, but how and why.',
    val3_title:     'HUMAN-CENTERED',
    val3_desc:      'Technology should augment human capabilities, not replace human judgment. We design AI that empowers people.',
    val4_title:     'CONTINUOUS LEARNING',
    val4_desc:      'The AI landscape evolves rapidly. We stay at the forefront while maintaining our commitment to responsible innovation.',

    epher_name:     'EPHER AI',
    epher_count:    'MANIFESTO',
    epher_title:    'do more<br>with less',
    epher_p1:       'Business is a system. Every system has an output. Any system can be made more complex or more simple. Any output can be made worse or better.',
    epher_p2:       'Ephemeralization - a term coined by Buckminster Fuller - describes the ability of technological progress to do more and more with less and less, until eventually almost everything can be done with almost nothing.',
    epher_p3:       'We adapted this term to modern AI and created the <em>Epher AI</em> approach - a continuous drive to simplify the system while improving the result.',

    contact_title:  'Tell us about your project',
    form_email:     'EMAIL',
    form_company:   'COMPANY',
    form_msg:       'MESSAGE',
    form_send:      'SEND →',

    footer_desc:    'An indie AI studio building ethical solutions for businesses who believe technology should serve humanity.',
    footer_rights:  'ALL RIGHTS RESERVED',
  },

  ru: {
    nav_about:      'О НАС',
    nav_epher:      'МАНИФЕСТ',
    nav_services:   'СЕРВИСЫ',
    nav_process:    'ПРОЦЕСС',
    nav_contact:    'КОНТАКТЫ',

    scroll:         'SCROLL',

    srv_title:      'Что мы делаем',
    srv_sub:        '',
    srv1_title:     'РАЗРАБОТКА',
    srv1_desc:      'Создаём работающие системы и сервисы на базе современных технологий под конкретный запрос или задачу.',
    srv2_title:     'ВНЕДРЕНИЕ',
    srv2_desc:      'Внедряем продукты и решения в существующие бизнес-процессы, оптимизируя воркфлоу и работая на результат.',
    srv3_title:     'ОБУЧЕНИЕ',
    srv3_desc:      'Обучаем и консультируем по всем аспектам AI и адаптации бизнеса под его внедрение.',
    srv4_title:     'ПОДДЕРЖКА',
    srv4_desc:      'Поддерживаем и сопровождаем созданные решения в первые месяцы после внедрения.',

    proc_title:     'Как мы работаем',
    proc_sub:       'Работа с нами разделяется на несколько верхнеуровневых этапов:',
    proc1_title:    'DISCOVERY',
    proc1_desc:     'В первую очередь мы внимательно выслушиваем вас и ваши потребности, изучаем специфику бизнеса и собираем всю необходимую информацию.',
    proc2_title:    'STRATEGY',
    proc2_desc:     'В течение 1–2 недель готовим план проекта, проводим дополнительные исследования, отмечаем риски, описываем архитектуру системы. Каждый этап и каждый нюанс описываем вам в полной мере.',
    proc3_title:    'DEVELOPMENT',
    proc3_desc:     'Беремся за работу и движемся по плану. Если в процессе возникают нюансы (а они как правило возникают) - адаптируемся. Постоянно ведем с вами обратную связь и итеративно внедряем наработки. Берём на себя ответственность за весь процесс реализации и внедрения.',
    proc4_title:    'EDUCATION',
    proc4_desc:     'Мы предоставляем вам все необходимые материалы, кодовые базы, документации и знания для работы с решением после его реализации. Мы также проводим обучение и передаем знания всем вашим коллегам, кому это необходимо.',
    proc5_title:    'EVOLUTION',
    proc5_desc:     'Мы на связи даже после завершения проекта. Поддержка осуществляется в оговоренном порядке в зависимости от специфики проекта.',


    about_title:    'О нас',
    about_desc1:    'Мы - небольшая технологическая студия, занимающаяся разработкой AI проектов и последующим их внедрением в существующие бизнесы и направления.',
    about_desc2:    'Наша студия выросла из идеи, что технологии в действительности могут и должны служить миру и человечеству. В связи с быстрым развитием технологий в современном мире человек и индустрия просто не успевает за ними. Мы берём на себя миссию сделать технологии, и в первую очередь ИИ, доступными для человека и полезными для бизнеса.',
    about_quote:    '«Сохранив суверенитет человеческого труда\nи двигаясь к принципу do more with less.»',

    epher_name:     'EPHER AI',
    epher_count:    'МАНИФЕСТ',
    epher_title:    'do more with less',
    epher_p1:       'Бизнес - это система. У любой системы есть результат. Любую систему можно усложнить, а можно упростить. Любой результат можно ухудшить, а можно улучшить.',
    epher_p2:       'Эфемерализация - термин, придуманный Бакминстером Фуллером, описывающий способность технологического прогресса делать всё больше и больше с меньшим количеством ресурсов, пока в конечном итоге можно будет делать практически всё из ничего.',
    epher_p3:       'Мы адаптировали этот термин к современному AI и создали подход <em>Epher AI</em> - непрерывное стремление к упрощению системы параллельно с улучшением результата.',

    contact_title:  'Расскажите нам о вашем проекте',
    form_email:     'EMAIL',
    form_company:   'КОМПАНИЯ',
    form_msg:       'СООБЩЕНИЕ',
    form_send:      'ОТПРАВИТЬ →',

    footer_desc:    '',
    footer_rights:  'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
  }
};

// ── State ──────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('kano_lang') || 'en';

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
function handleSubmit(e) {
  e.preventDefault();
  const email   = document.getElementById('emailInput').value.trim();
  const company = document.getElementById('companyInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  const body = [
    company ? `Company: ${company}` : '',
    `From: ${email}`,
    '',
    message,
  ].filter(Boolean).join('\n');

  const mailto = `mailto:eugene.koltsov@protonmail.com`
    + `?subject=${encodeURIComponent('KANO INQUIRY')}`
    + `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  const btn  = document.getElementById('submitBtn');
  const span = btn.querySelector('span');
  span.textContent = currentLang === 'en' ? 'SENT ✓' : 'ОТПРАВЛЕНО ✓';
  btn.disabled = true;
  setTimeout(() => {
    span.dataset.i18n = 'form_send';
    span.textContent = LANG[currentLang].form_send;
    btn.disabled = false;
    e.target.reset();
  }, 3000);
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
