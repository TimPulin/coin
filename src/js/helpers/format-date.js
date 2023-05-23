export { formatDateMonthWord, formatDateMonthDigit, formatMonthShort };

function formatDateMonthWord(incomingDate) {
  const newDate = new Date(incomingDate);
  const day = addNullToBegin(newDate.getDate());
  const month = formatMonth(newDate.getMonth());
  const formatedDate = `${day} ${month} ${newDate.getFullYear()}`;
  return formatedDate;
}

function formatDateMonthDigit(incomingDate) {
  const newDate = new Date(incomingDate);
  const day = addNullToBegin(newDate.getDate());
  const month = addNullToBegin(newDate.getMonth() + 1);
  const formatedDate = `${day} ${month} ${newDate.getFullYear()}`;
  return formatedDate;
}

function addNullToBegin(incomingDate) {
  return incomingDate < 10 ? `0${incomingDate}` : incomingDate;
}

function formatMonth(incomingMonth) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return months[incomingMonth];
}

function formatMonthShort(incomingMonth) {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'нояб',
    'дек',
  ];
  return months[incomingMonth];
}
