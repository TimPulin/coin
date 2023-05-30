import { el, mount } from 'redom';
export function createPageEntrance() {
  const form = createLoginForm();

  return form;
}

function createLoginForm() {
  const formWrapper = el('div.form-wrapper');
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
  const messageField = el('.form__message-field');

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
      messageField,
      el('button.btn.button.button--primary', 'Войти')
    )
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(event, messageField);
  });

  inputLogin.addEventListener('keypress', (event) =>
    handleInputData(event, messageField)
  );
  inputLogin.addEventListener('focus', () => handleInputFocus(messageField));
  inputPassword.addEventListener('keypress', (event) =>
    handleInputData(event, messageField)
  );
  inputPassword.addEventListener('focus', () => handleInputFocus(messageField));

  return formWrapper;
}

function handleSubmit(event, messageField) {
  const formData = new FormData(event.target);
  const formObj = Object.fromEntries(formData);

  event.target.dispatchEvent(
    new CustomEvent('submit-login', {
      bubbles: true,
      detail: { data: formObj, messageField },
    })
  );
}

function handleInputData(event, messageField) {
  const textTemplate = /[^а-я \s ]/i;
  const textTemplateCyrillic = /[а-я]/i;
  let currentString = event.target.value;

  messageField.textContent = '';

  if (event.key === 'Enter') {
    return;
  } else {
    event.preventDefault();
  }

  if (textTemplate.test(event.key)) {
    event.target.value = currentString + event.key;
  } else {
    if (textTemplateCyrillic.test(event.key))
      messageField.textContent = 'Переведите клавиатуру в английскую раскладку';
    event.target.value = currentString;
  }
}

function handleInputFocus(messageField) {
  messageField.textContent = '';
}
