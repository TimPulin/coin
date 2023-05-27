import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import { createCardUserCurrencies } from '../elements/card-currencies.js';
import { createCardExchangeRate } from './create-card-exchange-rate.js';
import { createCardCurrenciesTrade } from '../elements/card-trade.js';

export function createPageCurrency(dataUserCurrencies) {
  const container = el('div.container');
  const mainTop = createMainTop();
  const mainBase = createMainBase(dataUserCurrencies);
  setChildren(container, [mainTop, mainBase]);
  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock } = createTitleBlock('Валютный обмен');

  setChildren(mainTop, [titleBlock]);

  return mainTop;
}

function createMainBase(dataUserCurrencies) {
  const mainBase = el('.main__base.main__base--split');
  const sideLeft = el('.main__side');
  const sideRight = el('.main__side');
  const cardUserCurrencies = createCardUserCurrencies(dataUserCurrencies);
  const cardCurrenciesTrade = createCardCurrenciesTrade();
  const cardCurrenciesExchangeRate = createCardExchangeRate();

  setChildren(sideLeft, [cardUserCurrencies, cardCurrenciesTrade]);
  setChildren(sideRight, [cardCurrenciesExchangeRate]);
  setChildren(mainBase, [sideLeft, sideRight]);

  return mainBase;
}
