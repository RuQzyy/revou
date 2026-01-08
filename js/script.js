const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  // VALIDATION
  if (task === "" || date === "") {
    alert("Pastikan Semua Data Diisi");
    return;
  }

  todos.push({ task, date });
  taskInput.value = "";
  dateInput.value = "";

  renderTodos(todos);
});

function renderTodos(data) {
  todoList.innerHTML = "";

  if (data.length === 0) {
    todoList.innerHTML =
      `<tr><td colspan="3" class="empty">No task found</td></tr>`;
    return;
  }

  data.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        <button class="delete" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

deleteAllBtn.addEventListener("click", function () {
  todos = [];
  renderTodos(todos);
});

filterBtn.addEventListener("click", function () {
  const today = new Date().toISOString().split("T")[0];
  const filtered = todos.filter(todo => todo.date === today);
  renderTodos(filtered);
});
