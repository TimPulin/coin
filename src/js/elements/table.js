import { el } from 'redom';
import { formatDateMonthDigit } from '../helpers/format-date.js';

export function createTable(account, transactions) {
  const thead = createThead();
  const tbody = createTbody(account, transactions);
  const table = el('table.table', thead, tbody);
  return table;
}

function createThead() {
  const thead = el(
    'thead.thead',
    el(
      'tr.tr',
      el('th.th', 'Счёт отправителя'),
      el('th.th', 'Счёт получателя'),
      el('th.th', 'Сумма'),
      el('th.th', 'Дата')
    )
  );
  return thead;
}

function createTbody(account, transactions) {
  const tbody = el('tbody.tbody');

  if (!transactions.length) {
    const row = createEmptyTrow();
    tbody.append(row);
  }

  transactions.forEach((item) => {
    const row = createTrow(account, item);
    tbody.append(row);
  });

  return tbody;
}

function createTrow(account, item) {
  const debitClass = getDebitClass(account, item.to);
  const row = el(
    'tr.tr',
    el('td.td', item.from),
    el('td.td', item.to),
    el(`td.td.td__amount.${debitClass}`, item.amount),
    el('td.td', formatDateMonthDigit(item.date))
  );
  return row;
}

function getDebitClass(account, recipient) {
  return account === recipient
    ? 'td__amount--positive'
    : 'td__amount--negative';
}

function createEmptyTrow() {
  const row = el(
    'tr.tr.tr--message',
    el('td.td', 'Транзакций нет', { colspan: 4 })
  );
  return row;
}
