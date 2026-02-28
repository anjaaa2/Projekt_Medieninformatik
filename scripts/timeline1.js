
const items = document.querySelectorAll('.timeline-item');

/* Scroll Reveal */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.3 }
);

items.forEach(item => observer.observe(item));

/* Klick-Interaktion */
items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
