import { el } from 'redom';
import { iconPlus, iconArrow, iconMail } from '../elements/icons.js';
export {
  createSelect,
  createButtonAddNewAccount,
  createButtonGoBack,
  createButtonSend,
};

function createSelect(optionsArr, selectName, selectedKey = '') {
  const select = el('select.js-choice', { name: selectName });
  optionsArr.forEach((option) => {
    const optionEl = el('option', option.name, {
      value: option.val,
      selected: isSelected(option.val, selectedKey),
    });
    select.append(optionEl);
  });

  return select;
}

function createButtonAddNewAccount() {
  const button = createButton(iconPlus, 'Создать новый счёт');
  button.addEventListener('click', () => {
    button.dispatchEvent(
      new CustomEvent('create-new-account', {
        bubbles: true,
      })
    );
  });
  return button;
}

function createButtonGoBack() {
  const link = createButtonLink(iconArrow, 'Вернуться назад');
  link.href = '/accounts';
  return link;
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

function createButtonLink(icon, text) {
  const span = el('span.button__icon');
  span.innerHTML = icon;
  const link = el('a.link.btn.button.button--primary', span);
  link.append(text);
  return link;
}

function isSelected(optionVal, selectedKey) {
  return optionVal === selectedKey;
}
