/**
 * Portfolio – main.js
 * Handles: Mobile menu · Active nav · Skill bars · Scroll-reveal
 *           Project filters · Timeline tabs · Form validation · Year
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Debounce utility */
function debounce(fn, wait = 100) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/* ═══════════════════════════════════════════════════════════
   1. MOBILE NAVIGATION
═══════════════════════════════════════════════════════════ */
const hamburgerBtn  = $('#hamburger-btn');
const mobileMenu    = $('#mobile-menu');
const closeBtn      = $('#mobile-close-btn');
const backdrop      = $('#mobile-backdrop');
const mobileLinks   = $$('.mobile-menu__link');

let menuOpen = false;

function openMenu() {
  menuOpen = true;
  mobileMenu.classList.add('open');
  backdrop.classList.add('visible');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // prevent background scroll
  trapFocus(mobileMenu);
}

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  backdrop.classList.remove('visible');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  hamburgerBtn.focus();
}

function toggleMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  menuOpen ? closeMenu() : openMenu();
}

hamburgerBtn.addEventListener('click', toggleMenu);

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeMenu();
});

backdrop.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeMenu();
});

// Close on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) closeMenu();
});

/* Focus trap for accessibility */
function trapFocus(el) {
  const focusable = el.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  el.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
    if (!menuOpen) el.removeEventListener('keydown', handler);
  });

  first?.focus();
}

/* ═══════════════════════════════════════════════════════════
   2. STICKY HEADER + ACTIVE NAV LINK
═══════════════════════════════════════════════════════════ */
const header   = $('#site-header');
const navLinks = $$('.nav__link');
const sections = $$('section[id]');

