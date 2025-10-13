import { generateCalendarMatrix } from "./common.mjs";
import daysData from "../days.json" with { type: "json" };

window.onload = function() {

  // Get DOM elements
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('monthYear');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // --- Create controls section ---
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<< Prev";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next >>";

  const monthSelect = document.createElement("select");
  const yearSelect = document.createElement("select");

  // Fill month options
  monthNames.forEach((name, i) => {
    const opt = document.createElement("option");
    opt.value = i + 1;
    opt.textContent = name;
    monthSelect.appendChild(opt);
  });

  // Fill year options
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 125; y <= currentYear + 50; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }

  // Add to page
  monthYear.insertAdjacentElement("beforebegin", controlsDiv);
  controlsDiv.appendChild(prevBtn);
  controlsDiv.appendChild(monthSelect);
  controlsDiv.appendChild(yearSelect);
  controlsDiv.appendChild(nextBtn);

  // --- Calendar rendering function ---
  function renderCalendar(year, month) {
    calendar.innerHTML = '';
    monthYear.textContent = `${monthNames[month - 1]} ${year}`;

    const weeks = generateCalendarMatrix(year, month);

    for (const week of weeks) {
      for (const dayInfo of week) {
        const div = document.createElement('div');
        div.classList.add('day-box');

        if (dayInfo.monthOffset !== 0) {
          div.style.background = '#f2f2f2';
          div.style.color = '#999';
        }

        div.textContent = dayInfo.day;
        calendar.appendChild(div);
      }
    }
  }

  // --- Initialize with current date ---
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  monthSelect.value = month;
  yearSelect.value = year;
  renderCalendar(year, month);

  // --- Dropdown change events ---
  monthSelect.addEventListener("change", () => {
    month = parseInt(monthSelect.value);
    year = parseInt(yearSelect.value);
    renderCalendar(year, month);
  });

  yearSelect.addEventListener("change", () => {
    month = parseInt(monthSelect.value);
    year = parseInt(yearSelect.value);
    renderCalendar(year, month);
  });

  // --- Previous/Next button logic ---
  prevBtn.addEventListener("click", () => {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    monthSelect.value = month;
    yearSelect.value = year;
    renderCalendar(year, month);
  });

  nextBtn.addEventListener("click", () => {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    monthSelect.value = month;
    yearSelect.value = year;
    renderCalendar(year, month);
  });
};
