// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { generateCalendarMatrix } from "./common.mjs";
import daysData from "../days.json" with { type: "json" };

window.onload = function() {


// Get DOM elements
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');

// List of month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Render a month view
function renderCalendar(year, month) {
  // Clear old content
  calendar.innerHTML = '';

  // Update header title
  monthYear.textContent = `${monthNames[month - 1]} ${year}`;

  // Get the week/day structure from common.mjs
  const weeks = generateCalendarMatrix(year, month);

  // Build the grid
  for (const week of weeks) {
    for (const dayInfo of week) {
      const div = document.createElement('div');
      div.classList.add('day-box');

      // Light gray for days not in the current month
      if (dayInfo.monthOffset !== 0) {
        div.style.background = '#f2f2f2';
        div.style.color = '#999';
      }

      div.textContent = dayInfo.day;
      calendar.appendChild(div);
    }
  }
}

// === On page load, show current month ===
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
renderCalendar(year, month);

}


