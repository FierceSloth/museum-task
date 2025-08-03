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


const videoSlider = document.querySelector(".video__carosuel");
const videoSlides = document.querySelectorAll(".video__slider--item");
const videoDots = document.querySelectorAll(".video__pagination--dot");
const videoPrev = document.querySelector(".video__pagination--button-left");
const videoNext = document.querySelector(".video__pagination--button-right");


const videoStyle = getComputedStyle(videoSlider)
const videoSlideSize = videoSlides[0].offsetWidth + parseInt(videoStyle.gap);


let welcomeCurrentSlide = {
  value: 1,
};
let welcomeIsSliding = {
  value: false,
};

let videoCurrentSlide = {
  value: 0,
};
let videoIsSliding = {
  value: false,
};

welcomeSlider.append(welcomeFirstClone);
welcomeSlider.prepend(welcomeLastClone);

welcomeDots[0].classList.add('active');
welcomeSlider.style.transform = `translateX(-${welcomeSlideSize}px)`;
videoDots[0].classList.add('active');


function updateDotsAndText(currentSlide, dots, slideText, reworkText) {
  dots.forEach((item) => item.classList.remove('active'));

  if (reworkText) {
    let dotIndex = (currentSlide.value - 1) % dots.length;
    dots[dotIndex].classList.add('active');
    slideText.innerHTML = `0${dotIndex + 1}`;
  } 

  if (!reworkText) {
    let dotIndex = (currentSlide.value ) % dots.length;
    dots[dotIndex].classList.add('active');
  }
}

function swipeToNum(num, slider, isSliding, currentSlide, slideSize, dots, slideText, reworkText) {
  if (isSliding.value) return;
  isSliding.value = true;

   if (reworkText) {currentSlide.value = num};
   if (!reworkText) {currentSlide.value = num - 1};
  slider.style.transition = 'transform 0.3s ease';
  slider.style.transform = `translateX(-${currentSlide.value * slideSize}px)`;

  slider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;
    updateDotsAndText(currentSlide, dots, slideText, reworkText);
    isSliding.value = false;
    slider.removeEventListener('transitionend', handler);
  });
  isSliding.value = false;
}

function swipeToRight(slider, slideSize, isSliding, currentSlide, dots, slideText, slidesLength, isLoop, reworkText) {
  if (isSliding.value) return;

  if (!isLoop && currentSlide.value >= slidesLength - 2) return;

  isSliding.value = true;

  currentSlide.value++;
  slider.style.transition = 'transform 0.3s ease';
  slider.style.transform = `translateX(-${currentSlide.value * slideSize}px)`;

  slider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;

    if (isLoop && currentSlide.value === slidesLength + 1) {
      slider.style.transition = 'none';
      currentSlide.value = 1;
      slider.style.transform = `translateX(-${currentSlide.value * slideSize}px)`;
      slider.offsetHeight;
    }

    if (dots || slideText) {
      updateDotsAndText(currentSlide, dots, slideText, reworkText);
    }

    isSliding.value = false;
    slider.removeEventListener('transitionend', handler);
  });
}

function swipeToLeft(slider, slideSize, isSliding, currentSlide, dots, slideText, slidesLength, isLoop, reworkText) {
  if (isSliding.value) return;

  if (!isLoop && currentSlide.value <= 0) return;

  isSliding.value = true;

  currentSlide.value--;
  slider.style.transition = 'transform 0.3s ease';
  slider.style.transform = `translateX(-${currentSlide.value * slideSize}px)`;

  slider.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;

    if (isLoop && currentSlide.value === 0) {
      slider.style.transition = 'none';
      currentSlide.value = slidesLength;
      slider.style.transform = `translateX(-${currentSlide.value * slideSize}px)`;
      slider.offsetHeight; 
    }

    if (dots || slideText) {
      updateDotsAndText(currentSlide, dots, slideText, reworkText);
    }

    isSliding.value = false;
    slider.removeEventListener('transitionend', handler);
  });
}



welcomeNext.addEventListener("click", () => {
  swipeToRight(welcomeSlider, welcomeSlideSize, welcomeIsSliding, welcomeCurrentSlide, welcomeDots, welcomeSlideText, welcomeSlides.length, true, true);
});
welcomePrev.addEventListener("click", () => {
  swipeToLeft(welcomeSlider, welcomeSlideSize, welcomeIsSliding, welcomeCurrentSlide, welcomeDots, welcomeSlideText, welcomeSlides.length, true, true);
});

welcomeDots.forEach((dot, index) => {
  dot.addEventListener('click', () => swipeToNum(index + 1, welcomeSlider, welcomeIsSliding, welcomeCurrentSlide, welcomeSlideSize, welcomeDots, welcomeSlideText, true));
});


videoNext.addEventListener("click", () => {
  swipeToRight(videoSlider, videoSlideSize, videoIsSliding, videoCurrentSlide, videoDots, null, videoSlides.length, false, false);
});
videoPrev.addEventListener("click", () => {
  swipeToLeft(videoSlider, videoSlideSize, videoIsSliding, videoCurrentSlide, videoDots, null, videoSlides.length, false, false);
});
videoDots.forEach((dot, index) => {
  dot.addEventListener('click', () => swipeToNum(index + 1, videoSlider, videoIsSliding, videoCurrentSlide, videoSlideSize, videoDots, false));
});


let welcomeInterval = setInterval(() => swipeToRight(welcomeSlider, welcomeSlideSize, welcomeIsSliding, welcomeCurrentSlide, welcomeDots, welcomeSlideText, welcomeSlides.length, true, true), 3000);
document.querySelector('.welcome__pagination').addEventListener('mouseover', () => clearInterval(welcomeInterval));
document.querySelector('.welcome__pagination').addEventListener('mouseout', () => welcomeInterval = setInterval(() => swipeToRight(welcomeSlider, welcomeSlideSize, welcomeIsSliding, welcomeCurrentSlide, welcomeDots, welcomeSlideText, welcomeSlides.length, true, true), 3000));