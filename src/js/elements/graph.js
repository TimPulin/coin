import { el, setChildren } from 'redom';
import { getGraphArr } from '../helpers/filter-for-graph.js';

export { createGraph, createGraphRatio };

function createGraph(account, transactions) {
  const list = createGraphList(account, transactions);
  const limitBox = createGraphLimitBox();
  const body = createGraphBody(list, limitBox);
  return body;
}

function createGraphRatio() {
  const list = createGraphListRatio();
  const limitBox = createGraphLimitBox();
  const body = createGraphBody(list, limitBox);
  return body;
}

function createGraphBody(list, limitBox) {
  const body = el('div.graph', el('div.graph__body', list, limitBox));

  return body;
}

function createGraphList(account, transactions) {
  const graphArr = getGraphArr(account, transactions);

  const list = el('div.graph__list');
  graphArr.forEach((elem) => {
    const { item, itemColor } = createGraphItem(elem.month);
    itemColor.classList.add('graph__item-color--1');
    list.append(item);
  });

  return list;
}

function createGraphListRatio() {
  const arr = [
    { name: 'янв' },
    { name: 'янв' },
    { name: 'янв' },
    { name: 'янв' },
    { name: 'янв' },
    { name: 'янв' },
  ];
  const list = el('div.graph__list');
  arr.forEach((elem) => {
    const { item, itemColor } = createGraphItem(elem.name);
    itemColor.classList.add('graph__item-color--1');
    list.append(item);
  });

  return list;
}

function createGraphItem(name) {
  const itemColor = el('div.graph__item-color');
  const item = el(
    'div.graph__item',
    itemColor,
    el('div.graph__item-name', name)
  );
  return { item, itemColor };
}

function createGraphLimitBox() {
  const box = el('div.graph__limit-box');
  const min = el('span.graph__limit-min', '0');
  const max = el('span.graph__limit-max', '300');
  setChildren(box, [max, min]);
  return box;
}