function updateNav() {
  // Scrolled class
  header.classList.toggle('scrolled', window.scrollY > 20);

  // Active section detection
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

window.addEventListener('scroll', debounce(updateNav, 50), { passive: true });
updateNav();

/* ═══════════════════════════════════════════════════════════
   3. SCROLL-REVEAL (IntersectionObserver)
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

// Auto-mark elements in sections for reveal
function setupReveal() {
  const targets = $$([
    '.about__content',
    '.skills__card',
    '.project-card',
    '.testimonial-card',
    '.timeline__item',
    '.contact__info-card',
    '.contact__form',
    '.section-header',
  ].join(', '));

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within the same parent
    const siblings = [...el.parentElement.children];
    const idx = siblings.indexOf(el);
    if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 3)}`);
    revealObserver.observe(el);
  });
}

setupReveal();

/* ═══════════════════════════════════════════════════════════
   4. SKILL BAR ANIMATION
═══════════════════════════════════════════════════════════ */
const skillFills = $$('.skill-item__fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger the fills within the card
        const card  = entry.target.closest('.skills__card');
        const fills = card ? [...card.querySelectorAll('.skill-item__fill')] : [entry.target];
        fills.forEach((fill, i) => {
          setTimeout(() => fill.classList.add('animated'), i * 150);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

$$('.skills__card').forEach(card => {
  const firstFill = card.querySelector('.skill-item__fill');
  if (firstFill) skillObserver.observe(firstFill);
});

/* ═══════════════════════════════════════════════════════════
   5. PROJECT FILTERS
═══════════════════════════════════════════════════════════ */
const filterBtns   = $$('.filter-btn');
const projectCards = $$('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button state
    filterBtns.forEach(b => {
      b.classList.remove('filter-btn--active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('filter-btn--active');
    btn.setAttribute('aria-selected', 'true');

    // Filter cards with animation
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'fade-in .3s ease both';
      } else {
        card.classList.add('hidden');
      }
    });

    // Rebalance featured card span on filter
    const featured = $('.project-card--featured:not(.hidden)');
    if (featured) {
      const visibleCount = projectCards.filter(c => !c.classList.contains('hidden')).length;
      featured.style.gridColumn = visibleCount > 1 ? '' : 'span 1';
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   6. TIMELINE TABS
═══════════════════════════════════════════════════════════ */
const timelineTabs   = $$('.timeline__tab');
const timelinePanels = $$('.timeline__panel');

timelineTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    timelineTabs.forEach(t => {
      t.classList.remove('timeline__tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('timeline__tab--active');
    tab.setAttribute('aria-selected', 'true');

    timelinePanels.forEach(panel => {
      const isTarget = panel.id === `tab-${target}`;
      panel.classList.toggle('timeline__panel--hidden', !isTarget);
    });

    // Re-observe newly visible items for reveal
    const activePanel = $(`#tab-${target}`);
    if (activePanel) {
      $$('.timeline__item', activePanel).forEach(item => {
        item.classList.remove('visible');
        revealObserver.observe(item);
      });
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   7. CONTACT FORM VALIDATION & SUBMISSION
═══════════════════════════════════════════════════════════ */
const contactForm = $('#contact-form');
const submitBtn   = $('#submit-btn');
const btnText     = $('#btn-text');
const btnLoading  = $('#btn-loading');
const formSuccess = $('#form-success');

const fields = {
  name:    { el: $('#contact-name'),    err: $('#name-error'),    validate: v => v.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 chars).' },
  email:   { el: $('#contact-email'),   err: $('#email-error'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.' },
  subject: { el: $('#contact-subject'), err: $('#subject-error'), validate: v => v.trim().length >= 3 ? '' : 'Subject must be at least 3 characters.' },
  message: { el: $('#contact-message'), err: $('#message-error'), validate: v => v.trim().length >= 20 ? '' : 'Message must be at least 20 characters.' },
};

function validateField(key) {
  const { el, err, validate } = fields[key];
  const msg = validate(el.value);
  err.textContent = msg;
  el.classList.toggle('error', !!msg);
  return !msg;
}

// Live validation on blur
Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
  fields[key].el.addEventListener('input', () => {
    if (fields[key].el.classList.contains('error')) validateField(key);
  });
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const isValid = Object.keys(fields).map(validateField).every(Boolean);
  if (!isValid) {
    // Focus first invalid field
    const firstInvalid = Object.values(fields).find(f => f.el.classList.contains('error'));
    firstInvalid?.el.focus();
    return;
  }

  // Simulate async submission
  submitBtn.disabled = true;
  btnText.hidden     = true;
  btnLoading.hidden  = false;

  await new Promise(res => setTimeout(res, 1800)); // Simulate network

  submitBtn.disabled = false;
  btnText.hidden     = false;
  btnLoading.hidden  = true;

  formSuccess.hidden = false;
  contactForm.reset();
  Object.values(fields).forEach(f => f.el.classList.remove('error'));

  // Hide success after 5 seconds
  setTimeout(() => { formSuccess.hidden = true; }, 5000);
});

/* ═══════════════════════════════════════════════════════════
   8. FOOTER YEAR
═══════════════════════════════════════════════════════════ */
const yearEl = $('#footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════════
   9. SMOOTH SCROLL POLYFILL (for older Safari)
═══════════════════════════════════════════════════════════ */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ═══════════════════════════════════════════════════════════
   10. KEYBOARD & OUTSIDE CLICK NAVIGATION
═══════════════════════════════════════════════════════════ */
document.addEventListener('click', (e) => {
  if (menuOpen && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    closeMenu();
  }
});

/* ═══════════════════════════════════════════════════════════
   11. NAV LOGO MARK — hover sparkle effect
═══════════════════════════════════════════════════════════ */
const logoMark = $('.nav__logo-mark');
if (logoMark) {
  logoMark.addEventListener('mouseenter', () => {
    logoMark.style.transform = 'rotate(-8deg) scale(1.1)';
    logoMark.style.transition = 'transform .2s cubic-bezier(0.34,1.56,0.64,1)';
  });
  logoMark.addEventListener('mouseleave', () => {
    logoMark.style.transform = '';
  });
}

/* ═══════════════════════════════════════════════════════════
   12. HERO PARALLAX (subtle, reduced on mobile)
═══════════════════════════════════════════════════════════ */
const orb1 = $('.hero__orb--1');
const orb2 = $('.hero__orb--2');

if (window.matchMedia('(min-width: 769px)').matches) {
  window.addEventListener('mousemove', debounce((e) => {
    const { clientX: x, clientY: y } = e;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    if (orb1) orb1.style.transform = `translate(${dx * 20}px, ${dy * 15}px)`;
    if (orb2) orb2.style.transform = `translate(${dx * -15}px, ${dy * -10}px)`;
  }, 16), { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   13. TECH BUBBLE RIPPLE
═══════════════════════════════════════════════════════════ */
$$('.tech-bubble').forEach(bubble => {
  bubble.addEventListener('click', function () {
    this.style.transform = 'scale(.92)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

console.log('%c👋 Ehtesham Rashid · Portfolio', 'font-size:1.1rem;font-weight:bold;color:#6366f1;');
console.log('%cBuilt with semantic HTML5 · CSS Grid/Flexbox · Vanilla JS', 'color:#94a3b8;');
