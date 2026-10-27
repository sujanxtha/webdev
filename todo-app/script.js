
// Get the HTML elements used by the application.
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("errorMessage");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter");

// Load previously saved tasks from the browser.
let tasks = [];

try {
  const savedTasks = JSON.parse(localStorage.getItem("myTodoTasks"));

  if (Array.isArray(savedTasks)) {
    tasks = savedTasks;
  }
} catch (error) {
  console.error("Could not load saved tasks:", error);
}

let currentFilter = "all";

// Save tasks to localStorage.
function saveTasks() {
  localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
}

// Show an input validation error.
function showError(message) {
  errorMessage.textContent = message;
  taskInput.classList.add("invalid");
  taskInput.setAttribute("aria-invalid", "true");
}

// Remove the validation error.
function clearError() {
  errorMessage.textContent = "";
  taskInput.classList.remove("invalid");
  taskInput.removeAttribute("aria-invalid");
}

// Add a new task when the form is submitted.
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText.length === 0) {
    showError("Please enter a task.");
    return;
  }

  if (taskText.length < 3) {
    showError("Task must contain at least 3 characters.");
    return;
  }

  clearError();

  const newTask = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

// Remove the error when the user edits the input.
taskInput.addEventListener("input", clearError);

// Change a task between active and completed.
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

// Delete a task from the list.
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

// Display the tasks on the page using DOM scripting.
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  filteredTasks.forEach(function (task) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Complete " + task.text);

    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    if (task.completed) {
      textSpan.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete " + task.text);

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });

  // Update the number of unfinished tasks.
  const activeCount = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  taskCounter.textContent =
    activeCount + (activeCount === 1 ? " task remaining" : " tasks remaining");

  emptyMessage.style.display =
    filteredTasks.length === 0 ? "block" : "none";
}

// Filter tasks by All, Active, or Completed.
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");
    renderTasks();
  });
});

// Remove all completed tasks.
clearCompleted.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();
});

// Display saved tasks when the page opens.
renderTasks();
