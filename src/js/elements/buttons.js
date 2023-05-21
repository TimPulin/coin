import { el } from 'redom';
import Choices from 'choices.js';
import { iconPlus, iconArrow, iconMail } from '../elements/icons.js';
export {
  createSelect,
  createButtonAddNewAccount,
  createButtonGoBack,
  createButtonSend,
};

function createSelect(optionsArr) {
  const select = el('select.form-select');
  optionsArr.forEach((option) => {
    const optionEl = el('option', option.name, { value: option.val });
    select.append(optionEl);
  });

  return select;
}

function createButtonAddNewAccount() {
  const button = createButton(iconPlus, 'Создать новый счёт');
  return button;
}

function createButtonGoBack() {
  const button = createButton(iconArrow, 'Вернуться назад');
  return button;
}

function createButtonSend() {
  const button = createButton(iconMail, 'Отправить');
  return button;
}

function createButton(icon, text) {
  const span = el('span.button__icon');
  span.innerHTML = icon;
  const button = el('button.btn.button.button--primary', span);
  button.append(text);
  return button;
}
