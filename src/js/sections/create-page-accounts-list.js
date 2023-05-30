import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import {
  createSelect,
  createButtonAddNewAccount,
} from '../elements/buttons.js';
import { formatDateMonthWord } from '../helpers/format-date.js';
import { sortArrAccounts } from '../helpers/sort-arr-accounts.js';

export function createPageAccountsList(arrAccounts, sortAccountsBy) {
  const container = el('div.container');
  const mainTop = createMainTop(sortAccountsBy);
  const mainBase = createMainBase(arrAccounts, sortAccountsBy);
  setChildren(container, [mainTop, mainBase]);
  return container;
}

function createMainTop(sortAccountsBy) {
  const mainTop = el('div.main__top');
  const { titleBlock, insertSelectPlace, insertButtonPlace } =
    createTitleBlock('Ваши счета');
  const arr = [
    { name: 'по номеру', val: 'accountNumber' },
    { name: 'По балансу', val: 'balance' },
    { name: 'По последней транзакции', val: 'lastTransaction' },
  ];

  const select = createSelect(arr, 'filter-accounts', sortAccountsBy);
  const button = createButtonAddNewAccount();
  insertSelectPlace.append(select);
  insertButtonPlace.append(button);

  select.addEventListener('change', handleSelectChange);

  setChildren(mainTop, [titleBlock]);

  return mainTop;
}

function createMainBase(arrAccounts, sortAccountsBy) {
  const mainBase = el('div.main__base');
  const cardEmpty = el('.card-empty');
  formatArrAccounts(arrAccounts);
  sortArrAccounts(arrAccounts, sortAccountsBy);

  arrAccounts.forEach((account) => {
    const card = createCardAccount(account);
    mainBase.append(card);
  });

  mainBase.append(cardEmpty);

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

function formatArrAccounts(arrAccounts) {
  arrAccounts.forEach((account) => {
    account.accountNumber = Number(account.account);

    if (account.transactions.length) {
      account.lastTransaction = Number(
        new Date(account.transactions[0].date).getTime()
      );
    } else {
      account.lastTransaction = 0;
    }
  });
}

function handleSelectChange(event) {
  document.dispatchEvent(
    new CustomEvent('sort-accounts', {
      bubbles: true,
      detail: { data: event.detail.value },
    })
  );
}
