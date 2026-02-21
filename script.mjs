// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";
import { setIntervalDates } from "./utils.mjs";

function formatDateWithOrdinal(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const d = date.getUTCDate();

  const suffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  return `${d}${suffix(d)} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function getTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

function getLocalDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dropdown = document.getElementById("user-select");
const topicsContainer = document.getElementById("topics");
const userForm = document.getElementById("topic-form");
const titleInput = document.getElementById("title");
const datePickerInput = document.getElementById("date");

function populateDropdown() {
  getUserIds().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    dropdown.appendChild(option);
  });
}

function createAgendaItem(topic) {
  const li = document.createElement("li");
  const strong = document.createElement("strong");
  strong.textContent = topic.title;
  const span = document.createElement("span");
  span.textContent = ", " + formatDateWithOrdinal(topic.date);
  li.appendChild(strong);
  li.appendChild(span);
  return li;
}

function showAgendaForSelectedUser(userId) {
  topicsContainer.innerHTML = "";
  const data = getData(userId);
  const today = getTodayUTC();

  if (!data || data.length === 0) {
    const li = document.createElement("li");
    li.textContent = "This user has no topics to revise yet.";
    topicsContainer.appendChild(li);
    return;
  }

  const futureTopics = data.filter((topic) => {
    const [y, m, d] = topic.date.split("-").map(Number);
    const topicDate = new Date(Date.UTC(y, m - 1, d));
    return topicDate >= today;
  });

  if (futureTopics.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No upcoming revision dates — all dates are in the past.";
    topicsContainer.appendChild(li);
    return;
  }

  futureTopics
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((topic) => topicsContainer.appendChild(createAgendaItem(topic)));
}

function handleUserSelect(event) {
  const selectedUser = event.target.value;
  if (!selectedUser) {
    topicsContainer.innerHTML = "";
    return;
  }
  showAgendaForSelectedUser(selectedUser);
}

function handleUserSubmit(event) {
  event.preventDefault();

  const selectedUser = dropdown.value;
  const topicTitle = titleInput.value.trim();
  const selectedDate = datePickerInput.value;

  if (!topicTitle) {
    alert("Please enter a topic name.");
    titleInput.focus();
    return;
  }

  if (!selectedDate) {
    alert("Please select a date.");
    datePickerInput.focus();
    return;
  }

  if (!selectedUser) {
    alert("Please select a user from the drop-down first.");
    dropdown.focus();
    return;
  }

  const revisionDates = setIntervalDates(selectedDate);
  const newTopics = revisionDates.map((date) => ({
    title: topicTitle,
    date: date,
  }));

  addData(selectedUser, newTopics);
  showAgendaForSelectedUser(selectedUser);

  titleInput.value = "";
  datePickerInput.value = getLocalDateString();
  titleInput.focus();
}

dropdown.addEventListener("change", handleUserSelect);
userForm.addEventListener("submit", handleUserSubmit);

window.onload = function () {
  populateDropdown();
  datePickerInput.value = getLocalDateString();
};