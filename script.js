// ADD STUDY SESSION

const studyForm = document.getElementById("study-form");

if (studyForm) {

    studyForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get the information from the form
        const day = document.getElementById("study-day").value;
        const course = document.getElementById("study-course").value;
        const hours = Number(document.getElementById("study-hours").value);

        // Find all day cards
        const dayCards = document.querySelectorAll(".day-card");

        dayCards.forEach(function(card) {

            // Get the name of the day
            const dayName = card.querySelector(".day-header h3").textContent;

            // Find the selected day
            if (dayName === day) {

                // Remove the "No study sessions planned" message
                const emptyMessage = card.querySelector(".day-empty");

                if (emptyMessage) {
                    emptyMessage.remove();
                }

                // Create a new study session
                const session = document.createElement("div");

                session.classList.add("study-session");

                // Store the number of hours
                session.dataset.hours = hours;

                // Add the course and hours to the session
              session.innerHTML = `
                <strong>${course}</strong>
                <span>
                    <i class="fa-regular fa-clock"></i>
                    ${hours} hour${hours !== 1 ? "s" : ""}
                    <button class="remove-session" type="button">Remove</button>
                </span>
            `;
                // Add the session to the day card
                card.appendChild(session);

                const removeButton = session.querySelector(".remove-session");

                removeButton.addEventListener("click", function() {

                session.remove();

                const sessions = card.querySelectorAll(".study-session");

                let totalHours = 0;

                sessions.forEach(function(session) {
                    totalHours += Number(session.dataset.hours);
                });

                const hoursDisplay = card.querySelector(".day-header span");

                hoursDisplay.textContent = totalHours + " hrs";

                if (sessions.length === 0) {

                    const emptyMessage = document.createElement("div");

                    emptyMessage.classList.add("day-empty");

                    emptyMessage.innerHTML = `
                        <i class="fa-regular fa-calendar"></i>
                        <p>No study sessions planned</p>
                    `;

                    card.appendChild(emptyMessage);

                }

            });

                // Find all study sessions for this day
                const sessions = card.querySelectorAll(".study-session");

                // Calculate the total hours
                let totalHours = 0;

                sessions.forEach(function(session) {
                    totalHours += Number(session.dataset.hours);
                });

                // Update the total hours at the top of the card
                const hoursDisplay = card.querySelector(".day-header span");

                hoursDisplay.textContent = totalHours + " hrs";
            }

        });

        // Clear the form
        studyForm.reset();

    });

}
// STUDY TASKS

const taskForm = document.getElementById("task-form");

