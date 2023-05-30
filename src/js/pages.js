import { el, setChildren } from 'redom';
import { createHeader } from './sections/create-header.js';
import { createPageEntrance } from './sections/create-page-entrance.js';
import { createPageAccountsList } from './sections/create-page-accounts-list.js';
import { createPageAccountDetailed } from './sections/create-page-account-detailed.js';
import { createPageHistoryBalance } from './sections/create-pager-history.js';
import { createPageCurrency } from './sections/create-page-currency.js';
import { createPageAtm } from './sections/create-page-atm.js';
import { yandexMapInit, addYMapLink } from './helpers/ymaps-init.js';
import {
  getAccountData,
  getAccounts,
  getUserCurrencies,
  getAllCurrencies,
  getAtm,
  parallelRequests,
} from './connection/client-server.js';
import { selectChoiceInit } from './helpers/select-choice-init.js';

export {
  renderPageEntrence,
  renderPageAccountsList,
  renderPageAccountDetailed,
  renderPageHistoriBalance,
  renderPageCurrency,
  renderPageAtm,
};

const body = document.querySelector('body');
const containerApp = el('div.container-app');
const header = createHeader();
const main = el('main.main');

body.append(containerApp);
setChildren(containerApp, [header, main]);

function renderPageEntrence() {
  const page = createPageEntrance();
  renderPage(page);
}

async function renderPageAccountsList(token, sortAccountsBy = 'account') {
  try {
    const response = await getAccounts(token);
    const parsed = await response.json();
    const arrAccounts = parsed.payload;
    const page = createPageAccountsList(arrAccounts, sortAccountsBy);
    renderPage(page);
    selectChoiceInit();
  } catch (error) {
    console.log(error);
  }
}

async function renderPageAccountDetailed(token, id) {
  const response = await getAccountData(token, id);
  if (response.payload) {
    const dataAccount = response.payload;
    dataAccount.transactions.reverse();
    const page = createPageAccountDetailed(dataAccount);
    renderPage(page);

    selectChoiceInit();
  } else {
    console.log(response.error);
  }
}

async function renderPageHistoriBalance(token, id) {
  const response = await getAccountData(token, id);
  if (response.payload) {
    const dataAccount = response.payload;
    dataAccount.transactions.reverse();
    const page = createPageHistoryBalance(dataAccount);
    renderPage(page);
  } else {
    console.log(response.error);
  }
}

async function renderPageCurrency(token) {
  const response = await parallelRequests([
    getAllCurrencies(token),
    getUserCurrencies(token),
  ]);

  if (response) {
    const page = createPageCurrency(response[0].payload, response[1].payload);
    renderPage(page);
    selectChoiceInit();
  } else {
    console.log(response.error);
  }
}

async function renderPageAtm(token) {
  addYMapLink();
  const response = await getAtm(token);
  if (response) {
    const page = createPageAtm();
    renderPage(page);
    yandexMapInit(response.payload);
  } else {
    console.log(response.error);
  }
}

function renderPage(page) {
  main.innerHTML = '';
  main.append(page);
}
