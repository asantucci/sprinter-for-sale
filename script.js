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
  "assets/gallery/PXL_20220807_114229265.MP.jpg",
  "assets/gallery/PXL_20220817_142454846.jpg",
  "assets/gallery/PXL_20221023_005617768.jpg",
  "assets/gallery/PXL_20221101_004348932.jpg",
  "assets/gallery/PXL_20221119_011948746~2.jpg",
  "assets/gallery/PXL_20230301_152043228.jpg",
  "assets/gallery/PXL_20231013_155637336.jpg",
  "assets/gallery/PXL_20221022_202246946.jpg",
  "assets/gallery/PXL_20251005_184343834.jpg",
  "assets/gallery/PXL_20251005_185557521.jpg",
  "assets/gallery/PXL_20251005_190025405.jpg",
  "assets/gallery/PXL_20251005_185346335.jpg",
  "assets/gallery/PXL_20250916_030938597.jpg",
  "assets/gallery/PXL_20231013_155705979.jpg"
];

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