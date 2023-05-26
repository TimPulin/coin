import { el, setChildren } from 'redom';
import { getGraphArr } from '../helpers/filter-for-graph.js';
import {
  getMax,
  getBalance,
  getMaxInOutTransactions,
} from '../helpers/get-max.js';

export { createGraph, createGraphRatio };

function createGraph(account, transactions, balanceCurrent, reportingPeriod) {
  const graphArr = getGraphArr(
    account,
    transactions,
    balanceCurrent,
    reportingPeriod
  );
  const limitBoxMax = getMax(graphArr, getBalance);

  const list = createGraphList(graphArr);
  const limitBox = createGraphLimitBox(limitBoxMax);
  const body = createGraphBody(list, limitBox);
  return body;
}

function createGraphRatio(
  account,
  transactions,
  balanceCurrent,
  reportingPeriod
) {
  const graphArr = getGraphArr(
    account,
    transactions,
    balanceCurrent,
    reportingPeriod
  );
  const { larger, smaller, smallerPercent } = getMaxInOutTransactions(graphArr);
  const list = createGraphListRatio(graphArr);
  const limitItem = createLimitItem(smaller, smallerPercent);
  const limitBox = createGraphLimitBox(larger);
  limitBox.append(limitItem);

  const body = createGraphBody(list, limitBox, 'graph--ratio');
  return body;
}

function createGraphBody(list, limitBox, aditionalClass = '') {
  const body = el(
    `div.graph.${aditionalClass}`,
    el('div.graph__body', list, limitBox)
  );

  return body;
}

function createGraphList(graphArr) {
  const list = el('div.graph__list');
  graphArr.forEach((elem) => {
    const item = createGraphItem(elem.month);
    const itemColor = createItemColor(elem.balancePercent, 1);
    item.append(itemColor);
    list.append(item);
  });

  return list;
}

function createGraphListRatio(graphArr) {
  const list = el('div.graph__list');
  graphArr.forEach((elem) => {
    const item = createGraphItem(elem.month);
    const itemColor1 = createItemColor(elem.incomingPercent, 1);
    const itemColor2 = createItemColor(elem.outcomingPercent, 2);
    addClassSmaler(
      itemColor1,
      itemColor2,
      elem.incomingPercent,
      elem.outcomingPercent
    );
    setChildren(item, [itemColor1, itemColor2]);
    list.append(item);
  });

  return list;
}

function createGraphItem(name) {
  const item = el('div.graph__item', el('div.graph__item-name', name));
  return item;
}

function createItemColor(colorHeight, index) {
  const itemColor = el(`div.graph__item-color.graph__item-color--${index}`, {
    style: `height:${colorHeight}%;`,
  });
  return itemColor;
}

function addClassSmaler(itemColor1, itemColor2, percent1, percent2) {
  percent1 > percent2
    ? itemColor2.classList.add('graph__item-color--smaler')
    : itemColor1.classList.add('graph__item-color--smaler');
}

function createGraphLimitBox(limitBoxMax) {
  const box = el('div.graph__limit-box');
  const min = el('span.graph__limit-item.graph__limit-item--min', '0');
  const max = el('span.graph__limit-max', `${limitBoxMax}`, {
    style: 'height:100%;',
  });

  setChildren(box, [min, max]);
  return box;
}

function createLimitItem(text, itemHeight) {
  const item = el('span.graph__limit-item', `${text}`, {
    style: `height:calc(${itemHeight}% + 10px);`,
  });

  return item;
}
