// Define UI Variable

const form = document.querySelector('.add-task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('a.clear-task');
const filterTask = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners

loadEventListeners();

// create a function for loading all the event listeners at once

function loadEventListeners(){

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task Event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTask);

    // filter task event
    filterTask.addEventListener('keyup', filterTasks);

}

// Get Tasks from local storage
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
        
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create element
        const li = document.createElement('li');
        
        // add class to li
        li.className = 'collection-item';
        
        // create text node
        const liText = document.createTextNode(task);
        
        // append textnode to li
        li.appendChild(liText);
        
        // create a new link element
        const link = document.createElement('a');
        
        // add class to the link
        link.className = 'delete-item secondary-content';
        
        // add icon html
        link.innerHTML = '<i class="fa-solid fa-trash-can fa-lg"></i>';
        
        // append the link to li
        li.appendChild(link);
        
        // add li to ul
        taskList.appendChild(li);
    })

}

// add task
function addTask(e){
    if(taskInput.value === ''){
        alert('>>>Please Add Task<<<');
    } else {

        
        // create element
        const li = document.createElement('li');
        
        // add class to li
        li.className = 'collection-item';
        
        // create text node
        const liText = document.createTextNode(taskInput.value);
        
        // append textnode to li
        li.appendChild(liText);
        
        // create a new link element
        const link = document.createElement('a');
        
        // add class to the link
        link.className = 'delete-item secondary-content';
        
        // add icon html
        link.innerHTML = '<i class="fa-solid fa-trash-can fa-lg"></i>';
        
        // append the link to li
        li.appendChild(link);
        
        // add li to ul
        taskList.appendChild(li);
        
        // store in local storage
        storeTaskInLocalStorage(taskInput.value);

        // clear input after adding
        taskInput.value = '';
        
        
    }
    e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove task from local storage

function removeTaskFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// clear task
function clearTask(){
    // one way
    // taskList.innerHTML = '';

    // another way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from local storage
    clearTasksFromLocalStorage();
}

// clear Tasks From Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter task
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    const allLists = document.querySelectorAll('.collection-item');
    
    allLists.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
            // task.style.border = 'none';
        } else {
            task.style.display = 'none';
        }
    });
}
