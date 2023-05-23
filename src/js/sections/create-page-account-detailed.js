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

export function createPageAccountDetailed({ account, balance, transactions }) {
  const container = el('div.container');
  const top = createMainTop(account, balance);
  const base = createMainBase(account, transactions);
  setChildren(container, [top, base]);
  return container;
}

function createMainTop(account, balance) {
  const mainTop = el('div.main__top');
  const { titleBlock, insertButtonPlace } = createTitleBlock('Просмотр счёта');
  const accountInfo = createAccountInfo(account, balance);
  const button = createButtonGoBack();
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock, accountInfo]);

  return mainTop;
}

function createMainBase(account, transactions) {
  const base = el('div.main__base');
  const form = createForm();
  const graph = createGraph(account, transactions);
  const table = createTable(account, transactions);
  const cardG = createCardTemplate('card--graph', 'Динамика баланса', graph);
  const cardT = createCardTemplate('card--table', 'История переводов', table);

  setChildren(base, [form, cardG, cardT]);
  return base;
}

function createForm() {
  const arr = [
    { name: '1222', val: '1222' },
    { name: '11333', val: '11333' },
    { name: '114444', val: '14444' },
  ];

  const selectRecipient = createSelect(arr);
  const inputAmount = el('input.form-control', {
    type: 'number',
    required: true,
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

  return form;
}
