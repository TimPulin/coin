import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import {
  createSelect,
  createButtonAddNewAccount,
} from '../elements/buttons.js';

export function createPageAccountsList() {
  const container = el('div.container');
  const mainTop = createMainTop();
  const mainBase = createMainBase();
  setChildren(container, [mainTop, mainBase]);
  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock, insertSelectPlace, insertButtonPlace } =
    createTitleBlock('Ваши счета');
  const select = createSelect([
    { name: 'по номеру', val: 'number' },
    { name: 'По балансу', val: 'balance' },
    { name: 'По последней транзакции', val: 'lastaction' },
  ]);
  const button = createButtonAddNewAccount();
  insertSelectPlace.append(select);
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock]);

  return mainTop;
}

function createMainBase() {
  const mainBase = el('div.main__base');
  const card = createCardAccount();
  mainBase.append(card);
  return mainBase;
}

function createCardAccount() {
  const card = el(
    'div.card card--account',
    el(
      'div.card__body',
      el('span.card__acc-number', '123456788932021'),
      el('span.card__acc-amount', '3 523 '),
      el(
        'div.card__acc-action',
        el(
          'div.card__acc-wrap',
          el('span.card__acc-action-title', 'Последняя транзакция:'),
          el('span.card__acc-action-date', '21 августа 2021')
        ),
        el('a.link btn button button--primary', 'Открыть', { href: '#' })
      )
    )
  );

  return card;
}
