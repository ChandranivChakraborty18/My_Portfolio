/* =============================================
   CHANDRANIV CHAKRABORTY — script.js
   Particles · Typed · AOS · Navbar · Orbital
   ============================================= */

// ── AOS Init ──
AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 60 });

// ── Typed.js ──
new Typed('#typed', {
  strings: [
    'Python Developer',
    'AI/ML Enthusiast',
    'Backend Developer',
    'DSA Problem Solver',
    'Full-Time Learner'
  ],
  typeSpeed: 65,
  backSpeed: 38,
  backDelay: 1800,
  startDelay: 400,
  loop: true,
  smartBackspace: true
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger / Mobile nav ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }
});

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#2563eb';
    }
  });
}, { threshold: 0.35, rootMargin: '-68px 0px 0px 0px' });

sections.forEach(s => io.observe(s));

// ── Hero entrance animation ──
window.addEventListener('load', () => {
  const els = document.querySelectorAll('.avail-badge,.hi-line,.hero-name,.typed-row,.hero-desc,.hero-divider,.hero-stats,.hero-btns,.orbital-scene');
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .55s ease ${.1 + i * .08}s, transform .55s ease ${.1 + i * .08}s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80);
    });
  });
});

// ── Particle canvas ──
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Small light-lavender/blue dots like in the screenshots
  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 2 + 1;
      this.vx = (Math.random() - .5) * .3;
      this.vy = -(Math.random() * .4 + .15);
      this.alpha = Math.random() * 0.35 + 0.08;
      const palette = ['#93c5fd','#bfdbfe','#fde68a','#c4b5fd','#a5f3fc'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── Counter animation for hero stats ──
function animateCount(el) {
  const text  = el.textContent.trim();
  const match = text.match(/([\d.]+)(.*)/);
  if (!match) return;

  const target  = parseFloat(match[1]);
  const suffix  = match[2];
  const decimal = match[1].includes('.');
  const dur     = 1200;
  const start   = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const cur   = eased * target;
    el.textContent = (decimal ? cur.toFixed(2) : Math.floor(cur)) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  }
  requestAnimationFrame(tick);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: .8 });

document.querySelectorAll('.stat-n').forEach(el => statsObs.observe(el));

// ── SGPA bar animation ──
const sgpaObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.style.getPropertyValue('--w') || '0%';
      sgpaObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('.sgpa-bar').forEach(b => {
  b.style.width = '0%';
  sgpaObs.observe(b);
});
