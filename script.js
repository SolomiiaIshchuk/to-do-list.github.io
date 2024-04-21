
let taskInput = document.getElementById('taskInput');
let taskDateInput = document.getElementById('taskDateInput'); 
let taskList = document.getElementById('taskList');
let background = document.getElementById('background');

function saveTasksToLocalStorage() {
    let taskItems = document.querySelectorAll('#taskList li');
    let tasks = [];
    taskItems.forEach(function(item) {
        let taskData = {
            text: item.querySelector('span').textContent,
            deleteButtonId: item.querySelector('button').id 
        };
        tasks.push(taskData);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(taskData) {
            let li = document.createElement('li');
            let hr = document.createElement('hr');
            let taskSpan = document.createElement('span');
            taskSpan.textContent = taskData.text;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.id = taskData.deleteButtonId; 
            deleteButton.addEventListener('click', function() {
                taskList.removeChild(li);
                taskList.removeChild(hr);
                adjustBackgroundHeightFromTasks(); 
                saveTasksToLocalStorage();
            });
            li.appendChild(taskSpan);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
            taskList.appendChild(hr);
        });
    }
}

function addTask() {
    let taskText = taskInput.value.trim();
    let taskDate = taskDateInput.value; 
    if (taskText !== '' && taskDate !== '') {
        let li = document.createElement('li');
        let hr = document.createElement('hr');
        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskText + ' | ' + taskDate; 
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        let deleteButtonId = 'deleteButton_' + Date.now(); 
        deleteButton.id = deleteButtonId;
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            taskList.removeChild(hr);
            adjustBackgroundHeightFromTasks(); 
            saveTasksToLocalStorage();
        });
        li.appendChild(taskSpan);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskList.appendChild(hr);
        taskInput.value = '';
        taskDateInput.value = ''; 
        adjustBackgroundHeightFromTasks(); 
        saveTasksToLocalStorage();
    }
}

function adjustBackgroundHeightFromTasks() {
    let taskItems = document.querySelectorAll('#taskList li');
    let totalTasksHeight = taskItems.length * 30; 
    background.style.height = (185 + totalTasksHeight) + 'px'; 
}

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'SPAN') {
        event.target.style.textDecoration = 'line-through';
        event.target.style.color = 'red';
    }
});

window.addEventListener('load', function() {
    loadTasksFromLocalStorage();
    adjustBackgroundHeightFromTasks(); 
});












































