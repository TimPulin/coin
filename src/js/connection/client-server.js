export {
  authorization,
  getAccounts,
  createNewAccount,
  getAccountData,
  makeTransaction,
  makeCurrencyBuy,
  getUserCurrencies,
  getAllCurrencies,
  getAtm,
  parallelRequests,
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
  return response;
}

async function getAccounts(token) {
  const response = await fetch(`${API}/accounts`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return response;
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

async function makeCurrencyBuy(token, { from, to, amount }) {
  const response = await fetch(`${API}/currency-buy`, {
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
  const response = await fetch(`${API}/currencies`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function getAllCurrencies(token) {
  const response = await fetch(`${API}/all-currencies`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function getAtm(token) {
  const response = await fetch(`${API}/banks`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}

async function parallelRequests(requestsArr) {
  const response = await Promise.all(requestsArr);
  return response;
}

const socket = new WebSocket('ws://localhost:3000/currency-feed');

socket.onmessage = async function (event) {
  const data = event.data;
  const message = JSON.parse(data);
  if (message.type === 'EXCHANGE_RATE_CHANGE') {
    document.dispatchEvent(
      new CustomEvent('change-rate-message', {
        bubbles: true,
        detail: { data: message },
      })
    );
  }
};
