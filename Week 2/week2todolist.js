let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span contenteditable="true" onblur="updateTask(${index}, this.innerText)">
        ${task}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

function updateTask(index, newText) {
  tasks[index] = newText.trim();
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(task => task.toLowerCase().includes(query));
  renderTasks(filtered);
}

renderTasks();
