// Convert JS day (0=Sunday..6=Saturday) to ISO weekday (1=Monday..7=Sunday)

export function jsDayToIso(jsDay) {
  return jsDay === 0 ? 7 : jsDay;
}

// Get number of days in a month

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * Generate a 2D array representing the calendar weeks.
 * Each inner array represents one week (Monday–Sunday),
 * containing objects with { day, monthOffset }.
 *
 * @param {number} year - The year (e.g. 2025)
 * @param {number} month - The month number (1–12)
 * @returns {Array[]} - Array of weeks with day data
 */

export function generateCalendarMatrix(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const firstIso = jsDayToIso(firstDay.getDay());
  const daysInMonth = getDaysInMonth(year, month);

  // Days in the previous month (for padding)

  const prevMonthDays = getDaysInMonth(year, month - 1);

  // Start calendar on Monday → number of blanks before day 1

  const daysBefore = firstIso - 1;
  const totalCells = daysBefore + daysInMonth;
  const totalWeeks = Math.ceil(totalCells / 7);

  const weeks = [];
  let currentDay = 1 - daysBefore;

  for (let w = 0; w < totalWeeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      let day,
        monthOffset = 0;

      if (currentDay < 1) {
        // From previous month
        day = prevMonthDays + currentDay;
        monthOffset = -1;
      } else if (currentDay > daysInMonth) {
        // From next month
        day = currentDay - daysInMonth;
        monthOffset = 1;
      } else {
        // From current month
        day = currentDay;
      }

      week.push({ day, monthOffset });
      currentDay++;
    }
    weeks.push(week);
  }

  return weeks;
}

//Get the date (day number) of the nth weekday in a given month.

export function getNthWeekdayOfMonth(year, month, weekdayName, occurrence) {
  const weekdayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekday = weekdayNames.indexOf(weekdayName);
  if (weekday === -1) throw new Error(`Invalid weekday name: ${weekdayName}`);

  const daysInMonth = getDaysInMonth(year, month);
  const days = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const jsWeekday = (date.getDay() + 6) % 7; // Monday=0
    if (jsWeekday === weekday) days.push(d);
  }

  switch (occurrence?.toLowerCase()) {
    case "first":
      return days[0];
    case "second":
      return days[1];
    case "third":
      return days[2];
    case "fourth":
      return days[3];
    case "last":
      return days[days.length - 1];
    default:
      return null;
  }
}
