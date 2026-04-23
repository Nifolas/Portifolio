// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.reveal');
    let delay = 0;
    siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
    setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Tech level bars
const levelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target.querySelector('.tech-level-fill');
    if (fill) setTimeout(() => fill.style.width = fill.dataset.width, 200);
    levelObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tech-card').forEach(card => levelObserver.observe(card));

// QR Code
new QRCode(document.getElementById('qr-code'), {
  text: window.location.href,
  width: 180,
  height: 180,
  colorDark: '#0e0e0f',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H
});

