export { authorization };
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
  const token = await response.json();
  return token;
}
