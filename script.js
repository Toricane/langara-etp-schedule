document.addEventListener("DOMContentLoaded", async function () {
    const courseColors = {
        "CHEM 1154": "rgba(219, 68, 55, 0.85)",
        "PHYS 1125": "rgba(139, 92, 246, 0.85)",
        "MATH 1171": "rgba(20, 158, 202, 0.85)",
        "CPSC 1155": "rgba(236, 72, 153, 0.85)",
        "CPSC 1091": "rgba(16, 185, 129, 0.85)",
        "ENGL 1123": "rgba(107, 114, 128, 0.85)",
    };

    const courseIcons = {
        "CHEM 1154": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.15)'%3E%3Cpath d='M18.883 3.323l1.768 1.768-2.829 2.828-1.768-1.768L18.883 3.323zM15.323 4.03l3.535 3.536-7.071 7.07-3.535-3.535 7.07-7.07zm-2.121 9.899l-5.657 5.657-1.414-1.414 5.657-5.657 1.414 1.414zM3.515 13.252l-1.414 1.414 5.657 5.657 1.414-1.414-5.657-5.657zM15 16h5v2h-5v-2z'%3E%3C/path%3E%3Cpath fill-rule='evenodd' d='M13 3a1 1 0 011 1v2.268l2-2V5a1 1 0 112 0v-.268l-2 2V8a1 1 0 11-2 0V6.732l-2-2V6a1 1 0 11-2 0V4a1 1 0 011-1zm3 11a3 3 0 11-6 0 3 3 0 016 0z' clip-rule='evenodd'/%3E%3C/svg%3E`,
        "PHYS 1125": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.15)'%3E%3Cellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(45 12 12)'/%3E%3Cellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(-45 12 12)'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E`,
        "MATH 1171": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.15)'%3E%3Cpath d='M18 4H6v2l12-1-1 2H7v2h10l-1 2H8v2h9l-1 2H9v2h9l2 2H6V4z'/%3E%3C/svg%3E`,
        "CPSC 1155": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.2)'%3E%3Cpath d='M9.4 7.4L4.8 12l4.6 4.6L8 18l-6-6 6-6 1.4 1.4zm5.2 0l4.6 4.6-4.6 4.6L16 18l6-6-6-6-1.4 1.4z'/%3E%3C/svg%3E`,
        "CPSC 1091": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.15)'%3E%3Cpath d='M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61-.25-1.17-.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/%3E%3C/svg%3E`,
        "ENGL 1123": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.15)'%3E%3Cpath d='M20 6H4v12h16V6zM4 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4z'/%3E%3Cpath d='M6 8h8v2H6z'/%3E%3C/svg%3E`,
    };

    // fetch schedule data from data.json
    let scheduleData = {};
    try {
        const res = await fetch("data.json");
        scheduleData = await res.json();
    } catch (err) {
        console.error("Failed to load schedule data:", err);
        scheduleData = { alpha: [], beta: [], gamma: [] };
    }

    const toggles = {
        alpha: document.getElementById("alpha-toggle"),
        beta: document.getElementById("beta-toggle"),
        gamma: document.getElementById("gamma-toggle"),
    };
    const dayColumns = {
        M: "day-M",
        T: "day-T",
        W: "day-W",
        R: "day-R",
        F: "day-F",
    };
    const tooltip = document.getElementById("tooltip");
    const calendarWrapper = document.querySelector(".calendar-wrapper");
    const emptyStateMessage = document.getElementById("calendar-empty-state");

    let activeCourseFilters = new Set(Object.keys(courseColors));

    const startHour = 8,
        endHour = 17,
        pixelsPerHour = 60;
    const calendarHeight = (endHour - startHour) * pixelsPerHour;
    Object.values(dayColumns).forEach(
        (id) =>
            (document.getElementById(id).style.height = `${calendarHeight}px`)
    );
    document.getElementById(
        "time-labels-col"
    ).style.height = `${calendarHeight}px`;

    const timeToMinutes = (timeStr) =>
        parseInt(timeStr.slice(0, 2)) * 60 + parseInt(timeStr.slice(2, 4));

    const renderSchedules = () => {
        let totalEventsToRender = 0;
        const cohortsToRender = Object.keys(toggles).filter(
            (key) => toggles[key].checked
        );

        Object.keys(dayColumns).forEach((dayKey) => {
            const dayCol = document.getElementById(dayColumns[dayKey]);
            dayCol.innerHTML = "";

            let dayEvents = [];
            cohortsToRender.forEach((cohortName) => {
                (scheduleData[cohortName] || [])
                    .filter(
                        (c) =>
                            c.day === dayKey &&
                            activeCourseFilters.has(c.course)
                    )
                    .forEach((c) =>
                        dayEvents.push({ ...c, cohort: cohortName })
                    );
            });

            if (dayEvents.length === 0) return;
            totalEventsToRender += dayEvents.length;

            const activeCohortsOnDay = [
                ...new Set(dayEvents.map((e) => e.cohort)),
            ].sort();
            const totalCols = activeCohortsOnDay.length || 1;
            const cohortIndexMap = new Map();
            activeCohortsOnDay.forEach((cohort, index) =>
                cohortIndexMap.set(cohort, index)
            );

            dayEvents.forEach((classItem) => {
                const top =
                    ((timeToMinutes(classItem.start) - startHour * 60) / 60) *
                    pixelsPerHour;
                const height =
                    ((timeToMinutes(classItem.end) -
                        timeToMinutes(classItem.start)) /
                        60) *
                    pixelsPerHour;

                const block = document.createElement("div");
                block.className = `class-block cohort-${classItem.cohort}`;
                block.dataset.course = classItem.course;
                block.style.top = `${top}px`;
                block.style.height = `${height}px`;
                block.style.backgroundColor =
                    courseColors[classItem.course] || "#555";
                block.style.backgroundImage = `url("${
                    courseIcons[classItem.course] || ""
                }")`;

                const position = cohortIndexMap.get(classItem.cohort);
                const widthPercentage = 100 / totalCols;
                const leftPercentage = position * widthPercentage;

                block.style.width = `calc(${widthPercentage}% - 4px)`;
                block.style.left = `${leftPercentage}%`;

                block.innerHTML = `<div class="class-block-course">${classItem.course}</div><div class="class-block-type">${classItem.type}</div><div class="class-block-instructor">${classItem.instructor}</div><div class="class-block-room">${classItem.room}</div>`;
                block.dataset.tooltipTitle = `${classItem.course}: ${classItem.title}`;
                block.dataset.tooltipDetails = `<span>${classItem.start.slice(
                    0,
                    2
                )}:${classItem.start.slice(2)} - ${classItem.end.slice(
                    0,
                    2
                )}:${classItem.end.slice(2)}</span><span>Instructor: ${
                    classItem.instructor
                }</span><span>Room: ${classItem.room}</span>`;
                dayCol.appendChild(block);
            });
        });
        emptyStateMessage.style.display =
            totalEventsToRender === 0 ? "block" : "none";
    };

    const generateTimeLabels = () => {
        const timeLabelsCol = document.getElementById("time-labels-col");
        for (let i = startHour; i < endHour; i++) {
            const label = document.createElement("div");
            label.className = "hour-label";
            const time = document.createElement("span");
            time.textContent = `${i > 12 ? i - 12 : i}${i >= 12 ? "pm" : "am"}`;
            label.appendChild(time);
            timeLabelsCol.appendChild(label);
        }
    };

    const generateLegend = () => {
        const legendContainer = document.getElementById("legend-controls");
        legendContainer.innerHTML = "";
        Object.entries(courseColors).forEach(([course, color]) => {
            const item = document.createElement("div");
            item.className = "legend-item active";
            item.dataset.course = course;
            item.innerHTML = `<div class="legend-color-box" style="background-color: ${color};"></div><span>${course}</span>`;
            item.addEventListener("click", () => {
                item.classList.toggle("active");
                if (activeCourseFilters.has(course))
                    activeCourseFilters.delete(course);
                else activeCourseFilters.add(course);
                renderSchedules();
            });
            legendContainer.appendChild(item);
        });
        const clearBtn = document.createElement("button");
        clearBtn.className = "clear-filters-btn";
        clearBtn.textContent = "Reset Filters";
        clearBtn.addEventListener("click", () => {
            activeCourseFilters = new Set(Object.keys(courseColors));
            document
                .querySelectorAll(".legend-item")
                .forEach((item) => item.classList.add("active"));
            renderSchedules();
        });
        legendContainer.appendChild(clearBtn);
    };

    const handleHighlight = (e, shouldHighlight) => {
        const target = e.target.closest(".class-block, .legend-item");
        if (!target) return;
        const courseToHighlight = target.dataset.course;
        document.querySelectorAll(".class-block").forEach((block) => {
            if (block.dataset.course !== courseToHighlight)
                block.classList.toggle("faded", shouldHighlight);
        });
    };

    calendarWrapper.addEventListener("mouseover", (e) =>
        handleHighlight(e, true)
    );
    calendarWrapper.addEventListener("mouseout", (e) =>
        handleHighlight(e, false)
    );
    document
        .getElementById("legend-controls")
        .addEventListener("mouseover", (e) => handleHighlight(e, true));
    document
        .getElementById("legend-controls")
        .addEventListener("mouseout", (e) => handleHighlight(e, false));

    document.addEventListener("mouseover", (e) => {
        const target = e.target.closest(".class-block");
        if (target) {
            tooltip.style.display = "block";
            tooltip.innerHTML = `<div class="tooltip-title">${target.dataset.tooltipTitle}</div><div class="tooltip-details">${target.dataset.tooltipDetails}</div>`;
        }
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".class-block")) tooltip.style.display = "none";
    });
    document.addEventListener("mousemove", (e) => {
        if (tooltip.style.display === "block") {
            const xOffset = window.innerWidth - e.clientX > 270 ? 15 : -265;
            tooltip.style.left = `${e.clientX + xOffset}px`;
            tooltip.style.top = `${e.clientY + 15}px`;
        }
    });

    Object.values(toggles).forEach((toggle) =>
        toggle.addEventListener("change", renderSchedules)
    );
    generateTimeLabels();
    generateLegend();
    renderSchedules();
});
