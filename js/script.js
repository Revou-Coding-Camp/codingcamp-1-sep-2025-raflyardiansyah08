const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterSelect = document.getElementById('filterSelect');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filteredTasks = null) {
    taskList.innerHTML = "";
    const dataToRender = filteredTasks || tasks;

    if (dataToRender.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
        return;
    }

    dataToRender.forEach((task) => {
        const realIndex = tasks.indexOf(task);
        taskList.innerHTML += `
        <tr>
            <td>${task.text}</td>
            <td>${task.date}</td>
            <td>${task.completed ? "Done" : "Pending"}</td>
            <td>
                <button class="action-btn" onclick="toggleTask(${realIndex})">✓</button>
                <button class="action-btn" onclick="deleteTask(${realIndex})">🗑</button>
            </td>
        </tr>
        `;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    const date = dateInput.value;
    if (text === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }
    tasks.push({ text, date, completed: false });
    taskInput.value = "";
    dateInput.value = "";
    applyFilter(); 
}

function deleteTask(index) {
    tasks.splice(index, 1);
    applyFilter();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    applyFilter();
}

function deleteAll() {
    tasks = [];
    applyFilter();
}

function applyFilter() {
    const selected = filterSelect.value;
    const today = new Date().toISOString().split('T')[0];
    let filtered = tasks;

    if (selected === "today") {
        filtered = tasks.filter(t => t.date === today);
    } else if (selected === "done") {
        filtered = tasks.filter(t => t.completed);
    } else if (selected === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    renderTasks(filtered);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterSelect.addEventListener("change", applyFilter);

renderTasks();