// валидация:
class Validator {
  constructor({form, pattern = {}, method}) {
    this.form = form;
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', event => {
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size) {
        event.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.name];
      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать атрибуты name полей ввода и их методы валидации');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.matches('.error-message')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = `Введите корректные данные`;
    errorDiv.classList.add('error-message');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.matches('.error-message')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        box-shadow: inset 0 0 0 2px #7FBA00;
      }
      input.error {
        box-shadow: inset 0 0 0 2px #F25022;
      }
      .error-message {
        font-size: 12px;
        color: #F25022;
        text-align: left;
      }
      form.main-form .error-message {
        position: absolute;
        bottom: 5px;
      }
    `;
    document.head.append(style);
  }

  setPattern() {
    if (!this.pattern.name) {
      this.pattern.name = /^[а-яё]{2,}[\sа-яё]*$/i;
    }
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+[\w\d\-_.]*@\w+\.\w{2,}$/;
    }
    if (!this.pattern.message) {
      this.pattern.message = /^[а-яё\-\s.,:!?()]{2,}$/i;
    }
  }
}

export default Validator;
