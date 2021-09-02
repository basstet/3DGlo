/* eslint-disable strict */
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import hoverImgChange from './modules/hoverImgChange';
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
// смена картинок при наведении в блоке "Наша команда":
hoverImgChange();
// валидация:
validation();
// send ajax form:
sendForm();