if (taskForm) {
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get the information entered in the form
    const taskName = document.getElementById("task-name").value.trim();
    const taskCourse = document.getElementById("task-course").value;
    const taskDate = document.getElementById("task-date").value;

    // Stop if the task name is empty
    if (taskName === "") {
        return;
    }

    // Find the task list and empty message
    const taskList = document.getElementById("task-list");
    const emptyMessage = document.getElementById("task-empty-state");

    // Remove the empty message when the first task is added
    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Create a new task
    const task = document.createElement("div");
    task.classList.add("study-task");

    // Create the task information area
    const taskInformation = document.createElement("div");
    taskInformation.classList.add("task-information");

    const name = document.createElement("span");
    name.classList.add("task-name");
    name.textContent = taskName;

    const course = document.createElement("span");
    course.classList.add("task-course");
    course.textContent = taskCourse;

    taskInformation.appendChild(name);
    taskInformation.appendChild(course);

    // Display the due date if one was selected
let deadline = null;

if (taskDate !== "") {

    const dueDate = document.createElement("span");
    dueDate.classList.add("task-due-date");
    dueDate.textContent = "Due: " + taskDate;

    taskInformation.appendChild(dueDate);

    // Find the deadline list
    const deadlineList = document.getElementById("deadline-list");
    const deadlineEmptyMessage = document.getElementById("deadline-empty-state");

    // Remove the empty message
    if (deadlineEmptyMessage) {
        deadlineEmptyMessage.remove();
    }

    // Create a deadline item
    deadline = document.createElement("div");
    deadline.classList.add("deadline-item");

    deadline.innerHTML = `
        <strong>${taskName}</strong>
        <span>${taskCourse}</span>
        <span>Due: ${taskDate}</span>
    `;

    deadlineList.appendChild(deadline);
}

    // Create the task buttons
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.classList.add("complete-task");
    completeButton.textContent = "Complete";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-task");
    deleteButton.textContent = "Delete";

    // Mark the task as completed
completeButton.addEventListener("click", function() {

    task.classList.toggle("completed");

    if (task.classList.contains("completed")) {

        completeButton.textContent = "Completed";

        if (deadline) {
            deadline.style.display = "none";
        }

    } else {

        completeButton.textContent = "Complete";

        if (deadline) {
            deadline.style.display = "block";
        }

    }

});

    
   // Delete the task
deleteButton.addEventListener("click", function() {

    task.remove();

    // Remove the associated deadline
    if (deadline) {
        deadline.remove();
    }
    // Restore the empty deadline message if no deadlines remain
const deadlineList = document.getElementById("deadline-list");

if (deadlineList.querySelectorAll(".deadline-item").length === 0) {

    const newDeadlineMessage = document.createElement("div");
    newDeadlineMessage.classList.add("deadline-empty-state");
    newDeadlineMessage.id = "deadline-empty-state";

    newDeadlineMessage.innerHTML = `
        <i class="fa-regular fa-calendar-xmark"></i>
        <h3>No upcoming deadlines</h3>
        <p>Assignment deadlines will appear here when they are added.</p>
    `;

    deadlineList.appendChild(newDeadlineMessage);
}

        // Restore the empty message if no tasks remain
        if (taskList.querySelectorAll(".study-task").length === 0) {

            const newEmptyMessage = document.createElement("div");
            newEmptyMessage.classList.add("planner-empty-state");
            newEmptyMessage.id = "task-empty-state";

            newEmptyMessage.innerHTML = `
                <div class="empty-icon">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <div>
                    <h3>No study tasks yet</h3>
                    <p>Add study tasks to organise your academic workload.</p>
                </div>
            `;

            taskList.appendChild(newEmptyMessage);
        }

    });

    // Put the buttons and information together
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    task.appendChild(taskInformation);
    task.appendChild(taskActions);

    // Add the task to the page
    taskList.appendChild(task);

    // Clear the form
    taskForm.reset();

});

}

// ASSESSMENT BREAKDOWN

const assessmentForm = document.getElementById("assessment-form");

