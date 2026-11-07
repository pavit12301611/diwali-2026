const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const toast = document.querySelector('#toast');
let toastTimer;

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

const greeting = document.body.dataset.greeting || 'Happy Diwali and Bandi Chhor Divas! May your days be filled with light, hope, courage, compassion, and togetherness. Warm wishes from Pavit Singh and the Psdfolio family. Visit psdfolio.vercel.app';

async function copyGreeting() {
  try {
    await navigator.clipboard.writeText(greeting);
  } catch {
    const field = document.createElement('textarea');
    field.value = greeting;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }
  showToast('Greeting copied — spread a little light!');
}

document.querySelector('#copy-wish')?.addEventListener('click', copyGreeting);
const heroVideo = document.querySelector('.hero__video');
if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}

document.querySelector('#share-wish')?.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Happy Diwali & Bandi Chhor Divas — Psdfolio', text: greeting, url: 'https://psdfolio.vercel.app' });
    } catch (error) {
      if (error.name !== 'AbortError') showToast('Could not open sharing on this device.');
    }
  } else {
    await copyGreeting();
  }
});

/* ---- festive motion layer ---- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.prepend(progress);
let progressTick = false;
function paintProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
  progressTick = false;
}
window.addEventListener('scroll', () => {
  if (!progressTick) { progressTick = true; requestAnimationFrame(paintProgress); }
}, { passive: true });
paintProgress();

function seedSparks(host, count) {
  if (!host || reduceMotion) return;
  const wrap = document.createElement('div');
  wrap.className = 'sparks';
  wrap.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const size = 4 + Math.random() * 9;
    s.style.width = size.toFixed(1) + 'px';
    s.style.height = size.toFixed(1) + 'px';
    s.style.left = (4 + Math.random() * 92).toFixed(1) + '%';
    s.style.top = (18 + Math.random() * 74).toFixed(1) + '%';
    s.style.setProperty('--t', (7 + Math.random() * 8).toFixed(2) + 's');
    s.style.setProperty('--dl', (-Math.random() * 12).toFixed(2) + 's');
    s.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(0) + 'px');
    s.style.setProperty('--o', (0.35 + Math.random() * 0.5).toFixed(2));
    wrap.append(s);
  }
  host.prepend(wrap);
}
seedSparks(document.querySelector('.hero'), 16);
seedSparks(document.querySelector('.site-footer'), 10);

const revealTargets = document.querySelectorAll('.intro > *, .story__media, .story__copy > *, .quote-band > *, .wishes__heading, .wishes__copy > *');
if (!reduceMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
      el.style.setProperty('--d', (siblings.indexOf(el) * 90) + 'ms');
      el.classList.add('is-visible');
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealTargets.forEach((el) => io.observe(el));
}

if (heroVideo && !reduceMotion) {
  let parTick = false;
  const parallax = () => {
    heroVideo.style.transform = 'translate3d(0,' + (window.scrollY * 0.12).toFixed(1) + 'px,0)';
    parTick = false;
  };
  window.addEventListener('scroll', () => {
    if (!parTick) { parTick = true; requestAnimationFrame(parallax); }
  }, { passive: true });
}

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.button, .text-link, .nav__cta');
  if (!btn || reduceMotion) return;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'burst';
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
    const dist = 34 + Math.random() * 40;
    p.style.left = event.clientX + 'px';
    p.style.top = event.clientY + 'px';
    p.style.setProperty('--bx', (Math.cos(angle) * dist).toFixed(0) + 'px');
    p.style.setProperty('--by', (Math.sin(angle) * dist).toFixed(0) + 'px');
    document.body.append(p);
    setTimeout(() => p.remove(), 750);
  }
});
