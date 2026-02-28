const input = document.getElementById('todoInput');
const addButton = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const deleteButton = document.querySelector('.danger-btn'); // ИСПРАВЛЕНО: ищем по классу

let tasks = JSON.parse(localStorage.getItem('todo')) || [];

function saveAndRender() {
	localStorage.setItem('todo', JSON.stringify(tasks) );
	render()
}

function render () {
    todoList.innerHTML = ''; 
    tasks.forEach( (task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `  
            <div class="todo-article">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span> 
            </div>
            <button data-action="delete">Удалить</button> 
        `;
        
        todoList.appendChild(li);
    });
}

// ДОБАВЛЕНИЕ
addButton.addEventListener('click', (event) => {
    if(input.value.trim()) { 
        tasks.push({ text: input.value, completed: false });
        input.value = ''; 
        saveAndRender() ;
    }
});

// ОЧИСТИТЬ ВСЕ 
deleteButton.addEventListener('click', (event) => {
    tasks = [];
    render();
	
});

// УДАЛЕНИЕ / checkbox
todoList.addEventListener('click', (event) => {
    const li = event.target.closest('li'); 
    if (li) {
        const index = li.dataset.index;
        if (index) {
            const action = event.target.dataset.action;
            console.log(action);
            if (action === 'delete') {
                tasks.splice(index, 1);
                console.log(tasks);
                render();
            } else if (event.target.type === 'checkbox') {
                tasks[index].completed = event.target.checked;
            }
			saveAndRender()
        }
    }
});

render();