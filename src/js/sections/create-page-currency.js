import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import { createCardUserCurrencies } from '../elements/card-currencies.js';
import { createCardExchangeRate } from './create-card-exchange-rate.js';
import { createCardCurrenciesTrade } from '../elements/card-trade.js';

export function createPageCurrency(dataAllCurrencies, dataUserCurrencies) {
  const container = el('div.container');
  const mainTop = createMainTop();
  const mainBase = createMainBase(dataAllCurrencies, dataUserCurrencies);
  setChildren(container, [mainTop, mainBase]);
  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock } = createTitleBlock('Валютный обмен');

  setChildren(mainTop, [titleBlock]);

  return mainTop;
}

function createMainBase(dataAllCurrencies, dataUserCurrencies) {
  const mainBase = el('.main__base.main__base--split');
  const sideLeft = el('.main__side');
  const sideRight = el('.main__side');
  const allCurrenciesObj = makeObj(dataAllCurrencies);
  const cardUserCurrencies = createCardUserCurrencies(dataUserCurrencies);
  const cardCurrenciesTrade = createCardCurrenciesTrade(allCurrenciesObj);
  const cardCurrenciesExchangeRate = createCardExchangeRate();

  setChildren(sideLeft, [cardUserCurrencies, cardCurrenciesTrade]);
  setChildren(sideRight, [cardCurrenciesExchangeRate]);
  setChildren(mainBase, [sideLeft, sideRight]);

  return mainBase;
}

function makeObj(incomingArr) {
  const arr = [];
  incomingArr.forEach((item) => {
    const obj = {};
    obj.name = item;
    obj.val = item;
    arr.push(obj);
  });
  return arr;
}
