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
const images = Array.from(document.querySelectorAll('.gallery img'))
  .map(img => img.src);

let currentIndex = 0;
function openLightbox(index) {
  currentIndex = index;

  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');

  lightbox.style.display = "flex";
  img.classList.add("hidden");

  const highRes = new Image();
  highRes.src = images[index];

  highRes.onload = () => {
    img.src = highRes.src;
    img.classList.remove("hidden");
    img.classList.add("show");
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