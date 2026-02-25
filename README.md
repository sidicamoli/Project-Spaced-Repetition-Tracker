# Spaced Repetition Tracker

A Vanilla JavaScript web app that helps users track topics for revision using the spaced repetition technique. Topics are reviewed over increasing time gaps: one week, one month, three months, six months, and one year from the chosen start date.

**Live site:** [your deployed URL here]

---

## Features

- Select from 5 users using a drop-down
- Add a topic with a start date
- Automatically calculates 5 revision dates per topic
- Displays upcoming revision dates in chronological order
- Past revision dates are filtered out automatically
- Data is persisted in localStorage across page loads
- Fully accessible — Lighthouse scores: Accessibility 100, Best Practices 100, Performance 100

---

## Tech Stack

- HTML
- Vanilla JavaScript (ES Modules)
- localStorage for data persistence
- Node.js built-in test runner

---

## Run Locally

This project uses ES modules so it must be served over HTTP, not opened directly as a file.

### Option 1: http-server
```bash
npx http-server .
```

Then open http://localhost:8080 in your browser.

### Option 2: VS Code Live Server

Right-click `index.html` and choose **Open with Live Server**.

---

## Tests

Run all unit tests with:
```bash
npm test
```

All 6 tests pass covering `getUserIds` and `setIntervalDates` including edge cases for end-of-month overflow and leap years.