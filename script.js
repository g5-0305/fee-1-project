const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const error = document.getElementById("error");
const fetchBtn = document.getElementById("fetchBtn");
// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
// Add Task Event
addTaskBtn.addEventListener("click", addTask);
// Fetch API Event
fetchBtn.addEventListener("click", fetchTasks);
// Add Task Function
function addTask() {
const taskText = taskInput.value.trim();
// Validation
if (taskText === "") {
error.textContent = "Task cannot be empty!";
return;
}
error.textContent = "";
createTaskElement(taskText);
saveTask(taskText);
taskInput.value = "";
}
// Create Task in DOM
function createTaskElement(task) {
const li = document.createElement("li");
li.textContent = task;
const del = document.createElement("span");
del.textContent = "❌ ";
del.classList.add("delete");
del.addEventListener("click", () => {
li.remove();

removeTask(task);
});
li.appendChild(del);
taskList.appendChild(li);
}
// Save to localStorage
function saveTask(task) {
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push(task);
localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Load from localStorage
function loadTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => createTaskElement(task));
}
// Remove from localStorage
function removeTask(task) {
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks = tasks.filter(t => t !== task);
localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Fetch API (async/await)
async function fetchTasks() {
try {
const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
const data = await response.json();
data.forEach(item => {
createTaskElement("📌 " + item.title);
saveTask("📌 " + item.title);
});
} catch (error) {
console.log("Error fetching tasks:", error);
}
}