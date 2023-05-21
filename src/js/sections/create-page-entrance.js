import { el, mount } from 'redom';
export function createPageEntrance() {
  const form = createLoginForm();

  return form;
}

function createLoginForm() {
  const form = el('form.form');
  const inputLogin = el('input.form-control', {
    type: 'text',
    required: true,
    name: 'login',
  });
  const inputPassword = el('input.form-control', {
    type: 'password',
    required: true,
    name: 'password',
  });
  const formWrapper = el('div.form-wrapper');

  mount(formWrapper, form);
  mount(
    form,
    el(
      'div.form__wrap',
      el('h1.page-title', 'Вход в аккаунт'),
      el(
        'label.form-label.form__label',
        el('span.form__label-text', 'Логин'),
        inputLogin
      ),
      el(
        'label.form-label.form__label',
        el('span.form__label-text', 'Пароль'),
        inputPassword
      ),
      el('button.btn.button.button--primary', 'Войти')
    )
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(event);
  });

  inputLogin.addEventListener('keypress', handleInputData);
  inputPassword.addEventListener('keypress', handleInputData);

  return formWrapper;
}

function handleSubmit(event) {
  const formData = new FormData(event.target);
  const formObj = Object.fromEntries(formData);

  event.target.dispatchEvent(
    new CustomEvent('submit-login', {
      bubbles: true,
      detail: { data: formObj },
    })
  );
}

function handleInputData(event) {
  const textTemplate = /[^а-я \s ]/i;
  let currentString = event.target.value;

  if (event.key === 'Enter') {
    return;
  } else {
    event.preventDefault();
  }

  if (textTemplate.test(event.key)) {
    event.target.value = currentString + event.key;
  } else {
    event.target.value = currentString;
  }
}
