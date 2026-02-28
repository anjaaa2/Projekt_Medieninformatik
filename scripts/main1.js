document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Fade-In on Scroll
  ========================== */
  const faders = document.querySelectorAll(".fade-in-section");

  if (faders.length > 0) {
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    faders.forEach(fader => observerSafeObserve(appearOnScroll, fader));
  }

  function observerSafeObserve(observer, element) {
    if (element) observer.observe(element);
  }


  /* =========================
     Lightbox
  ========================== */
const lightboxContainer = document.getElementById("lightbox-container");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const prevBtn = document.getElementById("lightbox-prev");
const nextBtn = document.getElementById("lightbox-next");

const images = document.querySelectorAll(".lightbox-trigger");
let currentIndex = 0;

if (lightboxContainer && lightbox) {

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.src = images[currentIndex].src;
    lightboxContainer.classList.add("active");
  }

  function closeLightbox() {
    lightboxContainer.classList.remove("active");
    lightbox.src = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
  }

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  lightboxClose.addEventListener("click", closeLightbox);

  lightboxContainer.addEventListener("click", e => {
    if (e.target === lightboxContainer) closeLightbox();
  });
}

document.addEventListener("keydown", e => {
  if (!lightboxContainer.classList.contains("active")) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

  /* =========================
     Hero Background Slider
  ========================== */
  const hero = document.querySelector(".hero");

  if (hero) {
    const images = [
      "assets/images/brot.jpg",
      "assets/images/steinofen.jpg",
      "assets/images/bäckerei_2.jpg"
    ];

    let index = 0;

    hero.style.backgroundImage = `url(${images[index]})`;

    setInterval(() => {
      index = (index + 1) % images.length;
      hero.style.backgroundImage = `url(${images[index]})`;
    }, 5000);
  }


  /* =========================
     Burger Menu
  ========================== */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("open"); // Optional für Animation
    });
  }

});

