const titleInput = document.getElementById("title");
const subjectInput = document.getElementById("subject");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const pendingCount = document.getElementById("pendingCount");
const addBtn = document.getElementById("addBtn");
const totalCount = document.getElementById("totalCount");
const pendingBadge = document.getElementById("pendingBadge");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let pending = 0;

  tasks.forEach(function (task, index) {
    if (!task.completed) {
      pending++;
    }

    const taskElement = document.createElement("div");
    taskElement.className = task.completed ? "task completed" : "task";

    taskElement.innerHTML =
      '<div class="task-info">' +
      "<strong>" + task.title + "</strong><br>" +
      task.subject + " | Due: " + task.dueDate +
      "</div>" +
      '<div class="task-actions">' +
      '<button class="small-btn" onclick="toggleTask(' + index + ')">' +
      (task.completed ? "Undo" : "Done") +
      "</button>" +
      '<button class="small-btn" onclick="deleteTask(' + index + ')">Delete</button>' +
      "</div>";

    taskList.appendChild(taskElement);
  });

  pendingCount.textContent = "Pending tasks: " + pending;
  totalCount.textContent = tasks.length;
  pendingBadge.textContent = pending;
}

function addTask() {
  const title = titleInput.value.trim();
  const subject = subjectInput.value.trim();
  const dueDate = dueDateInput.value;

  if (title === "" || subject === "" || dueDate === "") {
    alert("Please fill all fields");
    return;
  }

  tasks.push({
    title: title,
    subject: subject,
    dueDate: dueDate,
    completed: false
  });

  saveTasks();
  renderTasks();

  titleInput.value = "";
  subjectInput.value = "";
  dueDateInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

renderTasks();