const menu = document.getElementById('menu');
const menuTrigger = document.getElementById('menuTrigger');
const progress = document.getElementById('progress');

function setMenu(open) {
  menu.classList.toggle('open', open);
  menuTrigger.setAttribute('aria-expanded', String(open));
  menuTrigger.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
}

menuTrigger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
reveals.forEach(el => observer.observe(el));

document.querySelectorAll('img').forEach(img => {
  const show = () => img.classList.add('is-loaded');
  if (img.complete && img.naturalWidth) show();
  else img.addEventListener('load', show, { once: true });
});

const coarsePointer = matchMedia('(pointer: coarse), (hover: none)').matches;

function updateProgress() {
  if (!progress || coarsePointer) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  progress.style.transform = `scaleX(${ratio})`;
}

const topbar = document.querySelector('.topbar');
const lightSections = document.querySelectorAll('.about, .links-section');
function updateTopbar() {
  const probe = 28;
  let onLight = false;
  for (const section of lightSections) {
    const box = section.getBoundingClientRect();
    if (box.top <= probe && box.bottom >= probe) {
      onLight = true;
      break;
    }
  }
  topbar.classList.toggle('on-light', onLight);
}

let scrollTicking = false;
function updateScrollUI() {
  updateProgress();
  updateTopbar();
  scrollTicking = false;
}

addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, { passive: true });
addEventListener('resize', () => requestAnimationFrame(updateScrollUI));
updateScrollUI();

function externalAnchor(href, className) {
  const anchor = document.createElement('a');
  anchor.className = className;
  anchor.href = href;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  return anchor;
}

function applyLinks(data) {
  const links = Array.isArray(data.links) ? data.links.filter((link) => link && link.href && link.label) : [];
  const shown = links.filter((link) => link.visible !== false);

  const hero = document.querySelector('.hero-actions');
  if (hero) {
    hero.replaceChildren(...shown.filter((link) => link.hero).map((link) => {
      const anchor = externalAnchor(link.href, 'pill');
      anchor.setAttribute('aria-label', [link.label, link.detail].filter(Boolean).join(' '));
      const name = document.createElement('span');
      name.textContent = link.label;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      anchor.append(name, arrow);
      return anchor;
    }));
  }

  const stack = document.querySelector('.link-stack');
  if (stack) {
    stack.replaceChildren(...shown.filter((link) => !link.hero).map((link) => {
      const anchor = externalAnchor(link.href, 'big-link');
      const name = document.createElement('span');
      name.textContent = link.label;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      anchor.append(name, arrow);
      if (link.detail) {
        const note = document.createElement('span');
        note.className = 'visually-hidden';
        note.textContent = link.detail;
        anchor.append(note);
      }
      return anchor;
    }));
  }

  const email = document.querySelector('.contact-email');
  if (email && data.email && data.email.href) {
    email.href = data.email.href;
    const label = data.email.label || data.email.href.replace(/^mailto:/, '');
    const at = label.indexOf('@');
    if (at > 0) {
      email.replaceChildren(
        document.createTextNode(label.slice(0, at)),
        document.createElement('br'),
        document.createTextNode(label.slice(at))
      );
    } else {
      email.textContent = label;
    }
  }

  const structured = document.querySelector('script[type="application/ld+json"]');
  if (!structured) return;

  try {
    const graph = JSON.parse(structured.textContent);
    const person = graph['@graph']?.find((node) => node['@type'] === 'Person');
    if (!person) return;
    person.sameAs = links.filter((link) => link.sameAs !== false).map((link) => link.href);
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
