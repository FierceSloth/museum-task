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


document.querySelector('.explore__right input').addEventListener("input", function() {
  document.querySelector('.before__img').style.width = this.value + '%';
})


	mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5bmhuZ2EiLCJhIjoiY2xnajV4OGt3MGp3MDNmcDR0MjVuZTQxbiJ9.Tx546eIoBUlgx2UwnVmy4g';
    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/light-v10',
        center: [2.3364, 48.86091],
        zoom: 15.75, 
    });

    const marker1 = new mapboxgl.Marker({color: 'black'})
        .setLngLat([2.3364, 48.86091])
        .addTo(map);

    const marker2 = new mapboxgl.Marker({ color: 'grey'})
        .setLngLat([2.3397, 48.8607])
        .addTo(map);

    const marker3 = new mapboxgl.Marker({ color: 'grey'})
        .setLngLat([2.3330, 48.8619])
        .addTo(map);

    const marker4 = new mapboxgl.Marker({ color: 'grey'})
        .setLngLat([2.3365, 48.8625])
        .addTo(map);

    const marker5 = new mapboxgl.Marker({ color: 'grey'})
        .setLngLat([2.3333, 48.8602])
        .addTo(map);

const ticketRadioList = document.querySelectorAll('.radio__list--item input'),
      ticketBasicInput = document.querySelector('#basic__counter--input'),
      ticketBasicPlus = document.querySelector('.basic__counter__plus'),
      ticketBasicMinus = document.querySelector('.basic__counter__minus'),
      ticketSeniorInput = document.querySelector('#senior__counter--input'),
      ticketSeniorPlus = document.querySelector('.senior__counter__plus'),
      ticketSeniorMinus = document.querySelector('.senior__counter__minus'),
      ticketTotal = document.querySelector('.tickets__total'),
      ticketButton = document.querySelector('.tickets__submit'),
      ticketPopUp = document.querySelector('.tickets__popup'),
      ticketOverlay = document.querySelector('.popup__overlay'),
      popUpClose = document.querySelector('.popup--close'),
      popUpDate = document.querySelector('#date'),
      popUpTime = document.querySelector('#time'),
      popUpName = document.querySelector('#name'),
      popUpEmail = document.querySelector('#email'),
      popUpPhone = document.querySelector('#phone'),
      popUpType = document.querySelector('#type'),
      popUpBasicInput = document.querySelector('#entry__basic__input'),
      popUpBasicMinus = document.querySelector('#entry__basic__minus'),
      popUpBasicPlus = document.querySelector('#entry__basic__plus'),
      popUpSeniorInput = document.querySelector('#entry__senior__input'),
      popUpSeniorMinus = document.querySelector('#entry__senior__minus'),
      popUpSeniorPlus = document.querySelector('#entry__senior__plus'),
      popUpTotal = document.querySelector('.total--value'),
      amountTextBasic = document.querySelector('.amount--basic'),
      amountTextSenior = document.querySelector('.amount--senior'),
      popupButton = document.querySelector('.popup__button');

const today = new Date(),
      day = String(today.getDate()).padStart(2, '0'),
      month = String(today.getMonth() + 1).padStart(2, '0'),
      year = today.getFullYear(),
      formatted = `${year}-${month}-${day}`; 

let ticketPrice = {
  value: 20
};
let totalPrice = {
  value: 30
};
let isFormIncomplete = {
  value: false
}
popUpDate.min = formatted;
        
function counterPlus(counter) {
  if (counter.value === '20') return
  counter.value = Number(counter.value) + 1
}
function counterMinus(counter) {
  if (counter.value === '0') return
  counter.value = Number(counter.value) - 1
}
function ticketPriceToOne() {
  for(let radio of ticketRadioList) {
    if (radio.checked) {
			ticketPrice.value = Number(radio.value)
		}
  }
}
function updateTotalPrice() {
  totalPrice.value = (ticketPrice.value * Number(ticketBasicInput.value)) + ((ticketPrice.value * 0.5) * Number(ticketSeniorInput.value))
  ticketTotal.innerHTML = `Total €${totalPrice.value}`
}


