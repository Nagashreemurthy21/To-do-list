document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.querySelector(".class-list");
    const numbers = document.getElementById("numbers");
    const progress = document.getElementById("progress");

    let tasks = [];

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            taskInput.value = "";
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.margin = "10px 0";
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.gap = "10px";

            // Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.style.transform = "scale(1.2)";
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                renderTasks();
            });

            // Task text
            const span = document.createElement("span");
            span.textContent = task.text;
            span.style.flex = "1";
            if (task.completed) {
                span.style.textDecoration = "line-through";
                span.style.color = "#888";
            } else {
                span.style.textDecoration = "none";
                span.style.color = "var(--text)";
            }

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "✏️";
            editBtn.style.background = "transparent";
            editBtn.style.border = "none";
            editBtn.style.color = "var(--text)";
            editBtn.style.fontSize = "20px";
            editBtn.style.cursor = "pointer";
            editBtn.addEventListener("click", () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null && newText.trim() !== "") {
                    task.text = newText.trim();
                    renderTasks();
                }
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "❌";
            deleteBtn.style.background = "transparent";
            deleteBtn.style.border = "none";
            deleteBtn.style.color = "var(--text)";
            deleteBtn.style.fontSize = "20px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.addEventListener("click", () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        updateStats();
    }

    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        numbers.textContent = `${completed}/${total}`;
        progress.style.width = total === 0 ? "0%" : `${(completed / total) * 100}%`;
    }
});
