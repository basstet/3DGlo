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
    const menu = document.querySelector('menu');

    const handlerMenu = event => {
      let target = event.target;

      if (target.closest('.menu')) {
        target = target.closest('.menu');
      }

      if (target.matches('menu li a') || target.matches('menu .close-btn') || target.matches('.menu')) {
        menu.classList.toggle('active-menu');
      } else if (!target.closest('menu') && menu.classList.contains('active-menu')) {
        menu.classList.remove('active-menu');
      }
    };

    document.body.addEventListener('click', handlerMenu);
  };

  toggleMenu();

  // popup:
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = popup.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn');
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

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.matches('.popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }
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

  // табы "Наши услуги"
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // слайдер
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
          slide = document.querySelectorAll('.portfolio-item'),
          dots = document.querySelector('.portfolio-dots');
          
    let currentSlide = 0,
        interval,
        dot;

    const addDots = () => {
      slide.forEach((item, index) => {
        const newDot = document.createElement('li');
        newDot.classList.add('dot');
        if (index === 0) {
          newDot.classList.add('dot-active');
        }
        dots.append(newDot);
      });
      dot = document.querySelectorAll('.dot');
    };

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlide();
      }
    });

    addDots();
    startSlide();
  };

  slider();
});
