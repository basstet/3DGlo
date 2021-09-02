// send ajax form:
const sendForm = () => {
  const errorMessage = `Что-то пошло не так...`,
        successMessage = `Спасибо! Мы скоро с вами свяжемся!`,
        statusMessage = document.createElement('div');

  statusMessage.style.color = '#fff';
  statusMessage.style.marginTop = '1rem';

  // создание запроса и отправка данных на сервер:
  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  // отправка данных формы:
  const submitForm = event => {
    if (!event.target.closest('form')) {
      return;
    }
    event.preventDefault();
    const form = event.target;

    form.append(statusMessage);
    // прелоадер:
    statusMessage.innerHTML = `<div class="sk-double-bounce">
        <div class="sk-child sk-double-bounce-1"></div>
        <div class="sk-child sk-double-bounce-2"></div>
      </div>`;

    const formData = new FormData(form),
          body = {};

    formData.forEach((val, key) => {
      body[key] = val;
    });

    postData(body)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status is not 200');
        }
        statusMessage.innerHTML = successMessage;
        // очистить поля после отправки:
        for (const elem of form.elements) {
          if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
            elem.value = '';
          }
        }
      })
      .catch(error => {
        statusMessage.innerHTML = errorMessage;
        console.error(error);
      });
  };

  document.body.addEventListener('submit', submitForm);
};

export default sendForm;
