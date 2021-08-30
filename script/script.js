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
          serviceBlock = document.querySelector('#service-block');
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

    serviceBlock.addEventListener('click', event => {
      if (!event.target.matches('.popup-btn')) {
        return;
      }
      popup.style.display = 'block';
      if (document.documentElement.clientWidth >= 768) {
        popupAnimate = requestAnimationFrame(popupAppear);
      }
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
    let targetHref;

    const smoothScrollTo = function() {
      const blockTop = document.querySelector(targetHref).getBoundingClientRect().top;

      window.scrollTo({
        left: 0,
        top: blockTop + pageYOffset,
        behavior: 'smooth'
      });
    };

    document.body.addEventListener('click', event => {
      let target = event.target;

      if (target.closest('main a[href="#service-block"]')) {
        target = target.closest('main a[href="#service-block"]');
      }

      targetHref = target.getAttribute('href');

      if (!target.matches('menu li a') && !target.matches('main a[href="#service-block"]')) {
        return;
      }
      smoothScrollTo();
    });
  };

  smoothScroll();

  // табы "Наши услуги":
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

  // слайдер:
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

  // калькулятор:
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day'),
          totalValue = document.getElementById('total');
    let animTotal,
        isAnimate = false;

    // подсчет итоговой суммы:
    const countSum = prevTotal => {
      let total = 0,
          countValue = 1,
          dayValue = 1,
          totalDiff = 0,
          count = 0;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      // эффект перебора цифр:
      totalDiff = total - prevTotal;
      count = totalDiff;
      if (!isAnimate) {
        cancelAnimationFrame(animTotal);
      }
      isAnimate = true;

      const changeTotal = () => {
        animTotal = requestAnimationFrame(changeTotal);

        if (isAnimate && totalDiff > 0 && count > 0) {
          totalValue.textContent = ++prevTotal;
          count = totalDiff--;
        } else if (isAnimate && totalDiff < 0 && count < 0) {
          totalValue.textContent = --prevTotal;
          count = totalDiff++;
        } else {
          cancelAnimationFrame(animTotal);
        }
      };

      animTotal = requestAnimationFrame(changeTotal);
    };

    // изменение "Итого" при изменении значения полей:
    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select, input')) {
        isAnimate = false;
        const prevTotal = +totalValue.textContent;
        countSum(prevTotal);
      }
    });
  };

  calc(100);

  // смена картинок при наведении в блоке "Наша команда":
  const hoverImgChange = () => {
    const command = document.getElementById('command');

    command.addEventListener('mouseover', event => {
      const target = event.target;

      if (target.matches('img.command__photo')) {
        [target.src, target.dataset.img] = [target.dataset.img, target.src];
      }
    });

    command.addEventListener('mouseout', event => {
      const target = event.target;

      if (target.matches('img.command__photo')) {
        [target.src, target.dataset.img] = [target.dataset.img, target.src];
      }
    });
  };

  hoverImgChange();

  // валидация:
  const inputValidation = event => {
    const target = event.target;

    if (!target.matches('input')) {
      return;
    }
    if (target.closest('#calc')) {
      // поля калькулятора
      target.value = target.value.replace(/\D/g, '');
    }
    switch (true) {
      case target.matches('input[name="user_name"]'):
        // поле "Ваше имя"
        target.value = target.value.replace(/[^а-яё\-\s]/gi, '');
        break;
      case target.matches('input[name="user_message"]'):
        // поле "Ваше сообщение"
        target.value = target.value.replace(/[^а-яё\-\s.,:!?()]/gi, '');
        break;
      case target.matches('input[type="email"]'):
        // поле "E-mail"
        target.value = target.value.replace(/[^a-z\d\-@_.!~*']/gi, '');
        break;
      case target.matches('input[type="tel"]'):
        // поле "Номер телефона"
        target.value = target.value.replace(/[^\d+]/g, '');
        break;
    }
  };

  const blurValidation = event => {
    if (!event.target.matches('input')) {
      return;
    }

    const target = event.target;
    let inputValue = target.value;

    inputValue = inputValue.trim();
    inputValue = inputValue.replace(/\s{2,}/g, ' ');
    inputValue = inputValue.replace(/-{2,}/g, '-');

    if (target.matches('.form-name, #form2-name')) {
      inputValue = inputValue.replace(/[а-яё]+/gi, match => {
        const name = match[0].toUpperCase() + match.slice(1).toLowerCase();
        return name;
      });
    }

    target.value = inputValue;
  };

  const validation = () => {
    document.body.addEventListener('input', inputValidation);
    document.body.addEventListener('blur', blurValidation, true);
  };

  validation();

  // send ajax form:
  const sendForm = () => {
    const errorMessage = `Что-то пошло не так...`,
          loadMessage = `Загрузка...`,
          successMessage = `Спасибо! Мы скоро с вами свяжемся!`,
          form1 = document.getElementById('form1'),
          form2 = document.getElementById('form2'),
          form3 = document.getElementById('form3'),
          statusMessage = document.createElement('div');

    statusMessage.style.color = '#fff';

    // создание запроса и отправка данных на сервер:
    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

    // отправка данных формы:
    const submitForm = event => {
      event.preventDefault();
      const form = event.target;
      
      form.append(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(form),
            body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body, () => {
        statusMessage.textContent = successMessage;
        // очистить поля после отправки:
        for (const elem of form.elements) {
          if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
            elem.value = '';
          }
        }
      }, error => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    };

    form1.addEventListener('submit', submitForm);
    form2.addEventListener('submit', submitForm);
    form3.addEventListener('submit', submitForm);
  };

  sendForm();
});