function updatePopUpTypePrice() {
  document.querySelector('#popup__basic--label').innerHTML = `Basic 18+ (${ticketPrice.value} €)`
  document.querySelector('#popup__senior--label').innerHTML = `Senior 65+ (${ticketPrice.value / 2} €)`

  document.querySelector('#basic__summary').innerHTML = `Basic (${ticketPrice.value} €)`
  document.querySelector('#senior__summary').innerHTML = `Senior (${ticketPrice.value / 2} €)`
}
function updatePopUpTotal() {
  amountTextSenior.innerHTML = popUpSeniorInput.value;
  amountTextBasic.innerHTML = popUpBasicInput.value;

  totalPrice.value = (ticketPrice.value * Number(popUpBasicInput.value)) + ((ticketPrice.value * 0.5) * Number(popUpSeniorInput.value));

  document.querySelector('.popup__basic--total').innerHTML = ticketPrice.value * Number(popUpBasicInput.value) + "€"
  document.querySelector('.popup__senior--total').innerHTML = (ticketPrice.value * 0.5) * Number(popUpSeniorInput.value) + "€"
  popUpTotal.innerHTML = `${totalPrice.value} €`
}
function linkPopUpValue() {
  popUpBasicInput.value = ticketBasicInput.value;
  popUpSeniorInput.value = ticketSeniorInput.value;
  popUpTotal.innerHTML = `${totalPrice.value} €`

  popUpType.value = String(ticketPrice.value)
  document.querySelector('.detail__type').innerHTML = whatType();
}
function linkTicketsValue() {
  ticketBasicInput.value = popUpBasicInput.value
  ticketSeniorInput.value = popUpSeniorInput.value
  totalPrice.innerHTML = `€${popUpTotal.value}`
}
function whatType() {
  if(popUpType.value == '20') return 'Permanent exhibition'
  if(popUpType.value == '25') return 'Temporary exhibition'
  if(popUpType.value == '40') return 'Combined Admission'
}



ticketRadioList.forEach(radio => {
  radio.addEventListener('change', () => {
    ticketPriceToOne(ticketRadioList);
    updateTotalPrice();
  })  
})


ticketBasicInput.addEventListener('input', () => {
  updateTotalPrice();
})
ticketSeniorInput.addEventListener('input', () => {
  updateTotalPrice();
})
popUpDate.addEventListener('input', () => {
  document.querySelector('.detail__date').innerHTML = `Date: ${popUpDate.value}`;
})
popUpTime.addEventListener('input', () => {
  document.querySelector('.detail__time').innerHTML = `Time: ${popUpTime.value}`;
})
popUpType.addEventListener('change', () => {
  ticketPrice.value = Number(popUpType.value)
  document.querySelector('.detail__type').innerHTML = whatType();
  updatePopUpTypePrice();
  updatePopUpTotal();
})


