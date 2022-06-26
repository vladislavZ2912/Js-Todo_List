const form = document.querySelector('#form')
const TaskInput = document.querySelector('#taskInput')
const TaskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
let tasks = []


if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task)=>{updateTask(task)})
}
if (tasks.length > 0){
    emptyList.classList.add('none')
}

function updateTask(taskLC){

    const cssClass = taskLC.done ? 'task-title task-title--done' : "task-title"

    let taskHTML = `<li id="${taskLC.id}"  class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${taskLC.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`
    TaskList.insertAdjacentHTML('beforeend', taskHTML)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask(e){
    e.preventDefault()

    let newTask = {
        id: Date.now(),
        text: TaskInput.value,
        done: false
    }
    tasks.push(newTask)
    
    const cssClass = newTask.done ? 'task-title task-title--done' : "task-title"

    let taskHTML = `<li id="${newTask.id}"  class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`

    TaskList.insertAdjacentHTML('beforeend', taskHTML)
    TaskInput.value = ""
    TaskInput.focus()
    if (tasks.length > 0){
        emptyList.classList.add('none')
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function deleteTask (event){
    if (event.target.dataset.action === 'delete'){
        event.target.closest('li').remove()
        tasks = tasks.filter((task) => task.id !== parseInt(event.target.closest('li').id))
    } else if(event.target.dataset.action === 'done'){
        const doneId = tasks.findIndex((task) => task.id === parseInt(event.target.closest('li').id))
        tasks[doneId].done = true
        event.target.closest('li').querySelector('.task-title').classList.add('task-title--done') 
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

form.addEventListener('submit', addTask)
TaskList.addEventListener('click', deleteTask)



