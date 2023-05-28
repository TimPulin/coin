import { el, setChildren } from 'redom';
import { createTitleBlock } from '../elements/main-top-elements.js';

export function createPageAtm() {
  const container = el('div.container');
  const top = createMainTop();
  const base = createMainBase();

  setChildren(container, [top, base]);

  return container;
}

function createMainTop() {
  const mainTop = el('div.main__top');
  const { titleBlock } = createTitleBlock('Карта банкоматов');

  setChildren(mainTop, [titleBlock]);

  return mainTop;
}

function createMainBase() {
  const base = el('div.main__base');
  const map = el('#map-yandex');
  setChildren(base, [map]);
  return base;
}
