// Seleção de elementos comuns
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const editInput = document.querySelector('#editTitle'); // Adicionar seleção do input de edição

// Funções comuns
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo'); // Corrigido para '.todo'

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if (todoTitle.innerHTML === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

function closeEditDialog() {
    const editDialog = document.getElementById('editTaskDialog');
    editDialog.close();
}

function filterTasks() {
    const filterTitle = document.getElementById('filterTitle').value.toLowerCase();
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');

    for (let task of tasks) {
        const title = task.querySelector('h2').textContent.toLowerCase();
        if (title.includes(filterTitle)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    }
}

// Eventos comuns
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
        // Salvar todo
    }
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('.todo'); // Corrigido para '.todo'
    let todoTitle;

    if (parentEl) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();
    }

    if (targetEl.classList.contains('edit-todo')) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle; // Corrigido para definir oldInputValue
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

// Funções específicas para Tarefas
async function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!title || !description) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/Tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tituloTarefa: title, descricaoTarefa: description })
        });

        const data = await response.json();

        if (response.ok) {
            // Adicione a nova tarefa à lista
            const taskList = document.getElementById('taskList');
            const li = document.createElement('li');
            li.id = data._id;
            li.innerHTML = `
                <h2>${data.tituloTarefa}</h2>
                <p>${data.descricaoTarefa}</p>
                <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog('${data._id}')">✏️</button>
                <button class="delete-btn" title="Excluir tarefa" onclick="removeTask('${data._id}')">❌</button>
            `;
            taskList.appendChild(li);

            // Limpe o formulário
            document.getElementById('taskForm').reset();
        } else {
            alert('Erro ao adicionar tarefa: ' + data.message);
        }
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        alert('Erro ao adicionar tarefa');
    }
}

async function removeTask(taskId) {
    try {
        const response = await fetch(`http://localhost:5000/Tarefas/${taskId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remova a tarefa do DOM
            const taskElement = document.getElementById(taskId);
            taskElement.remove();
        } else {
            const data = await response.json();
            alert('Erro ao remover tarefa: ' + data.message);
        }
    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
        alert('Erro ao remover tarefa');
    }
}

async function openEditDialog(taskId) {
    const taskElement = document.getElementById(taskId);
    const title = taskElement.querySelector('h2').textContent;
    const description = taskElement.querySelector('p').textContent;

    document.getElementById('editTaskId').value = taskId;
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;

    const editDialog = document.getElementById('editTaskDialog');
    editDialog.showModal();
}

async function saveEdit(event) {
    event.preventDefault();
    const taskId = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTitle').value.trim();
    const description = document.getElementById('editDescription').value.trim();

    if (!title || !description) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/Tarefas/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tituloTarefa: title, descricaoTarefa: description })
        });

        const data = await response.json();

        if (response.ok) {
            // Atualize a tarefa no DOM
            const taskElement = document.getElementById(taskId);
            taskElement.querySelector('h2').textContent = data.tituloTarefa;
            taskElement.querySelector('p').textContent = data.descricaoTarefa;

            // Feche o dialog
            const editDialog = document.getElementById('editTaskDialog');
            editDialog.close();
        } else {
            alert('Erro ao editar tarefa: ' + data.message);
        }
    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        alert('Erro ao editar tarefa');
    }
}
