import { generateCalendarMatrix, getNthWeekdayOfMonth } from "./common.mjs";
import daysData from "../days.json" with { type: "json" };

window.onload = function() {

  // --- Get DOM elements ---
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
  prevBtn.textContent = "◀ Prev";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next ▶";

  const monthSelect = document.createElement("select");
  const yearSelect = document.createElement("select");

  // Accessibility labels 
  const monthLabel = document.createElement("label");
  monthLabel.textContent = "Month: ";
  monthLabel.setAttribute("for", "monthSelect");

  const yearLabel = document.createElement("label");
  yearLabel.textContent = "Year: ";
  yearLabel.setAttribute("for", "yearSelect");

  // Add IDs to link labels and selects
  monthSelect.id = "monthSelect";
  yearSelect.id = "yearSelect";

  // Fill month options
  monthNames.forEach((name, i) => {
    const opt = document.createElement("option");
    opt.value = i + 1;
    opt.textContent = name;
    monthSelect.appendChild(opt);
  });

  // Fill year options
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 125; y <= currentYear + 80; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }

  // Add to page
  monthYear.insertAdjacentElement("beforebegin", controlsDiv);
  controlsDiv.appendChild(prevBtn);
  controlsDiv.appendChild(monthLabel);
  controlsDiv.appendChild(monthSelect);
  controlsDiv.appendChild(yearLabel);
  controlsDiv.appendChild(yearSelect);
  controlsDiv.appendChild(nextBtn);

  // --- Calendar rendering function ---
  function renderCalendar(year, month) {
    calendar.innerHTML = '';
    monthYear.textContent = `${monthNames[month - 1]} ${year}`;

    const weeks = generateCalendarMatrix(year, month);

    // Filter events for this month
    const eventsThisMonth = daysData.filter(e => e.monthName === monthNames[month - 1]);

    for (const week of weeks) {
      for (const dayInfo of week) {
        const div = document.createElement('div');
        div.classList.add('day-box');

        if (dayInfo.monthOffset !== 0) {
          div.style.background = '#f2f2f2';
          div.style.color = '#555';
        }

        div.textContent = dayInfo.day;

        // Add events if any
        eventsThisMonth.forEach(event => {
          const eventDay = getNthWeekdayOfMonth(year, month, event.dayName, event.occurence);
          if (eventDay === dayInfo.day && dayInfo.monthOffset === 0) {
            const span = document.createElement('span');
            span.style.display = "block";
            span.style.fontSize = "12px";
            span.style.color = "blue";
            span.textContent = event.name;
            div.appendChild(span);
          }
        });

        calendar.appendChild(div);
      }
    }
  }

  // --- Initialise with current date ---
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

  // Previous/Next button logic
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
