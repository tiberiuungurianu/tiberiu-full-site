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
