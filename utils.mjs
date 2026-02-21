export function addMonths(dateString, months) {
  const [year, month, day] = dateString.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));

  const targetMonth = d.getUTCMonth() + months;
  d.setUTCMonth(targetMonth);

  // Handle month overflow e.g. Jan 31 → Feb 28, not Mar 3
  if (d.getUTCMonth() !== ((targetMonth % 12) + 12) % 12) {
    d.setUTCDate(0);
  }

  return d;
}

function formatDateUTC(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function setIntervalDates(startDate) {
  const [year, month, day] = startDate.split("-").map(Number);
  const baseDate = new Date(Date.UTC(year, month - 1, day));

  const oneWeekLater = new Date(baseDate);
  oneWeekLater.setUTCDate(baseDate.getUTCDate() + 7);

  const oneMonthLater = addMonths(startDate, 1);
  const threeMonthsLater = addMonths(startDate, 3);
  const sixMonthsLater = addMonths(startDate, 6);

  const oneYearLater = new Date(baseDate);
  oneYearLater.setUTCFullYear(baseDate.getUTCFullYear() + 1);

  return [
    formatDateUTC(oneWeekLater),
    formatDateUTC(oneMonthLater),
    formatDateUTC(threeMonthsLater),
    formatDateUTC(sixMonthsLater),
    formatDateUTC(oneYearLater),
  ];
}