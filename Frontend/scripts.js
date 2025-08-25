window.addEventListener("load", () => {
  const slides = document.querySelectorAll(".slideshow img");
  const navbar = document.getElementById("navbar");
  const brand = document.querySelector(".brand");
  const leftS = document.querySelector(".r-left");
  const rightS = document.querySelector(".r-right");
  const bottomS = document.querySelector(".r-bottom");
  let current = 0;
  const delay = 200; // speed of flashes

  function showSlide(index) {
    slides[index].classList.add("active");
  }

  function startSlideshow() {
    const interval = setInterval(() => {
      if (current < slides.length) {
        showSlide(current);
        current++;
      } else {
        clearInterval(interval);
        
setTimeout(() => {
  brand.style.opacity = "0";

  // Add class to all S’s simultaneously
  requestAnimationFrame(() => {
    [leftS, rightS, bottomS].forEach(el => el.classList.add("to-center"));
  });

  // After they merge, hide them after 1s
  setTimeout(() => {
    [leftS, rightS, bottomS].forEach(el => el.style.opacity = "0");
  }, 2200); // 1.2s move + 1s wait
}, 1000);

        // Show navbar
        navbar.style.display = "block";

        // Transition background
        const preloader = document.getElementById("preloader");
        const mainContent = document.getElementById("main-content");

        mainContent.style.display = "block";
        preloader.style.transition = "opacity 1s ease";
        preloader.style.opacity = "0";

        setTimeout(() => {
          preloader.style.display = "none";
          document.body.style.overflow = "auto";
        }, 1000);
      }
    }, delay);
  }

  startSlideshow();

  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});



// ===== Custom S Cursor =====
(() => {
  const cursor = document.getElementById('s-cursor');
  if (!cursor) return;

  // Start hidden
  cursor.style.opacity = "0";

  // Show after 8 seconds
  setTimeout(() => {
    cursor.style.transition = "opacity 0.6s ease";
    cursor.style.opacity = "1";
  }, 3000);

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



window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");

  // Show navbar after 5 seconds
  setTimeout(() => {
    navbar.classList.add("show");
  }, 3000); // 5000ms = 5 seconds
});



const hamburger = document.querySelector('.hamburger');
const menuOverlay = document.getElementById('menu-overlay');
const closeBtn = document.getElementById('menu-close');
const underline = document.querySelector('.logo-underline');

hamburger.addEventListener('click', () => {
  menuOverlay.classList.add('active');

  // Reset animation
  underline.style.animation = 'none';
  underline.offsetHeight; // trigger reflow
  underline.style.animation = 'underlineExpand 2s ease forwards';
});

closeBtn.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
});
