/* eslint-disable strict */
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import Carousel from './modules/carousel';
import hoverImgChange from './modules/hoverImgChange';
import Validator from './modules/validator';
import validation from './modules/validation';
import sendForm from './modules/sendForm';

// таймер:
countTimer('21 august 2021');
// меню:
toggleMenu();
// popup:
togglePopUp();
// smooth scroll:
smoothScroll();
// табы "Наши услуги":
tabs();
// слайдер:
slider();
// калькулятор:
calc(100);
// карусель "Нам доверяют":
const carousel = new Carousel({
  main: '.companies-wrapper',
  wrap: '.companies-hor',
  prev: '#carousel-left',
  next: '#carousel-right',
  slidesToShow: 5,
  infinity: true,
  responsive: [
    {
      breakpoint: 1024,
      slidesToShow: 5
    },
    {
      breakpoint: 768,
      slidesToShow: 3
    },
    {
      breakpoint: 576,
      slidesToShow: 1
    }
  ]
});
carousel.init();
// смена картинок при наведении в блоке "Наша команда":
hoverImgChange();
// валидация:
validation(Validator);
// send ajax form:
sendForm();
