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

export default toggleMenu;
