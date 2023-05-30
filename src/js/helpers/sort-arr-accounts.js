export function sortArrAccounts(arrAccounts, sortAccountsBy) {
  arrAccounts.sort((a, b) => b[sortAccountsBy] - a[sortAccountsBy]);
}
