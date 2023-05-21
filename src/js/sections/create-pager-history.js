import { el, setChildren } from 'redom';
import {
  createTitleBlock,
  createAccountInfo,
} from '../elements/main-top-elements.js';
import { createButtonGoBack } from '../elements/buttons.js';
import { createGraph, createGraphRatio } from '../elements/graph.js';
import { createCardTemplate } from '../elements/card-template.js';
import { createTable } from '../elements/table.js';

export function createPageHistoryBalance() {
  const container = el('div.container');
  const top = createMainTop();
  const base = createMainBase();
  setChildren(container, [top, base]);
  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock, insertButtonPlace } = createTitleBlock('История баланса');
  const accountInfo = createAccountInfo('12455242373623463', '1 235');
  const button = createButtonGoBack();
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock, accountInfo]);

  return mainTop;
}

function createMainBase() {
  const base = el('div.main__base');
  const graphDynamic = createGraph();
  const graphRation = createGraphRatio();
  const table = createTable();
  const cardDynamic = createCardTemplate(
    'card--graph',
    'Динамика баланса',
    graphDynamic
  );
  const cardRatio = createCardTemplate(
    'card--graph',
    'Соотношение входящих исходящих транзакций',
    graphRation
  );
  const cardT = createCardTemplate('card--table', 'История переводов', table);

  setChildren(base, [cardDynamic, cardRatio, cardT]);
  return base;
}
