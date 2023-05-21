import { el } from 'redom';

export function createTable() {
  const thead = createThead();
  const tbody = createTbody();
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

function createTbody() {
  const arr = [
    { accS: '1234', accR: '1234', amount: '1234', data: '12.11.2022' },
    { accS: '1234', accR: '1234', amount: '1234', data: '12.11.2022' },
    { accS: '1234', accR: '1234', amount: '1234', data: '12.11.2022' },
  ];
  const tbody = el('tbody.tbody');
  arr.forEach((item) => {
    const row = createTrow(item);
    tbody.append(row);
  });

  return tbody;
}

function createTrow(item) {
  const row = el(
    'tr.tr',
    el('td.td', item.accS),
    el('td.td', item.accR),
    el('td.td', item.amount),
    el('td.td', item.data)
  );
  return row;
}
