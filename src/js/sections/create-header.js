import { el, setChildren, mount } from 'redom';
import logoImgPath from '../../assets/images/logo.png';
import { removeTokenFromSessionStorage } from '../connection/session-storage';

export function createHeader() {
  const header = el('header.header');
  const container = el('div.container');
  const headerWrap = el('div.header__wrap');
  const logo = el('div.logo');
  const logoImgEl = el('img', { src: logoImgPath });
  const nav = createNav();

  header.append(container);
  container.append(headerWrap);
  setChildren(headerWrap, [logo, nav]);
  logo.append(logoImgEl);

  return header;
}

function createNav() {
  const nav = el('nav.header__nav.navigation');
  const navPanel = el('div.navigation__panel');
  const navList = createNavList();
  mount(nav, navPanel);
  mount(navPanel, navList);

  return nav;
}

function createNavList() {
  const navList = el('ul.navigation__list');
  const cashMashine = createNavItem('Банкоматы', '/atm');
  const accounts = createNavItem('Счета', '/accounts');
  const currency = createNavItem('Валюта', '/currency');
  const exit = createNavItem('Выйти', '/');
  exit.addEventListener('click', removeTokenFromSessionStorage);

  setChildren(navList, [cashMashine, accounts, currency, exit]);

  return navList;
}

function createNavItem(itemTitle, itemHref) {
  const item = el('li.navigation__item');
  const link = el(
    'a.navigation__link.btn.button.button--secondary',
    itemTitle,
    {
      href: itemHref,
    }
  );
  item.append(link);
  return item;
}
