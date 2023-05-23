import { el, setChildren } from 'redom';
import { createHeader } from './sections/create-header.js';
import { createPageEntrance } from './sections/create-page-entrance.js';
import { createPageAccountsList } from './sections/create-page-accounts-list.js';
import { createPageAccountDetailed } from './sections/create-page-account-detailed.js';
import { createPageHistoryBalance } from './sections/create-pager-history.js';
import { getAccountData, getAccounts } from './connection/client-server.js';

export {
  renderPageEntrence,
  renderPageAccountsList,
  renderPageAccountDetailed,
  renderPageHistoriBalance,
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

async function renderPageAccountsList(token) {
  const response = await getAccounts(token);
  if (response.payload) {
    const arrAccounts = response.payload;
    const page = createPageAccountsList(arrAccounts);
    renderPage(page);
  } else {
    console.log(response.error);
  }
}

async function renderPageAccountDetailed(token, id) {
  const response = await getAccountData(token, id);
  if (response.payload) {
    const dataAccount = response.payload;
    const page = createPageAccountDetailed(dataAccount);
    renderPage(page);
  } else {
    console.log(response.error);
  }
}

function renderPageHistoriBalance() {
  const page = createPageHistoryBalance();
  renderPage(page);
}

function renderPage(page) {
  main.innerHTML = '';
  main.append(page);
}
