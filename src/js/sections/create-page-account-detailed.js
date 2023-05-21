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

export function createPageAccountDetailed() {
  const container = el('div.container');
  const top = createMainTop();
  const base = createMainBase();
  setChildren(container, [top, base]);
  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock, insertButtonPlace } = createTitleBlock('Просмотр счёта');
  const accountInfo = createAccountInfo('12455242373623463', '1 235');
  const button = createButtonGoBack();
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock, accountInfo]);

  return mainTop;
}

function createMainBase() {
  const base = el('div.main__base');
  const form = createForm();
  const graph = createGraph();
  const table = createTable();
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
