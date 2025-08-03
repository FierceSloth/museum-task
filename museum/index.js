const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const overlay = document.querySelector(".overlay");
const body = document.body;

burger.addEventListener("click", function () {
  this.classList.toggle("active");
  nav.classList.toggle("open");
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");
});

overlay.addEventListener("click", function () {
  burger.classList.remove("active");
  nav.classList.remove("open");
  overlay.classList.remove("active");
  body.classList.remove("no-scroll");
});

document.querySelectorAll('.header__list a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function () {
    burger.classList.remove("active");
    nav.classList.remove("open");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  });
});



const welcomeSlider = document.querySelector(".welcome__slider");
const welcomeSlides = document.querySelectorAll(".welcome__slider--item");
const welcomeDots = document.querySelectorAll(".welcome__pagination--button");
const welcomePrev = document.querySelector(".welcome__prev");
const welcomeNext = document.querySelector(".welcome__next");
const welcomeSlideText = document.querySelector(".welcome__pagination--now");
const welcomeFirst = welcomeSlides[0]
const welcomeLast = welcomeSlides[welcomeSlides.length - 1]
const welcomeSlideSize = welcomeSlides[0].offsetWidth;
const welcomeFirstClone = welcomeFirst.cloneNode(true);
const welcomeLastClone = welcomeLast.cloneNode(true);


welcomeSlider.append(welcomeFirstClone);
welcomeSlider.prepend(welcomeLastClone);

welcomeDots[0].classList.add('active');
welcomeSlider.style.transform = `translateX(-${welcomeSlideSize}px)`;

let currentSlide = 1;
let isSliding = false;

function swipeToRight() {
  if (isSliding) return;
  isSliding = true;

  currentSlide++;
  welcomeSlider.style.transition = 'transform 0.3s ease';
  welcomeSlider.style.transform = `translateX(-${currentSlide * welcomeSlideSize}px)`;

  welcomeSlider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;

    if (currentSlide === welcomeSlides.length + 1) {
      welcomeSlider.style.transition = 'none';
      currentSlide = 1;
      welcomeSlider.style.transform = `translateX(-${currentSlide * welcomeSlideSize}px)`;
      welcomeSlider.offsetHeight;
    }

    updateDotsAndText();
    isSliding = false;
    welcomeSlider.removeEventListener('transitionend', handler);
  });
}

function swipeToLeft() {
  if (isSliding) return;
  isSliding = true;

  currentSlide--;
  welcomeSlider.style.transition = 'transform 0.3s ease';
  welcomeSlider.style.transform = `translateX(-${currentSlide * welcomeSlideSize}px)`;

  welcomeSlider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;

    if (currentSlide === 0) {
      welcomeSlider.style.transition = 'none';
      currentSlide = welcomeSlides.length;
      welcomeSlider.style.transform = `translateX(-${currentSlide * welcomeSlideSize}px)`;
      welcomeSlider.offsetHeight;
    }

    updateDotsAndText();
    isSliding = false;
    welcomeSlider.removeEventListener('transitionend', handler);
  });
}

function swipeToNum(num) {
  if (isSliding) return;
  isSliding = true;

  currentSlide = num;
  welcomeSlider.style.transition = 'transform 0.3s ease';
  welcomeSlider.style.transform = `translateX(-${currentSlide * welcomeSlideSize}px)`;

  welcomeSlider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;
    updateDotsAndText();
    isSliding = false;
    welcomeSlider.removeEventListener('transitionend', handler);
  });
}

function updateDotsAndText() {
  welcomeDots.forEach((item) => item.classList.remove('active'));
  let dotIndex = (currentSlide - 1) % welcomeDots.length;
  welcomeDots[dotIndex].classList.add('active');
  welcomeSlideText.innerHTML = `0${dotIndex + 1}`;
}

welcomeNext.addEventListener("click", swipeToRight);
welcomePrev.addEventListener("click", swipeToLeft);
welcomeDots.forEach((dot, index) => {
  dot.addEventListener('click', () => swipeToNum(index + 1));
});

let welcomeInterval = setInterval(() => swipeToRight(), 3000);

document.querySelector('.welcome__pagination').addEventListener('mouseover', () => clearInterval(welcomeInterval));
document.querySelector('.welcome__pagination').addEventListener('mouseout', () => welcomeInterval = setInterval(() => swipeToRight(), 3000));