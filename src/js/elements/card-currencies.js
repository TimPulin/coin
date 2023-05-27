import { el } from 'redom';
import { createCardTemplate } from './card-template.js';
export { createCardUserCurrencies, createCurrenciesListItem };

function createCardUserCurrencies(dataUserCurrencies) {
  const userCurrenciesList = createUserCurrenciesList(dataUserCurrencies);
  const cardUserCurrencies = createCardTemplate(
    'temporary',
    'Ваши валюты',
    userCurrenciesList
  );
  return cardUserCurrencies;
}

function createUserCurrenciesList(incomingObj) {
  const list = el('ul.card__list');
  for (let item in incomingObj) {
    const currency = incomingObj[item];
    const { li } = createCurrenciesListItem(currency.code, currency.amount);
    list.append(li);
  }
  return list;
}

function createCurrenciesListItem(title, value) {
  const itemTitle = el('span.relationship__title', title);
  const itemValue = el('span.relationship__value', value);
  const li = el(
    'li.relationship',
    el('.relationship__wrap-title', itemTitle),
    itemValue
  );
  return { li, itemTitle, itemValue };
}
