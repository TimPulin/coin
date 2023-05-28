import Navigo from 'navigo';
import {
  renderPageAccountDetailed,
  renderPageAccountsList,
  renderPageEntrence,
  renderPageHistoriBalance,
  renderPageCurrency,
  renderPageAtm,
} from '../pages.js';
import { getTokenFromSessionStorage } from './session-storage.js';
export const router = new Navigo('/');

router.on('/', () => {
  if (getTokenFromSessionStorage()) {
    router.navigate('/accounts');
  } else {
    renderPageEntrence();
  }
});

router.on('/accounts', () => {
  const token = getTokenFromSessionStorage();
  renderPageAccountsList(token);
});

router.on('/accounts/:id', ({ data: { id } }) => {
  const token = getTokenFromSessionStorage();
  renderPageAccountDetailed(token, id);
});

router.on('/accounts/:id/balance-history', ({ data: { id } }) => {
  const token = getTokenFromSessionStorage();
  renderPageHistoriBalance(token, id);
});

router.on('/currency', () => {
  const token = getTokenFromSessionStorage();
  renderPageCurrency(token);
});

router.on('/atm', () => {
  const token = getTokenFromSessionStorage();
  renderPageAtm(token);
});

router.resolve();
