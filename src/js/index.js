import '../styles/main.scss';
import { el, setChildren } from 'redom';
import { createHeader } from './sections/create-header.js';
import { createPageEntrance } from './sections/create-page-entrance.js';
import { createPageAccountsList } from './sections/create-page-accounts-list.js';
import { createPageAccountDetailed } from './sections/create-page-account-detailed.js';
import { createPageHistoryBalance } from './sections/create-pager-history.js';
import { authorization } from './connection/client-server.js';

document.addEventListener('submit-login', handleLogin);

async function handleLogin(event) {
  const response = await authorization(event.detail.data);
  // console.log(response);
}

const body = document.querySelector('body');
const containerApp = el('div.container-app');
const header = createHeader();
const main = el('main.main');
body.append(containerApp);
setChildren(containerApp, [header, main]);

renderPageEntrence();
// renderPageAccountsList();
// renderPageAccountDetailed();
// renderPageHistoriBalance();

function renderPageEntrence() {
  const page = createPageEntrance();
  renderPage(page);
}

function renderPageAccountsList() {
  const page = createPageAccountsList();
  renderPage(page);
}

function renderPageAccountDetailed() {
  const page = createPageAccountDetailed();
  renderPage(page);
}

function renderPageHistoriBalance() {
  const page = createPageHistoryBalance();
  renderPage(page);
}

function renderPage(page) {
  main.innerHTML = '';
  main.append(page);
}

// selectInit();
// function selectInit(elem) {
//   const select = new Choices(elem, {
//     allowHTML: true,
//   });
// return select;
// }
