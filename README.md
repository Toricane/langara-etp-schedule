# Langara Engineering Schedule Visualizer - Fall 2025

A web-based, interactive schedule visualizer for the Langara College Engineering Transfer Program (ETP) for the Fall 2025 semester. It provides a clear, color-coded, and filterable view of the weekly schedules for the Alpha, Beta, and Gamma cohorts.

## Features

-   **Dynamic Full-Semester View:** Displays the entire semester from September 1st to December 1st, 2025.
-   **Horizontal Scrolling:** Easily navigate through the semester.
-   **Cohort Toggling:** Show or hide schedules for Alpha, Beta, and Gamma cohorts.
-   **State Persistence:** Remembers your cohort toggle preferences between visits.
-   **Course Filtering:** Click on legend items to filter the displayed courses.
-   **Holiday Display:** Automatically shows statutory holidays where no classes are scheduled.
-   **One-off Seminars/Events:** Add date-specific events, like the APSC 1000 seminars, directly to the calendar.
-   **Today Marker:** The current date's column is automatically highlighted and scrolled into view.
-   **Detailed Tooltips:** Hover over any class to see details like the full course title, section, instructor, and room number.
-   **Responsive Design:** Adapts to different screen sizes.

## How to Use

1.  Open `index.html` in a web browser.
2.  Use the "Alpha", "Beta", and "Gamma" buttons at the top to toggle the visibility of each cohort's schedule.
3.  Click on the course names in the legend (e.g., `CHEM 1154`, `PHYS 1125`) to filter which courses are displayed.
4.  Hover over any class block to see more details.
5.  Scroll horizontally to view different dates in the semester.

## Populating `data.json`

The `data.json` file is the heart of this visualizer. It contains all the schedule information, holidays, and special events. Here's how to modify it:

The file has three main sections: `holidays`, `events`, and the cohort schedules (`alpha`, `beta`, `gamma`).

### 1. Cohort Schedules

Each cohort (`alpha`, `beta`, `gamma`) is an array of class objects. Each object represents a single scheduled class block and must have the following structure:

```json
{
    "course": "CPSC 1155",
    "sec": "003",
    "title": "Program Design for Engineers",
    "type": "Lecture",
    "room": "B027",
    "instructor": "Monagan G",
    "day": "T",
    "start": "1430",
    "end": "1620"
}
```

-   `course`: The course code (e.g., "CPSC 1155").
-   `sec`: The section number for the course (e.g., "003").
-   `title`: The full title of the course.
-   `type`: The class type (e.g., "Lecture", "Lab").
-   `room`: The room number.
-   `instructor`: The instructor's name.
-   `day`: The day of the week (`M`, `T`, `W`, `R`, `F`).
-   `start`: The start time in 24-hour format (e.g., "0830" for 8:30 AM).
-   `end`: The end time in 24-hour format (e.g., "1620" for 4:20 PM).

### 2. Holidays

The `holidays` section is an array of holiday objects. On these dates, no classes will be shown; instead, the holiday name will be displayed across the day's column.

```json
{
    "date": "2025-09-01",
    "name": "Labour Day"
}
```

-   `date`: The date of the holiday in `YYYY-MM-DD` format.
-   `name`: The name of the holiday.

### 3. One-off Events (e.g., APSC 1000 Seminars)

The `events` section is an array of full class objects for events that happen on a specific date, rather than recurring weekly. This is ideal for guest lectures or seminars like APSC 1000.

```json
{
    "course": "APSC 1000",
    "sec": "001",
    "title": "Brittany Epple, Student Conduct Office",
    "type": "Seminar",
    "room": "A130",
    "instructor": "Csilla Tamas",
    "date": "2025-09-17",
    "start": "1230",
    "end": "1330"
}
```

-   This object uses the same fields as a regular class, but with a `date` field (in `YYYY-MM-DD` format) instead of a `day` field.
-   These events will appear on the calendar for everyone, regardless of the selected cohorts.
-   Ensure the `course` (e.g., "APSC 1000") is also defined in `script.js` with a color and icon to be displayed correctly.
