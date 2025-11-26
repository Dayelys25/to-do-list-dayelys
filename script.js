// Selectores del DOM
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

// Estado del proyecto: Array para guardar todas las tareas
let tasks = [];

// Función para añadir una nueva tarea
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("¡No olvides escribir tu meta o tarea!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ''; // Limpiar input
    renderTasks();
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks(); // Volver a dibujar para moverla a la columna correcta
    }
}

// Función principal para renderizar todas las tareas en las dos columnas
function renderTasks() {
    // Limpiar listas actuales antes de redibujar
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        // Crear el elemento de la lista (<li>)
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // 1. Texto de la tarea
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        // 2. Botón de check (Corazón para pendiente, Check para realizado)
        const checkButton = document.createElement('button');
        checkButton.className = 'check-button';
        checkButton.textContent = task.completed ? '✔' : '♡'; 
        
        // Asignar la función toggleTask al botón
        checkButton.addEventListener('click', () => toggleTask(task.id));

        // Ensamblar el <li>
        listItem.appendChild(taskText);
        listItem.appendChild(checkButton);

        // 3. Añadir a la lista correcta
        if (task.completed) {
            completedList.appendChild(listItem);
        } else {
            pendingList.appendChild(listItem);
        }
    });
}

// Event Listeners
addButton.addEventListener('click', addTask);

// Permitir añadir con la tecla Enter en el input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);