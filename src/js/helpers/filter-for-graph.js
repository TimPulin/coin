import { formatMonthShort } from '../helpers/format-date.js';
import { getMax, getBalance, getMaxTransaction } from '../helpers/get-max.js';
import { getreportingPeriodEnd } from '../helpers/get-repporting-period-end.js';
import { calculatePercent } from '../helpers/calculate-percent.js';

export function getGraphArr(
  account,
  incomingArr,
  balanceCurrent,
  reportingPeriod
) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const currentDateInMillSec = currentDate.getTime();
  const reportingPeriodEnd = getreportingPeriodEnd(
    reportingPeriod,
    currentDate
  );

  const TransactionsByPeriod = getTransactionsByPeriod(
    currentDateInMillSec,
    incomingArr,
    reportingPeriodEnd
  );
  const filtredByMonthArr = countDownForFilterByMonth(
    TransactionsByPeriod,
    currentMonth,
    reportingPeriod
  );

  return makeGraphArr(account, filtredByMonthArr, balanceCurrent);
}

function getTransactionsByPeriod(
  currentDateInMillSec,
  incomingArr,
  reportingPeriodEnd
) {
  const arr = incomingArr.filter((item) => {
    const transactionDate = new Date(item.date).getTime();

    if (
      transactionDate > reportingPeriodEnd &&
      transactionDate < currentDateInMillSec
    ) {
      return true;
    }
  });

  return arr;
}

function countDownForFilterByMonth(incomingArr, currentMonth, reportingPeriod) {
  const NUMBEROFDECEMBER = 11;
  const outcomingArr = [];

  let monthToFilter = currentMonth;

  for (let index = 0; index < reportingPeriod; index++) {
    if (monthToFilter < 0) monthToFilter = NUMBEROFDECEMBER;
    const filtredByMonth = filterByMonth(incomingArr, monthToFilter);
    outcomingArr.push(filtredByMonth);

    if (!outcomingArr[index].length) {
      const obj = {};
      obj.month = monthToFilter;
      obj.amount = 0;
      outcomingArr[index].push(obj);
    }
    monthToFilter--;
  }
  return outcomingArr;
}

function filterByMonth(incomingArr, monthToFilter) {
  return incomingArr.filter((item) => {
    const itemMonth = new Date(item.date).getMonth();
    if (itemMonth === monthToFilter) {
      item.month = monthToFilter;
      return true;
    }
  });
}

function makeGraphArr(account, incomingArr, balanceCurrent) {
  const graphArr = [];
  incomingArr.forEach((item) => {
    const debit = {
      month: formatMonthShort(item[0].month),
      outcoming: 0,
      incoming: 0,
    };

    sortingItemByDebit(account, item, debit);
    graphArr.push(debit);
  });

  putBalance(graphArr, balanceCurrent);
  putBalancePercentage(graphArr);
  putTransactionPercentage(graphArr);
  return graphArr.reverse();
}

function sortingItemByDebit(account, incomingArr, debit) {
  incomingArr.forEach((item) => {
    if (account === item.to) {
      debit.incoming += item.amount;
    } else {
      debit.outcoming += item.amount;
    }
  });
}

function putBalance(graphArr, balanceCurrent) {
  graphArr.reduce((balance, item) => {
    item.balance = balance;
    return balance - item.incoming + item.outcoming;
  }, balanceCurrent);
}

function putBalancePercentage(graphArr) {
  const maxBalance = getMax(graphArr, getBalance);
  graphArr.forEach((item) => {
    item.balancePercent = calculatePercent(item.balance, maxBalance);
  });
}

function putTransactionPercentage(graphArr) {
  const maxTransaction = getMax(graphArr, getMaxTransaction);
  graphArr.forEach((item) => {
    item.incomingPercent = calculatePercent(item.incoming, maxTransaction);
    item.outcomingPercent = calculatePercent(item.outcoming, maxTransaction);
  });
}
