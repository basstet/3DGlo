/* eslint-disable strict */
window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // таймер:
  const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    };
    const updateClock = () => {
      const timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
        timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
        timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
      }
    };
    updateClock();
    setInterval(updateClock, 1000);
  };

  countTimer('21 august 2021');

  // меню:
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          btnClose = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('li a');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    btnClose.addEventListener('click', handlerMenu);
    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // popup:
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = popup.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');
    let popupAnimate,
        count = 0;

    const popupAppear = () => {
      popupAnimate = requestAnimationFrame(popupAppear);
      count++;
      if (count < 11) {
        popupContent.style.top = `${count}%`;
      } else {
        cancelAnimationFrame(popupAnimate);
        count = 0;
      }
    };

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (document.documentElement.clientWidth >= 768) {
          popupAnimate = requestAnimationFrame(popupAppear);
        }
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();

  // smooth scroll:
  const smoothScroll = () => {
    const menuLinks = document.querySelectorAll('menu li a'),
          firstScrollLink = document.querySelector('main a[href="#service-block"]');

    const smoothScrollTo = function(event) {
      event.preventDefault();

      const blockTop = document.querySelector(this.getAttribute('href')).getBoundingClientRect().top;

      window.scrollTo({
        left: 0,
        top: blockTop + pageYOffset,
        behavior: 'smooth'
      });
    };

    menuLinks.forEach(link => {
      link.addEventListener('click', smoothScrollTo);
    });
    
    firstScrollLink.addEventListener('click', smoothScrollTo);
  };

  smoothScroll();
});
