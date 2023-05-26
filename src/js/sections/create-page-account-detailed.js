import { el, setChildren } from 'redom';
import {
  createTitleBlock,
  createAccountInfo,
} from '../elements/main-top-elements.js';
import {
  createButtonGoBack,
  createButtonSend,
  createSelect,
} from '../elements/buttons.js';
import { createGraph } from '../elements/graph.js';
import { createCardTemplate } from '../elements/card-template.js';
import { createTable } from '../elements/table.js';

export function createPageAccountDetailed({
  account,
  balance: balanceCurrent,
  transactions,
}) {
  const container = el('div.container');
  const top = createMainTop(account, balanceCurrent);
  const base = createMainBase(account, transactions, balanceCurrent);

  setChildren(container, [top, base]);

  return container;
}

function createMainTop(account, balanceCurrent) {
  const mainTop = el('div.main__top');
  const { titleBlock, insertButtonPlace } = createTitleBlock('Просмотр счёта');
  const accountInfo = createAccountInfo(account, balanceCurrent);
  const button = createButtonGoBack();
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock, accountInfo]);

  return mainTop;
}

function createMainBase(account, transactions, balanceCurrent) {
  const reportingPeriod = 6;
  const base = el('div.main__base');
  const form = createForm(account, balanceCurrent);
  const graph = createGraph(
    account,
    transactions,
    balanceCurrent,
    reportingPeriod
  );
  const table = createTable(account, transactions);
  const cardG = createCardTemplate('card--graph', 'Динамика баланса', graph);
  const cardT = createCardTemplate('card--table', 'История переводов', table);

  setChildren(base, [form, cardG, cardT]);
  return base;
}

function createForm(account, balanceCurrent) {
  const arr = [
    { name: '61253747452820828268825011', val: '61253747452820828268825011' },
    { name: '05168707632801844723808510', val: '05168707632801844723808510' },
    { name: '17307867273606026235887604', val: '17307867273606026235887604' },
    { name: '27120208050464008002528428', val: '27120208050464008002528428' },
    { name: '2222400070000005', val: '2222400070000005' },
    { name: '5555341244441115', val: '5555341244441115' },
  ];

  const selectRecipient = createSelect(arr, 'to');

  const inputAmount = el('input.form-control', {
    type: 'number',
    required: true,
    name: 'amount',
  });
  const button = createButtonSend();
  const form = el(
    'form.form.form--transfer',
    el(
      'div.form__wrap',
      el('h2.form__title', 'Новый перевод'),
      el(
        'label.form-label.form__label',
        el('span.form__label-text', 'Номер счёта получателя'),
        selectRecipient
      ),
      el(
        'label.form-label.form__label',
        el('span.form__label-text', 'Сумма перевода'),
        inputAmount
      ),
      button
    )
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(event, account, balanceCurrent);
  });

  return form;
}

function handleSubmit(event, account, balanceCurrent) {
  const formData = new FormData(event.target);
  formData.append('from', account);
  formData.append('balance', balanceCurrent);
  const formObj = Object.fromEntries(formData);

  event.target.dispatchEvent(
    new CustomEvent('submit-make-transaction', {
      bubbles: true,
      detail: { data: formObj },
    })
  );
}
