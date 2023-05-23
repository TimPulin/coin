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
} from './connection/client-server.js';

document.addEventListener('submit-login', handleLogin);
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

// selectInit();
// function selectInit(elem) {
//   const select = new Choices(elem, {
//     allowHTML: true,
//   });
// return select;
// }
