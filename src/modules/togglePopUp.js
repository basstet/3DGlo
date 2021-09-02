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

export default togglePopUp;
