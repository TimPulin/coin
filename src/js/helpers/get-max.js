import { calculatePercent } from '../helpers/calculate-percent.js';
export { getMax, getBalance, getMaxTransaction, getMaxInOutTransactions };

function getMax(incomingArr, currentFunction) {
  const max = Math.floor(
    Math.max.apply(
      null,
      incomingArr.map((item) => {
        return Number(currentFunction(item));
      })
    )
  );
  return max;
}

function getMaxTransaction(item) {
  return item.incoming > item.outcoming ? item.incoming : item.outcoming;
}

function getBalance(item) {
  return item.balance;
}

function getMaxInOutTransactions(incomingArr) {
  const maxIncoming = getMax(incomingArr, getIncoming);
  const maxOutcoming = getMax(incomingArr, getOutcoming);
  const obj = {
    larger: getLarger(maxIncoming, maxOutcoming),
    smaller: getSmaller(maxIncoming, maxOutcoming),
  };
  obj.smallerPercent = calculatePercent(obj.smaller, obj.larger);
  return obj;
}

function getOutcoming(item) {
  return item.outcoming;
}

function getIncoming(item) {
  return item.incoming;
}

function getLarger(first, second) {
  return first > second ? first : second;
}

function getSmaller(first, second) {
  return first < second ? first : second;
}
