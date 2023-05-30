import { el } from 'redom';
import { createCardTemplate } from './card-template.js';

export function renderPopupMessage(text) {
  const body = document.querySelector('body');
  const message = createPopupMessage(text);
  body.append(message);
  setTimeout(() => {
    message.remove();
  }, 4000);
}

function createPopupMessage(text) {
  const cardClass = 'card--popup-message';
  const cardTitle = 'Сообщение';
  const cardEl = el('.card__text', text);
  const card = createCardTemplate(cardClass, cardTitle, cardEl);

  return card;
}
