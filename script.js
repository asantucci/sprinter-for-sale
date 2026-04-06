// SCROLL ANIMATIONS
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach(el => observer.observe(el));


// PARALLAX HERO
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg');
  let offset = window.scrollY;
  bg.style.transform = `translateY(${offset * 0.4}px)`;
});


// SCROLL NAV
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}


// LIGHTBOX
const images = [
  "assets/gallery/1.jpg",
  "assets/gallery/2.jpg",
  "assets/gallery/3.jpg",
  "assets/gallery/4.jpg",
  "assets/gallery/5.jpg"
];

let currentIndex = 0;
function openLightbox(index) {
  currentIndex = index;

  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');

  img.style.opacity = 0;

  const highRes = new Image();
  highRes.src = images[index];

  highRes.onload = () => {
    img.src = highRes.src;
    img.style.opacity = 1;
    lightbox.style.display = "flex";
  };
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = "none";
}

// KEYBOARD NAV
document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else if (e.key === "Escape") {
      closeLightbox();
    }

    document.getElementById('lightbox-img').src = images[currentIndex];
  }
});