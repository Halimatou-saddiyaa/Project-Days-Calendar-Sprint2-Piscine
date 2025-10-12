// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

// export function getGreeting() {
//     return "Hello";
// }


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
      let day, monthOffset = 0;

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


