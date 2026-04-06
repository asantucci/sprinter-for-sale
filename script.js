/* ================================
   LIGHTBOX (AUTO-DERIVED + PRELOAD)
   ================================ */

// Build image list directly from DOM (no manual sync bugs)
const galleryImgs = Array.from(document.querySelectorAll('.gallery img'));
const images = galleryImgs.map(img => img.src);

let currentIndex = 0;

// Preload helper
function preloadImage(index) {
  const i = (index + images.length) % images.length;
  const img = new Image();
  img.src = images[i];
}

// Open lightbox with preload + transition
function openLightbox(index) {
  currentIndex = index;

  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');

  lightbox.style.display = "flex";
  img.style.opacity = 0;

  const highRes = new Image();
  highRes.src = images[index];

  highRes.onload = () => {
    img.src = highRes.src;
    img.style.opacity = 1;

    // Preload neighbors (critical for smooth UX)
    preloadImage(index + 1);
    preloadImage(index - 1);
  };
}

// Close
function closeLightbox() {
  document.getElementById('lightbox').style.display = "none";
}

// Navigation
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox(currentIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

// Optional: click left/right half navigation
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox-img') {
    const x = e.clientX;
    const mid = window.innerWidth / 2;
    if (x > mid) showNext();
    else showPrev();
  }
});


/* ================================
   OPTIONAL: SMOOTH SCROLL
   ================================ */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}