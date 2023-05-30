import { el } from 'redom';
import { createCardTemplate } from '../elements/card-template.js';
import { createCurrenciesListItem } from '../elements/card-currencies.js';
export { createCardExchangeRate, createExchangeRateList };

const currenciesExchangeRateList = el('ul.card__list');

function createCardExchangeRate() {
  const cardCurrenciesExchangeRate = createCardTemplate(
    'card--shade.card--exchange-rate',
    'Изменение курсов в реальном времени',
    currenciesExchangeRateList
  );

  return cardCurrenciesExchangeRate;
}

function createExchangeRateList(dataExchange) {
  if (dataExchange) {
    const title = `${dataExchange.from}/${dataExchange.to}`;
    const item = createCurrenciesListItem(title, dataExchange.rate);
    const sighRateChange = createSignRateChange(dataExchange.change);

    // item.li.append(sighRateChange);
    item.itemValue.append(sighRateChange);
    currenciesExchangeRateList.prepend(item.li);

    if (currenciesExchangeRateList.children.length > 21) {
      currenciesExchangeRateList.lastChild.remove();
    }
  }
}

function createSignRateChange(flagDirection) {
  const span = el(
    `span.bg-arrow.bg-arrow--${getSignRateChangeClass(flagDirection)}`
  );
  return span;
}

function getSignRateChangeClass(flagDirection) {
  if (flagDirection === 1) {
    return 'green';
  } else if (flagDirection === -1) {
    return 'red';
  } else {
    return '';
  }
}
