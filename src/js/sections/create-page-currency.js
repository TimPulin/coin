import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';
import { createCardTemplate } from '../elements/card-template.js';
import {
  createSelect,
  createButtonAddNewAccount,
} from '../elements/buttons.js';

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
  const userCurrenciesList = createCurrenciesList(dataUserCurrencies);
  const allCurrenciesExchangeRateList =
    createCurrenciesList(dataUserCurrencies);
  const cardUserCurrencies = createCardTemplate(
    'temporary',
    'Ваши валюты',
    userCurrenciesList
  );
  const cardAllCurrenciesExchangeRate = createCardTemplate(
    'card--shade',
    'Изменение курсов в реальном времени',
    allCurrenciesExchangeRateList
  );
  setChildren(sideLeft, [cardUserCurrencies]);
  setChildren(sideRight, [cardAllCurrenciesExchangeRate]);
  setChildren(mainBase, [sideLeft, sideRight]);
  return mainBase;
}

function createCurrenciesList(incomingObj, flagSignRateChange = false) {
  //   console.log(incomingObj);
  const list = el('ul.card__list');
  for (let item in incomingObj) {
    const currency = incomingObj[item];
    const li = el(
      'li.relationship',
      el(
        '.relationship__wrap-title',
        el('span.relationship__title', currency.code)
      ),
      el('span.relationship__value', currency.amount)
    );
    if (flagSignRateChange) createSignRateChange(li);
    list.append(li);
  }

  return list;
}

function createSignRateChange(element) {
  console.log();
}
