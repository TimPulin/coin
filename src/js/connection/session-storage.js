export function setTokenToSessionStorage(token) {
  sessionStorage.setItem('token', token);
}

export function getTokenFromSessionStorage() {
  return sessionStorage.getItem('token');
}
