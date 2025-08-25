// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");

hamburger.addEventListener("click", () => {
  menuOverlay.classList.add("active");
});

menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
});


// ===== Custom S Cursor =====
(() => {
  const cursor = document.getElementById('s-cursor');
  if (!cursor) return;

  // Show immediately (no timeout)
  cursor.style.transition = "opacity 0.6s ease";
  cursor.style.opacity = "1";

  // Respect touch / reduced motion early
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduceMotion) {
    document.documentElement.classList.add('no-custom-cursor');
    cursor.style.display = 'none';
    return;
  }

  // Starting positions
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  const ease = 0.18; // smoothing factor (0.1–0.25 feels good)

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  // Animate toward the target
  function raf() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    cursor.style.transform = `translate(${currentX - 0.5 * cursor.offsetWidth}px, ${currentY - 0.5 * cursor.offsetHeight}px)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Press feedback
  window.addEventListener('mousedown', () => {
    document.documentElement.classList.add('cursor-pressed');
  });
  window.addEventListener('mouseup', () => {
    document.documentElement.classList.remove('cursor-pressed');
  });

  // Hover state on interactive controls
  const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .clickable';
  function updateHoverState(e) {
    const el = e.target.closest(interactiveSelectors);
    if (el) {
      document.documentElement.classList.add('cursor-hovering');
    } else {
      document.documentElement.classList.remove('cursor-hovering');
    }
  }
  document.addEventListener('mouseover', updateHoverState, { passive: true });
  document.addEventListener('mouseout', updateHoverState, { passive: true });
})();


// Navbar (show immediately, no timeout)
window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.add("show");
});



// Apply album cover as blurred background
document.querySelectorAll('.album').forEach(album => {
  const img = album.querySelector('.album-cover img');
  if (img) {
    album.style.setProperty('--album-bg', `url('${img.src}')`);
  }
});



