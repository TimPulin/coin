export function calculatePercent(currentValue, maxValue) {
  let percent = Math.ceil((currentValue * 100) / maxValue);
  if (percent > 100) percent = 100;
  return percent;
}
