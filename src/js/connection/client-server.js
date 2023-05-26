export {
  authorization,
  getAccounts,
  createNewAccount,
  getAccountData,
  makeTransaction,
  getUserCurrencies,
};
const API = 'http://localhost:3000';

async function authorization({ login, password }) {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });
  const parsed = await response.json();
  return parsed;
}

async function getAccounts(token) {
  const response = await fetch(`${API}/accounts`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function createNewAccount(token) {
  const response = await fetch(`${API}/create-account`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function getAccountData(token, id) {
  const response = await fetch(`${API}/account/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function makeTransaction(token, { from, to, amount }) {
  const response = await fetch(`${API}/transfer-funds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  });
  const parsed = await response.json();
  return parsed;
}

async function getUserCurrencies(token) {
  console.log(token);
  const response = await fetch(`${API}/currencies`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

const socket = new WebSocket('wss://localhost:3000', {
  method: 'websocket',
  headers: {
    Authorization: `Basic ZGV2ZWxvcGVyOnNraWxsYm94`,
  },
});