if (assessmentForm) {

    const assessmentList = document.getElementById("assessment-list");

    // Store assessments in an array
    const assessments = [];

    // Load saved assessments from the browser
    const savedAssessments = localStorage.getItem("studySyncAssessments");

    if (savedAssessments) {

        assessments.push(...JSON.parse(savedAssessments));

    }

    // DISPLAY ASSESSMENTS
    function displayAssessments() {

        assessmentList.innerHTML = "";

        assessments.forEach(function(assessment) {

            const assessmentItem = document.createElement("div");

            assessmentItem.classList.add("assessment-item");

            assessmentItem.innerHTML = `
                <div>
                    <strong>${assessment.name}</strong>
                    <p>${assessment.module} | ${assessment.type}</p>
                    <p>Mark: ${assessment.mark}% | Weight: ${assessment.weight}%</p>
                </div>
            `;

            assessmentList.appendChild(assessmentItem);

        });

        // Remove or restore the empty message
        const emptyState = document.getElementById("assessment-empty-state");

        if (assessments.length > 0 && emptyState) {
            emptyState.remove();
        }

    }

    
        // UPDATE RESULTS
        function updateResults() {

            const moduleResults = {};

            assessments.forEach(function(assessment) {

                if (!moduleResults[assessment.module]) {
                    moduleResults[assessment.module] = {
                        total: 0,
                        weight: 0,
                        courseworkTotal: 0,
                        courseworkWeight: 0,
                        examMark: null
                    };
                }

                const result = moduleResults[assessment.module];

                result.total += assessment.mark * assessment.weight / 100;
                result.weight += assessment.weight;

                if (assessment.type === "Exam") {
                    result.examMark = assessment.mark;
                } else {
                    result.courseworkTotal += assessment.mark * assessment.weight;
                    result.courseworkWeight += assessment.weight;
                }

            });

            let completedModules = 0;
            let totalResults = 0;
            let highestResult = 0;
            let failedModules = 0;

            // Update the results message
            const resultsEmptyState = document.getElementById("results-empty-state");

            if (resultsEmptyState) {

                if (Object.keys(moduleResults).length > 0) {
                    resultsEmptyState.innerHTML = `
                        <h3>Keep tracking your progress</h3>
                        <p>Your results will update as you add or change assessments.</p>
                    `;
                } else {
                    resultsEmptyState.innerHTML = `
                        <h3>No results recorded yet</h3>
                        <p>Your academic results will appear here once they are added.</p>
                    `;
                }

            }

            // Update the semester tables
            const moduleRows = document.querySelectorAll(".results-table tbody tr");

            moduleRows.forEach(function(row) {

                const module = row.children[0].textContent.trim();
                const result = moduleResults[module];

                const resultCell = row.children[1];
                const statusCell = row.children[2];

                if (result) {

                    const percentage = result.total;

                    resultCell.textContent = percentage.toFixed(2) + "%";

                    if (result.weight >= 100 && result.examMark !== null &&
                        result.courseworkWeight > 0) {

                        completedModules++;
                        totalResults += percentage;

                        if (percentage > highestResult) {
                            highestResult = percentage;
                        }

                        const courseworkAverage =
                            result.courseworkTotal / result.courseworkWeight;

                        const passed =
                            courseworkAverage >= 40 && result.examMark >= 40;

                        if (passed) {
                            statusCell.textContent = "Pass";
                        } else {
                            statusCell.textContent = "Fail";
                            failedModules++;
                        }

                    } else {

                        statusCell.textContent = "In Progress";

                    }

                } else {

                    resultCell.textContent = "—";
                    statusCell.textContent = "Not Available";

                }

            });

            // Update summary cards
            document.getElementById("modules-completed").textContent =
                completedModules;

            if (completedModules === 8) {

                const average = totalResults / completedModules;

                document.getElementById("overall-average").textContent =
                    average.toFixed(2) + "%";

                document.getElementById("highest-result").textContent =
                    highestResult.toFixed(2) + "%";

                let classification = "Fail";

                if (failedModules === 0) {

                    if (average >= 70) {
                        classification = "First Class Honours";
                    } else if (average >= 60) {
                        classification = "Second Class Honours (2.1)";
                    } else if (average >= 50) {
                        classification = "Second Class Honours (2.2)";
                    } else if (average >= 40) {
                        classification = "Pass";
                    }

                }

                document.getElementById("academic-status").textContent =
                    classification;

            } else {

                document.getElementById("overall-average").textContent = "—";
                document.getElementById("highest-result").textContent = "—";

                document.getElementById("academic-status").textContent =
                    "Awaiting Results";

            }

        }

            // LOAD SAVED ASSESSMENTS
            displayAssessments();
            updateResults();

    // ADD ASSESSMENT
    assessmentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const module = document.getElementById("assessment-module").value;
        const name = document.getElementById("assessment-name").value;
        const type = document.getElementById("assessment-type").value;
        const mark = Number(document.getElementById("assessment-mark").value);
        const weight = Number(document.getElementById("assessment-weight").value);

        // Check if this is an exam that already exists
        let existingExam = null;

        if (type === "Exam") {

            existingExam = assessments.find(function(assessment) {

                return assessment.module === module &&
                    assessment.type === "Exam";

            });

        }

        // Calculate the current weight for this module
        let totalWeight = weight;

        assessments.forEach(function(assessment) {

            if (assessment.module === module && assessment !== existingExam) {
                totalWeight += assessment.weight;
            }

        });

        // Check that the module weight does not exceed 100%
        if (totalWeight > 100) {

            alert("The total assessment weight for this module cannot exceed 100%.");

            return;

        }

        // Store the assessment
        const assessment = {
            module: module,
            name: name,
            type: type,
            mark: mark,
            weight: weight
        };

        // Replace an existing exam or add a new assessment
        if (existingExam) {

            const index = assessments.indexOf(existingExam);

            assessments[index] = assessment;

        } else {

            assessments.push(assessment);

        }

        // Save assessments in the browser
        localStorage.setItem("studySyncAssessments", JSON.stringify(assessments));

        // Display assessments and update results
        displayAssessments();
        updateResults();

        // Clear the form
        assessmentForm.reset();

    });

}