popUpName.addEventListener('input', () => {
  if (popUpName.value.length < 3 || popUpName.value.length > 15) {
    document.querySelector('#name__error').innerHTML = `Length should be between 3 and 15 characters.`
    document.querySelector('.name').classList.add('red')
    isFormIncomplete.value = false
  }
  if (popUpName.value.length > 3) {
    document.querySelector('#name__error').innerHTML = ""
    document.querySelector('.name').classList.remove('red')
    isFormIncomplete.value = true
  }
  if (/[^a-zA-Zа-яА-ЯёЁ ]/.test(popUpName.value)) {
    document.querySelector('#name__error').innerHTML = `Special characters are not allowed.`
    document.querySelector('.name').classList.add('red')
    isFormIncomplete.value = false
  }
})
popUpEmail.addEventListener('input', () => {
  let indexOfDog = popUpEmail.value.split('').indexOf('@');
  if (indexOfDog > 16 || indexOfDog < 3 ) {
    document.querySelector('#email__error').innerHTML = `Email username must be 3–15 characters.`
    document.querySelector('.email').classList.add('red')
    isFormIncomplete.value = false
  }
  if (indexOfDog >= 3 ) {
    document.querySelector('#email__error').innerHTML = ""
    document.querySelector('.email').classList.remove('red')
    isFormIncomplete.value = true
  }
  if (/[^a-zA-Zа-яА-ЯёЁ@.1-9-_]/.test(popUpEmail.value) || indexOfDog === -1) {
    document.querySelector('#email__error').innerHTML = `Invalid email. Example: username@example.com.`
    document.querySelector('.email').classList.add('red')
    isFormIncomplete.value = false
  }
})
popUpPhone.addEventListener('input', () => {
  if (popUpPhone.value.length > 10) {
    document.querySelector('#phone__error').innerHTML = `Phone number must be up to 10 digits.`
    document.querySelector('.phone').classList.add('red')
    isFormIncomplete.value = false
  }
  if (popUpPhone.value.length <= 10) {
    document.querySelector('#phone__error').innerHTML = ""
    document.querySelector('.phone').classList.remove('red')
    isFormIncomplete.value = true
  }
  if (/[^0-9 -]/.test(popUpPhone.value)) {
    document.querySelector('#phone__error').innerHTML = `Only numbers, spaces, and hyphens are allowed.`
    document.querySelector('.phone').classList.add('red')
    isFormIncomplete.value = false
  }
})
popupButton.addEventListener('click', () => {
  if (popUpName.value.length === 0) {
    document.querySelector('#name__error').innerHTML = `Required field.`
    document.querySelector('.name').classList.add('red')
    return
  }
  if (popUpPhone.value.length === 0) {
    document.querySelector('#phone__error').innerHTML = `Required field.`
    document.querySelector('.phone').classList.add('red')
    returnr
  }
  if (popUpEmail.value.length === 0) {
    document.querySelector('#email__error').innerHTML = `Required field.`
    document.querySelector('.email').classList.add('red')
    return
  }
  if (isFormIncomplete.value) {
    alert('Form completed successfully')
    ticketPopUp.classList.remove('open-popup');
    ticketOverlay.classList.remove('show');
    body.classList.remove("no-scroll--popup");
    linkTicketsValue()
  }
})


ticketBasicMinus.addEventListener('click', () => { 
  counterMinus(ticketBasicInput);
  updateTotalPrice();
})
ticketBasicPlus.addEventListener('click', () => {
  counterPlus(ticketBasicInput)
  updateTotalPrice();
})
ticketSeniorMinus.addEventListener('click', () => {
  counterMinus(ticketSeniorInput)
  updateTotalPrice();
})
ticketSeniorPlus.addEventListener('click', () => {
  counterPlus(ticketSeniorInput)
  updateTotalPrice();
})


ticketButton.addEventListener('click', () => {
  ticketPopUp.classList.toggle('open-popup'); 
  ticketOverlay.classList.toggle('show')
  body.classList.toggle("no-scroll--popup");
  linkPopUpValue();
  updatePopUpTypePrice();
  updatePopUpTotal()
});
popUpClose.addEventListener('click', () => {
  ticketPopUp.classList.remove('open-popup');
  ticketOverlay.classList.remove('show');
  body.classList.remove("no-scroll--popup");
  linkTicketsValue()
});
ticketOverlay.addEventListener('click', () => {
  ticketPopUp.classList.remove('open-popup');
  ticketOverlay.classList.remove('show');
  body.classList.remove("no-scroll");
  linkTicketsValue()
});

popUpBasicMinus.addEventListener('click', () => {
  counterMinus(popUpBasicInput);
  updatePopUpTotal();
})
popUpBasicPlus.addEventListener('click', () => {
  counterPlus(popUpBasicInput);
  updatePopUpTotal();
})
popUpSeniorMinus.addEventListener('click', () => {
  counterMinus(popUpSeniorInput);
  updatePopUpTotal();
  
})
popUpSeniorPlus.addEventListener('click', () => {
  counterPlus(popUpSeniorInput);
  updatePopUpTotal();
})

/* Hello World! */ 