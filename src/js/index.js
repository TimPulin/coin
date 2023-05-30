import { router } from './connection/router.js';
import '../styles/main.scss';
import { renderPopupMessage } from './elements/popup-message.js';
import { addYMapLink } from './helpers/ymaps-init.js';
import {
  renderPageAccountsList,
  renderPageAccountDetailed,
  renderPageCurrency,
} from './pages.js';
import { createExchangeRateList } from './sections/create-card-exchange-rate.js';
import {
  setTokenToSessionStorage,
  getTokenFromSessionStorage,
} from './connection/session-storage.js';
import {
  authorization,
  createNewAccount,
  makeCurrencyBuy,
  makeTransaction,
} from './connection/client-server.js';

addYMapLink();

document.addEventListener('submit-login', handleLogin);
document.addEventListener('submit-make-transaction', handleMakeTransaction);
document.addEventListener('create-new-account', handleCreateNewAccount);
document.addEventListener('change-rate-message', handleChangeRateMessage);
document.addEventListener('submit-currencies-buy', handleCurrenciesBuy);
document.addEventListener('sort-accounts', handleSortAccounts);

async function handleLogin(event) {
  try {
    const response = await authorization(event.detail.data);
    const parsed = await response.json();
    if (parsed.payload) {
      setTokenToSessionStorage(parsed.payload.token);
      router.navigate('/accounts');
    } else {
      event.detail.messageField.textContent = parsed.error;
    }
  } catch (error) {
    console.log(error);
    //TODO сообщение 'что-то пошло не так. попробуйте перезагрузить страницу'
  }
}

async function handleCreateNewAccount() {
  const token = getTokenFromSessionStorage();
  const response = await createNewAccount(token);
  if (response.payload) {
    renderPageAccountsList(token);
  } else {
    console.log(response.error);
  }
}

async function handleMakeTransaction(event) {
  const token = getTokenFromSessionStorage();

  if (isTransactionPossible(event)) {
    const response = await makeTransaction(token, event.detail.data);
    if (response.payload) {
      renderPopupMessage('Транзакция успешно проведена');
      renderPageAccountDetailed(token, event.detail.data.from);
    } else {
      console.log(response.error);
    }
  } else {
    renderPopupMessage('Недостаточно средств на счете');
  }
}

function isTransactionPossible(event) {
  console.log(event.detail.data.amount, event.detail.data.balance);
  return Number(event.detail.data.amount) < Number(event.detail.data.balance);
}

function handleChangeRateMessage(event) {
  createExchangeRateList(event.detail.data);
}

async function handleCurrenciesBuy(event) {
  const token = getTokenFromSessionStorage();
  const response = await makeCurrencyBuy(token, event.detail.data);
  if (response.payload) {
    renderPageCurrency(token);
  } else {
    console.log(response.error);
    renderPopupMessage('Недостаточно средств на счете');
  }
}

function handleSortAccounts(event) {
  const token = getTokenFromSessionStorage();
  renderPageAccountsList(token, event.detail.data);
}
