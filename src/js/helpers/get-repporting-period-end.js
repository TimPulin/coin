export function getreportingPeriodEnd(reportingPeriod, currentDate) {
  const MONTHAMOUNTINYEAR = 12;
  const startMonthReal = currentDate.getMonth() + 1;
  const startYear = currentDate.getFullYear();
  let endYear = startYear;
  let reportingPeriodInMillSec;

  let endMonth = startMonthReal - (reportingPeriod - 1);
  if (endMonth <= 0) {
    endMonth += MONTHAMOUNTINYEAR;
    endYear--;
  }

  reportingPeriodInMillSec = new Date(`${endYear}.${endMonth}`).getTime();

  return reportingPeriodInMillSec;
}
