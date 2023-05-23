export { authorization, getAccounts, createNewAccount, getAccountData };
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
  console.log(`token ${token}`);
  const response = await fetch(`${API}/account/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const parsed = await response.json();
  return parsed;
}
