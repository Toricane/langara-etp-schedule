# Langara Engineering Schedule Visualizer - Fall 2025

A web-based, interactive schedule visualizer for the Langara College Engineering Transfer Program (ETP) for the Fall 2025 semester. It provides a clear, color-coded, and filterable view of the weekly schedules for the Alpha, Beta, and Gamma cohorts.

## Features

-   **Dynamic Full-Semester View:** Displays the entire semester from September 1st to December 1st, 2025.
-   **Horizontal Scrolling:** Easily navigate through the semester.
-   **Cohort Toggling:** Show or hide schedules for Alpha, Beta, and Gamma cohorts.
-   **Course Filtering:** Click on legend items to filter the displayed courses.
-   **Holiday Display:** Automatically shows statutory holidays where no classes are scheduled.
-   **Special Event Markers:** Highlight important dates like quizzes, midterms, or labs directly on the class blocks.
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

### 3. Special Events

The `events` section is an array of event objects used to mark specific classes with extra information, like a quiz or midterm.

```json
{
    "course": "MATH 1171",
    "section": "006",
    "date": "2025-09-29",
    "info": "Quiz 1"
}
```

-   `course`: The course code for the event.
-   `section` (Optional): The specific section this event applies to. If you omit the `section` field, the event will appear on **all** sections of that course on the specified date.
-   `date`: The date of the event in `YYYY-MM-DD` format.
-   `info`: The text to display for the event (e.g., "Quiz 1", "Midterm Exam").
