# Testing

## 1. Dropdown lists exactly 5 users
The dropdown displays five users populated from `getUserIds()` in `common.mjs`.
Verified manually by opening the page and confirming exactly 5 users appear in the drop-down.
Also covered by unit tests in `common.test.mjs` which assert that `getUserIds()` returns exactly 5 string IDs.

## 2. Selecting a user displays their agenda
Selecting a user from the dropdown loads their stored revision agenda from localStorage.
Verified manually by adding topics for different users and switching between them to confirm each user only sees their own agenda.

## 3. If there is no agenda, a message is displayed
If a selected user has no stored topics, the message "This user has no topics to revise yet." is displayed.
Verified manually by selecting a user with no stored data (fresh localStorage).

## 4. Agenda is shown in chronological order
Revision dates are displayed with the earliest date first.
Verified manually by adding multiple topics and confirming the order, and by unit tests in `script.test.mjs` which confirm `setIntervalDates` returns dates in the correct order.

## 5. Revision dates in the past are not displayed
Topics with revision dates before today are filtered out and not shown.
Verified manually using the User 3 scenario — selecting a date one month ago and confirming only future dates appear.

## 6. Each revision entry shows the topic name and date
Each item in the agenda displays the topic name and the formatted revision date.
Verified manually by adding a topic and checking the displayed information is correct and readable.

## 7. Date picker defaults to today's date
On page load the date input is pre-filled with today's date.
Verified manually by loading the page fresh and confirming the date field shows today.

## 8. Form validation works
Submitting the form with an empty topic name or no date selected triggers an alert and does not submit.
Verified manually by attempting to submit the form with missing fields.

## 9. Submitting the form calculates correct revision dates
The form calculates 5 revision dates: one week, one month, three months, six months, and one year from the selected date.
Verified by unit tests in `script.test.mjs` for the `setIntervalDates` function, covering standard dates, end-of-month overflow (e.g. Jan 31 → Feb 28), and leap years (e.g. Jan 31 2024 → Feb 29 2024).
Also verified manually by running all 3 rubric test scenarios:
- User 1: "Functions in JS" starting 19th July — all 5 revision dates matched expected output exactly.
- User 2: "Variables in Python" and "Functions in Python" — all 10 combined revision dates matched expected output exactly, in correct chronological order.
- User 3: "Codewars" starting one month ago — past date correctly filtered, remaining 4 dates matched expected output exactly.

## 10. Submitting adds a topic for the selected user only
A new topic is stored only for the currently selected user.
Verified manually by adding a topic for User 1 and confirming it does not appear for User 2 or any other user.

## 11. Updated agenda is shown immediately after submission
After submitting the form, the agenda updates immediately without a page reload.
Verified manually by adding a topic and confirming it appears in the list straight away.

## 12. Accessibility score is 100 in Lighthouse Snapshot
Verified by running Lighthouse Snapshot audit in Chrome DevTools on the live deployed site.
Result: Accessibility is 100.