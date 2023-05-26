import { el, setChildren } from 'redom';
export { createTitleBlock, createAccountInfo };

function createTitleBlock(title) {
  const titleBlock = el('div.main__title-block');
  const insertButtonPlace = el('div');
  const titleWrapper = el('div.title-wrapper');
  const insertSelectPlace = el('div.flex');
  const pageTitle = el('h1.page-title', title);

  setChildren(titleWrapper, [pageTitle, insertSelectPlace]);
  setChildren(titleBlock, [titleWrapper, insertButtonPlace]);

  return { titleBlock, insertSelectPlace, insertButtonPlace };
}

function createAccountInfo(accNumber, accAmount) {
  const accountInfo = el('div.main__account-info');
  const accountNumber = el('span.main__account-number', accNumber);
  const balanceBlock = el('div.main__balance');
  const balanceTitle = el('span.main__balance-title', 'Баланс');
  const balanceAmount = el('span.main__balance-amount', accAmount);
  const balanceHistory = el('a.link--balance-history', {
    href: `/accounts/${accNumber}/balance-history`,
  });
  setChildren(balanceHistory, [balanceTitle, balanceAmount]);
  setChildren(balanceBlock, [balanceHistory]);
  setChildren(accountInfo, [accountNumber, balanceBlock]);

  return accountInfo;
}
