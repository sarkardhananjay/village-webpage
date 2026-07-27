/* =========================================================
   Our Village — small progressive-enhancement script.
   The site works fully without JavaScript; this only adds
   a light-up-on-scroll effect and a light/dark toggle.
   ========================================================= */
(function () {
  "use strict";

  // Mark that JS is available (enables the reveal animation in CSS).
  document.documentElement.classList.add("js");

  // ---- Theme toggle (remembers your choice on this device) ----
  var root = document.documentElement;
  var saved = localStorage.getItem("village.theme");
  if (saved) root.setAttribute("data-theme", saved);

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark =
        root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("village.theme", next);
    });
  }

  // ---- Reveal sections as they scroll into view ----
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  // ---- Gently auto-scroll ".gallery-strip.auto" while it is on screen ----
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    document.querySelectorAll(".gallery-strip.auto").forEach(function (strip) {
      var onScreen = false;
      var paused = false;
      var dir = 1; // 1 = moving right, -1 = moving left
      var speed = 0.35; // pixels per frame — small number = slow

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) { onScreen = e.isIntersecting; });
          },
          { threshold: 0.25 }
        ).observe(strip);
      } else {
        onScreen = true;
      }

      // Pause when the visitor hovers or touches, resume shortly after.
      strip.addEventListener("mouseenter", function () { paused = true; });
      strip.addEventListener("mouseleave", function () { paused = false; });
      var resumeTimer;
      strip.addEventListener("pointerdown", function () { paused = true; });
      strip.addEventListener("pointerup", function () {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () { paused = false; }, 2500);
      });

      function step() {
        if (onScreen && !paused) {
          var max = strip.scrollWidth - strip.clientWidth;
          if (max > 1) {
            strip.scrollLeft += speed * dir;
            if (strip.scrollLeft >= max) dir = -1;      // reached the end, go back
            else if (strip.scrollLeft <= 0) dir = 1;    // back at start, go forward
          }
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ---- Cover-photo slideshow: fade slowly from one photo to the next ----
  var heroSlides = document.querySelectorAll(".hero-slides .hero-photo");
  if (heroSlides.length > 1 && !reduceMotion) {
    var hi = 0;
    setInterval(function () {
      heroSlides[hi].classList.remove("active");
      hi = (hi + 1) % heroSlides.length;
      heroSlides[hi].classList.add("active");
    }, 5000);
  }
})();
