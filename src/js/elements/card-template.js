import { el } from 'redom';

export function createCardTemplate(cardClass, cardTitle, cardEl) {
  const card = el(
    `.card.${cardClass}`,
    el('.card__body', el('h2.card__title', cardTitle), cardEl)
  );
  return card;
}
