// generate-ical.mjs
// Run this script with:  node generate-ical.mjs

import fs from "fs";
import daysData from "./days.json" with { type: "json" };

// --- Helper: Get nth weekday of a given month ---
function getNthWeekdayOfMonth(year, month, weekdayName, occurrence) {
  const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weekday = weekdayNames.indexOf(weekdayName);
  if (weekday === -1) throw new Error(`Invalid weekday name: ${weekdayName}`);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const jsWeekday = (date.getDay() + 6) % 7; // Monday=0
    if (jsWeekday === weekday) days.push(d);
  }

  switch (occurrence?.toLowerCase()) {
    case "first": return days[0];
    case "second": return days[1];
    case "third": return days[2];
    case "fourth": return days[3];
    case "last": return days[days.length - 1];
    default: return null;
  }
}

// --- Helper: convert Date to YYYYMMDD ---
function formatDateYYYYMMDD(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

// --- Start building the ICS content ---
let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Commemorative Days Generator//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

// --- Generate events from 2020–2030 ---
for (let year = 2020; year <= 2030; year++) {
  for (const event of daysData) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames.indexOf(event.monthName) + 1;
    if (month < 1) continue;

    const day = getNthWeekdayOfMonth(year, month, event.dayName, event.occurence);
    if (!day) continue;

    const date = new Date(year, month - 1, day);
    const dtStart = formatDateYYYYMMDD(date);
    const dtEnd = formatDateYYYYMMDD(new Date(year, month - 1, day + 1));
    const uid = `${event.name.replace(/\s+/g, "_")}_${year}@commemorativedays`;

    icsContent += `BEGIN:VEVENT
UID:${uid}
SUMMARY:${event.name}
DTSTART;VALUE=DATE:${dtStart}
DTEND;VALUE=DATE:${dtEnd}
DESCRIPTION:${event.descriptionURL || ""}
END:VEVENT
`;
  }
}

// --- Close calendar and write file ---
icsContent += `END:VCALENDAR\n`;

fs.writeFileSync("days.ics", icsContent, "utf8");
console.log("iCalendar file 'days.ics' created successfully!");
