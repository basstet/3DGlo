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

export default validation;
