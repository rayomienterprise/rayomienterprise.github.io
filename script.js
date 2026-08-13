const slides = [...document.querySelectorAll('.hero-slide')];
const dots = document.getElementById('sliderDots');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dots.appendChild(dot);
});

function updateSlider() {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
}

function goToSlide(index) {
  current = (index + slides.length) % slides.length;
  updateSlider();
  restartTimer();
}

function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

document.getElementById('nextSlide').addEventListener('click', nextSlide);
document.getElementById('prevSlide').addEventListener('click', prevSlide);

function restartTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 6500);
}

updateSlider();
restartTimer();

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuToggle.innerHTML = mainNav.classList.contains('open')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const header = document.getElementById('header');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
  backTop.classList.toggle('show', window.scrollY > 500);
});

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const solutionCarousel = document.getElementById('solutionCarousel');
document.getElementById('solutionNext').addEventListener('click', () => {
  solutionCarousel.scrollBy({left: solutionCarousel.clientWidth * .72, behavior: 'smooth'});
});
document.getElementById('solutionPrev').addEventListener('click', () => {
  solutionCarousel.scrollBy({left: -solutionCarousel.clientWidth * .72, behavior: 'smooth'});
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.service-card, .solution-card, .process-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{opacity:0, transform:'translateY(25px)'}, {opacity:1, transform:'translateY(0)'}],
        {duration:650, easing:'cubic-bezier(.2,.7,.2,1)', fill:'forwards'}
      );
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

revealItems.forEach(item => observer.observe(item));
