import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import {
  createSelect,
  createButtonAddNewAccount,
} from '../elements/buttons.js';
import { formatDateMonthWord } from '../helpers/format-date.js';

export function createPageAccountsList(arrAccounts) {
  const container = el('div.container');
  const mainTop = createMainTop();
  const mainBase = createMainBase(arrAccounts);
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

function createMainBase(arrAccounts) {
  const mainBase = el('div.main__base');
  arrAccounts.forEach((account) => {
    const card = createCardAccount(account);
    mainBase.append(card);
  });
  return mainBase;
}

function createCardAccount({ account, balance, transactions }) {
  const date = getLastTransaction(transactions);

  const card = el(
    'div.card card--account',
    el(
      'div.card__body',
      el('span.card__acc-number', account),
      el('span.card__acc-amount', balance),
      el(
        'div.card__acc-action',
        el(
          'div.card__acc-wrap',
          el('span.card__acc-action-title', 'Последняя транзакция:'),
          el('span.card__acc-action-date', date)
        ),
        el('a.link btn button button--primary', 'Открыть', {
          href: `/accounts/${account}`,
        })
      )
    )
  );
  return card;
}

function getLastTransaction(trans) {
  return trans.length ? formatDateMonthWord(trans[0].date) : 'Транзакций нет';
}
