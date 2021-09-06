// валидация:
const blurValidation = event => {
  if (!event.target.matches('input')) {
    return;
  }

  const target = event.target;
  let inputValue = target.value;

  inputValue = inputValue.trim();

  if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
    inputValue = inputValue.replace(/\s{2,}/g, ' ');
    inputValue = inputValue.replace(/-{2,}/g, '-');
  }

  if (target.matches('input[name="user_name"]')) {
    inputValue = inputValue.replace(/[а-яё]+/gi, match => {
      const name = match[0].toUpperCase() + match.slice(1).toLowerCase();
      return name;
    });
  }

  target.value = inputValue;
};

// для калькулятора:
const calcValidation = event => {
  const target = event.target;
  if (target.matches('input')) {
    target.value = target.value.replace(/\D/g, '');
  }
};

const validation = Validator => {
  // авто-корректор для полей "Имя" и "Сообщение":
  document.body.addEventListener('blur', blurValidation, true);

  // валидация полей форм:
  document.body.addEventListener('click', event => {
    if (!event.target.matches('input, button')) {
      return;
    }
    if (event.target.closest('form')) {
      const elem = event.target.closest('form');
      const valid = new Validator({
        form: elem,
        pattern: {},
        method: {
          'user_name': [
            ['notEmpty'],
            ['pattern', 'name']
          ],
          'user_phone': [
            ['notEmpty'],
            ['pattern', 'phone']
          ],
          'user_email': [
            ['notEmpty'],
            ['pattern', 'email']
          ],
          'user_message': [
            ['notEmpty'],
            ['pattern', 'message']
          ]
        }
      });
      valid.init();
    }
  });

  // запрет ввода "не цифр" для калькулятора:
  document.getElementById('calc').addEventListener('input', calcValidation);
};

export default validation;
