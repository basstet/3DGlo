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
    event.preventDefault();
    smoothScrollTo();
  });
};

export default smoothScroll;
