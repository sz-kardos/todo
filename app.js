//DOM elemek kiválasztása
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//eseményt adok hozzá
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);





function addTodo(e) {
    e.preventDefault();
    //Todo div létrehozása
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Kilistázom
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Gombot csinálok,majd appendálom 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    // fontawesome.com oldalról becsatolom az ikont
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash gomb hozzáadása
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Hozzá csatalom a divet
    todoList.appendChild(todoDiv);
}




function deleteTodo(e) {
    const item = e.target;
    // Törlési feltételek megadása
    if (item.classList[0] === "trash-btn") {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Div elemek létrehozása
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Lista készítés
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Completed gomb hozzáadása
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button hozzáadása
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Todo csatolása
        todoList.appendChild(todoDiv);
    });
}