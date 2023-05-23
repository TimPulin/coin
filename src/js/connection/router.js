import Navigo from 'navigo';
import {
  renderPageAccountDetailed,
  renderPageAccountsList,
  renderPageEntrence,
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
router.resolve();
