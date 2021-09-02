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

export default hoverImgChange;
