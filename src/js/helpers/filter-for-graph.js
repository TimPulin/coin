import { formatMonthShort } from '../helpers/format-date.js';
export function getGraphArr(account, incomingArr) {
  const currentMonth = new Date().getMonth();
  const lastSixMonthTrnsctns = getLastSixMonthTrnsctns(incomingArr);
  const filtredByMonthArr = countDownSixMonth(
    lastSixMonthTrnsctns,
    currentMonth
  );
  return cycleForSortingByDebit(account, filtredByMonthArr);
}

function getLastSixMonthTrnsctns(incomingArr) {
  const SIXMOUNT = 15552000000;
  const currentDate = Date.now();

  const index = incomingArr.findIndex((item, index) => {
    const dateTrans = Number(new Date(item.date));
    if (currentDate - dateTrans < SIXMOUNT) return index;
  });

  const outcomingArr = incomingArr.slice(index, incomingArr.length);
  return outcomingArr;
}

function countDownSixMonth(incomingArr, currentMonth) {
  const outcomingArr = [];
  let counter = currentMonth;
  let index = 0;
  let end = currentMonth - 6;

  while (counter > end) {
    let monthToFilter = counter;
    if (counter < 0) monthToFilter = 12 + counter;

    const filtredByMonth = filteringByMonth(incomingArr, monthToFilter);
    outcomingArr.push(filtredByMonth);

    if (!outcomingArr[index].length) {
      const obj = {};
      obj.month = monthToFilter;
      outcomingArr[index].push(obj);
    }
    counter--;
    index++;
  }
  return outcomingArr;
}

function filteringByMonth(incomingArr, monthToFilter) {
  return incomingArr.filter((item) => {
    const itemMonth = new Date(item.date).getMonth();
    if (itemMonth === monthToFilter) {
      item.month = monthToFilter;
      return true;
    }
  });
}

function cycleForSortingByDebit(account, incomingArr) {
  const graphArr = [];

  incomingArr.forEach((item) => {
    const debit = {
      outcoming: [],
      incoming: [],
    };

    sortingItemByDebit(account, item, debit);
    graphArr.push(debit);
  });
  return graphArr.reverse();
}

function sortingItemByDebit(account, incomingArr, debit) {
  debit.month = formatMonthShort(incomingArr[0].month);
  incomingArr.forEach((item) => {
    if (account === item.to) {
      debit.incoming.push(item.amount);
    } else {
      debit.outcoming.push(item.amount);
    }
  });
}
