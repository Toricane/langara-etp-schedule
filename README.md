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
-   **Class Notes (quizzes/exams/etc.):** Add date-specific notes per course (and optional section) that render as badges on class blocks and in tooltips.
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

The file has four main sections: `holidays`, `events`, `info`, and the cohort schedules (`alpha`, `beta`, `gamma`).

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

### 4. Class Notes (quizzes/exams/etc.)

Use the top-level `info` array to annotate important notes such as quizzes, midterms, finals, assignment deadlines, etc. These render as a small badge on the matching class block and are also included in the tooltip.

Each entry uses the following structure:

```json
{
    "date": "YYYY-MM-DD",
    "course": "COURSE CODE",
    "info": "Short note (e.g., 'Quiz', 'Midterm 1', 'Final Exam')",
    "sec": "OPTIONAL SECTION"
}
```

-   `date`: The calendar date of the note.
-   `course`: The course code the note applies to.
-   `info`: Short, visible text that appears on the class block.
-   `sec` (optional): If omitted, the note applies to all sections of that course on that date; if present, it only applies to the matching section.

Examples:

```json
{
    "info": [
        {
            "date": "2025-09-10",
            "course": "MATH 1171",
            "sec": "003",
            "info": "Quiz"
        },
        {
            "date": "2025-10-20",
            "course": "PHYS 1125",
            "info": "Midterm 1"
        }
    ]
}
```

Notes are matched by `date` and `course`, and by `sec` when provided. If a section is not provided, all visible sections of that course on that date will display the note.
