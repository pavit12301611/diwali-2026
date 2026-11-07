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
