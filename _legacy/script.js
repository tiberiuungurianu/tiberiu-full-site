const topbar = document.querySelector('.topbar');
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const year = document.getElementById('year');
const toTop = document.getElementById('toTop');
const hero = document.querySelector('.hero');
const heroMedia = document.querySelector('.hero-media');
const heroImg = document.querySelector('.hero-media img');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = matchMedia('(pointer: coarse), (hover: none)').matches;
const canHeroMotion = !reduceMotion && !coarsePointer;

let lastFocus = null;
let closeTimer = null;

if (year) year.textContent = String(new Date().getFullYear());

function menuLinks() {
  return menu ? Array.from(menu.querySelectorAll('a, button')) : [];
}

function isOpen() {
  return menuBtn && menuBtn.getAttribute('aria-expanded') === 'true';
}

function openMenu() {
  if (!menu || !menuBtn) return;
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  lastFocus = document.activeElement;
  menu.hidden = false;
  requestAnimationFrame(() => menu.classList.add('is-open'));
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.textContent = 'Close';
  document.body.style.overflow = 'hidden';
  topbar?.setAttribute('data-theme', 'dark');

  const first = menuLinks()[0];
  if (first) first.focus({ preventScroll: true });
}

function closeMenu() {
  if (!menu || !menuBtn || !isOpen()) return;

  menu.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = 'Menu';
  document.body.style.overflow = '';

  closeTimer = window.setTimeout(() => {
    if (!menu.classList.contains('is-open')) menu.hidden = true;
    closeTimer = null;
  }, reduceMotion ? 0 : 380);

  if (lastFocus && typeof lastFocus.focus === 'function') {
    lastFocus.focus({ preventScroll: true });
  } else {
    menuBtn.focus({ preventScroll: true });
  }

  updateScrollUI();
}

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  document.querySelector('.brand')?.addEventListener('click', () => {
    if (isOpen()) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key !== 'Tab') return;

    const links = menuLinks();
    if (!links.length) return;

    const first = links[0];
    const last = links[links.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || active === menuBtn)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      menuBtn.focus();
    }
  });
}

if (canHeroMotion) {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

document.querySelectorAll('img').forEach((img) => {
  const show = () => {
    img.classList.add('is-loaded');
    if (img === heroImg && canHeroMotion) {
      window.setTimeout(() => {
        heroImg.style.transition = 'opacity 0.45s linear, transform 0.01ms linear';
        updateHeroMotion();
      }, 1500);
    }
  };
  if (img.complete && img.naturalWidth) show();
  else img.addEventListener('load', show, { once: true });
});

function updateTopbarTheme() {
  if (!topbar) return;
  if (isOpen()) {
    topbar.setAttribute('data-theme', 'dark');
    return;
  }

  topbar.setAttribute('data-theme', themeAtY(28));
}

function themeAtY(probeY) {
  const sections = document.querySelectorAll('main [data-theme]');
  let theme = 'dark';

  for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= probeY && box.bottom >= probeY) {
      theme = section.getAttribute('data-theme') || 'dark';
      break;
    }
  }

  return theme;
}

function updateToTop() {
  if (!toTop) return;
  const show = window.scrollY > (window.innerHeight * 0.7);
  toTop.classList.toggle('is-visible', show);

  const probeY = window.innerHeight - 40;
  toTop.setAttribute('data-theme', themeAtY(probeY));
}

function updateHeroMotion() {
  if (!hero || !heroImg) return;

  const rect = hero.getBoundingClientRect();
  const view = window.innerHeight || 1;
  if (rect.bottom <= 0 || rect.top >= view) {
    if (heroMedia) heroMedia.style.opacity = '0';
    return;
  }

  const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
  const fade = 1 - progress * 1.15;
  if (heroMedia) heroMedia.style.opacity = String(Math.max(0, fade));

  if (!canHeroMotion || !heroImg.classList.contains('is-loaded')) return;

  const shift = progress * 10;
  const zoom = 1.02 + progress * 0.04;
  heroImg.style.transform = `scale(${zoom}) translate3d(0, ${shift}%, 0)`;
}

let ticking = false;
function updateScrollUI() {
  updateTopbarTheme();
  updateHeroMotion();
  updateToTop();
  ticking = false;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScrollUI);
}

if (toTop) {
  toTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', () => requestAnimationFrame(updateScrollUI));
updateScrollUI();

function externalAnchor(href, label) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.textContent = label;
  return anchor;
}

function applyLinks(data) {
  const links = Array.isArray(data.links) ? data.links.filter((link) => link && link.href && link.label) : [];

  const menuLinks = document.querySelector('.menu-links');
  if (menuLinks) {
    const items = links.map((link) => {
      const anchor = externalAnchor(link.href, '');
      const label = document.createElement('span');
      label.textContent = link.label;
      const detail = document.createElement('span');
      detail.textContent = link.detail || '';
      anchor.replaceChildren(label, detail);
      return anchor;
    });
    menuLinks.replaceChildren(...items);
  }

  const heroSocial = document.querySelector('.hero-social');
  if (heroSocial) {
    heroSocial.replaceChildren(
      ...links.filter((link) => link.hero).map((link) => externalAnchor(link.href, link.label))
    );
  }

  const verifiedItem = document.querySelector('[data-verified]');
  const verified = links.find((link) => link.verified);
  if (verifiedItem) {
    const slot = verifiedItem.querySelector('strong');
    if (verified && slot) {
      const anchor = externalAnchor(verified.href, verified.label);
      anchor.classList.add('quiet-link');
      slot.replaceChildren(anchor);
      verifiedItem.hidden = false;
    } else {
      verifiedItem.hidden = true;
    }
  }

  const email = document.querySelector('.email');
  if (email && data.email && data.email.href) {
    email.href = data.email.href;
    email.textContent = data.email.label || data.email.href.replace(/^mailto:/, '');
  }

  const structured = document.querySelector('script[type="application/ld+json"]');
  if (!structured) return;

  try {
    const graph = JSON.parse(structured.textContent);
    const person = graph['@graph']?.find((node) => node['@type'] === 'Person');
    if (!person) return;
    person.sameAs = links.map((link) => link.href);
    structured.textContent = JSON.stringify(graph);
  } catch {
    /* leave the structured data as published */
  }
}

fetch('./links.json', { cache: 'no-cache' })
  .then((response) => {
    if (!response.ok) throw new Error('links.json unavailable');
    return response.json();
  })
  .then(applyLinks)
  .catch(() => {});
