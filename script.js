
/* ============================
   STICKY NAVBAR
============================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ============================
   HAMBURGER MENU
============================ */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ============================
   SCROLL-TRIGGERED FADE-IN
============================ */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // animate once only
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Trigger hero section animations immediately on load
document.querySelectorAll('#hero .fade-in').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 80 + 100);
});

/* ============================
   SCROLL SPY — ACTIVE NAV LINK
============================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const scrollSpy = () => {
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.style.color = href === `#${current}` ? 'var(--accent)' : '';
  });
};

window.addEventListener('scroll', scrollSpy, { passive: true });

/* ============================
   CONTACT FORM
============================ */
function handleFormSubmit() {
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusEl     = document.getElementById('form-status');
  const btn          = document.getElementById('send-btn');

  const name    = nameInput.value.trim();
  const email   = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Clear previous status
  statusEl.className = 'form-status';
  statusEl.textContent = '';

  // Validate fields
  if (!name || !email || !message) {
    statusEl.className = 'form-status error';
    statusEl.textContent = 'Please fill in all fields before sending.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    statusEl.className = 'form-status error';
    statusEl.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate sending
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    statusEl.className = 'form-status success';
    statusEl.textContent = '✓ Message sent! I\'ll be in touch soon.';

    // Reset form
    nameInput.value    = '';
    emailInput.value   = '';
    messageInput.value = '';

    // Restore button
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Send Message
    `;
  }, 1400);
}
