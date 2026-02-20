/* ============================================
   PORTFOLIO SCRIPTS — Backend Developer
   ============================================ */

/* ──────────────────────────────────────────
   1. CUSTOM CURSOR
   Moves a dot + ring that follow the mouse.
   The ring scales up when hovering links/cards.
────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mx = 0, my = 0; // mouse position (instant)
let rx = 0, ry = 0; // ring position  (lagged)

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  // Dot snaps instantly to mouse
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;

  // Ring follows with a smooth lag
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand ring on hover over interactive elements
document.querySelectorAll('a, button, .stack-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width   = '56px';
    cursorRing.style.height  = '56px';
    cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width   = '36px';
    cursorRing.style.height  = '36px';
    cursorRing.style.opacity = '0.5';
  });
});


/* ──────────────────────────────────────────
   2. TYPING ANIMATION
   Cycles through role words in the hero section,
   typing and deleting each one.

   ✏️ CUSTOMISE: Edit the words array below
   to change what gets typed in the hero.
────────────────────────────────────────── */
const words = [
  'Backend Developer.',
  'API Architect.',
  'Python Engineer.',
  'Open to Freelance.',
];

let wordIndex    = 0;  // which word we're on
let charIndex    = 0;  // how many characters typed
let isDeleting   = false;

const typedEl = document.getElementById('typed');

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // Typing forward
    typedEl.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      // Finished deleting — move to next word
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 60 : 100);
}

typeLoop();


/* ──────────────────────────────────────────
   3. SCROLL REVEAL
   Elements with class="reveal" fade + slide up
   when they enter the viewport.
────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each visible element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));