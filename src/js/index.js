import { router } from './connection/router.js';
import '../styles/main.scss';
import {
  renderPageEntrence,
  renderPageAccountsList,
  renderPageAccountDetailed,
  renderPageHistoriBalance,
} from './pages.js';
import {
  setTokenToSessionStorage,
  getTokenFromSessionStorage,
} from './connection/session-storage.js';
import {
  authorization,
  getAccounts,
  createNewAccount,
  makeTransaction,
  getAccountData,
} from './connection/client-server.js';

document.addEventListener('submit-login', handleLogin);
document.addEventListener('submit-make-transaction', handleMakeTransaction);
document.addEventListener('create-new-account', handleCreateNewAccount);

async function handleLogin(event) {
  const response = await authorization(event.detail.data);
  if (response.payload) {
    setTokenToSessionStorage(response.payload.token);
    router.navigate('/accounts');
  } else {
    console.log(response.error);
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
      console.log('успешно проведена');
      renderPageAccountDetailed(token, event.detail.data.from); //сделать оповещение "перевод успешно произведен"
    } else {
      console.log(response.error);
    }
  } else {
    console.log('недостаточно средств на счете');
    //сделать оповещение "недостаточно средств на счете"
  }
}

function isTransactionPossible(event) {
  return event.detail.data.amount <= event.detail.data.balance;
}
