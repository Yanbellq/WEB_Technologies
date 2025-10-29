document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const sortByDate = document.getElementById("sortByDate");
    const sortByStatus = document.getElementById("sortByStatus");
    const sortByUpdate = document.getElementById("sortByUpdate");

    let tasks = [];

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            // Обгортка тексту завдання
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.className = task.completed ? "taskText completed" : "taskText";

            // Додавання можливості редагування тексту завдання
            taskText.addEventListener("dblclick", () => {
                const input = document.createElement("input");
                input.type = "text";
                input.value = task.text;
                input.className = "editTaskInput";

                // Збереження змін після редагування
                input.addEventListener("blur", () => {
                    if (input.value.trim()) {
                        tasks[index].text = input.value.trim();
                        tasks[index].updatedAt = new Date();
                        renderTasks();
                    } else {
                        alert("Текст завдання не може бути порожнім!");
                    }
                });

                // Збереження змін при натисканні Enter
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        input.blur();
                    }
                });

                li.replaceChild(input, taskText);
                input.focus();
            });

            // Позначення виконаного завдання
            li.addEventListener("click", (e) => {
                if (e.target !== taskText && e.target !== deleteButton) {
                    tasks[index].completed = !tasks[index].completed;
                    renderTasks();
                }
            });

            // Кнопка видалення
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Видалити";
            deleteButton.className = "deleteButton";
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            li.appendChild(taskText);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    };

    // Додавання нового завдання
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (taskInput.value.trim()) {
            tasks.push({
                text: taskInput.value.trim(),
                completed: false,
                addedAt: new Date(),
                updatedAt: null,
            });
            taskInput.value = "";
            renderTasks();
        }
    });

    // Сортування за датою
    sortByDate.addEventListener("click", () => {
        tasks.sort((a, b) => a.addedAt - b.addedAt);
        renderTasks();
    });

    // Сортування за станом
    sortByStatus.addEventListener("click", () => {
        tasks.sort((a, b) => a.completed - b.completed);
        renderTasks();
    });

    // Сортування за оновленням
    sortByUpdate.addEventListener("click", () => {
        tasks.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        renderTasks();
    });
});
