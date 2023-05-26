import { el, setChildren } from 'redom';
import {
  createTitleBlock,
  createAccountInfo,
} from '../elements/main-top-elements.js';
import { createButtonGoBack } from '../elements/buttons.js';
import { createGraph, createGraphRatio } from '../elements/graph.js';
import { createCardTemplate } from '../elements/card-template.js';
import { createTable } from '../elements/table.js';

export function createPageHistoryBalance({
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
  const { titleBlock, insertButtonPlace } = createTitleBlock('История баланса');
  const accountInfo = createAccountInfo(account, balanceCurrent);
  const button = createButtonGoBack();
  insertButtonPlace.append(button);

  setChildren(mainTop, [titleBlock, accountInfo]);

  return mainTop;
}

function createMainBase(account, transactions, balanceCurrent) {
  const reportingPeriod = 12;
  const base = el('div.main__base');
  const graphDynamic = createGraph(
    account,
    transactions,
    balanceCurrent,
    reportingPeriod
  );
  const graphRation = createGraphRatio(
    account,
    transactions,
    balanceCurrent,
    reportingPeriod
  );
  const table = createTable(account, transactions);
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
