/***************************Element Seletors***********
 ******************************************************/

const navEle = document.querySelectorAll("li");
let all = document.querySelector(".all");
let completed = document.querySelector(".completed");
let incompleted = document.querySelector(".incompleted");
let addBtn = document.querySelector(".addTodo");
let todosContainer = document.querySelector(".content");
let todoForm = document.querySelector(".todoForm");
let modalAddBtn = document.querySelector(".modalAddBtn");
let modalCancelBtn = document.querySelector(".modalCancelBtn");
let todoValue = document.querySelector("#todoValue");
let msg = document.querySelector(".msg");

/***************************Events*******************
 *****************************************************/

// Load Todos
window.onload = function() {
    let savedTodos = JSON.parse(localStorage.getItem("todo"));
    if (savedTodos !== null) {
        savedTodos.forEach(function(item) {
            createHtmlStructure(item, "");
        });
    }

    let completeTodos = JSON.parse(localStorage.getItem("ctodo"));
    if (completeTodos !== null) {
        completeTodos.forEach(function(item) {
            createHtmlStructure(item, "completedTodo");
        });
    }

    if (completeTodos.length > 0 || savedTodos.length > 0) {
        msg.style.display = "none";
    }
};
// Filters click Event
navEle.forEach(function(item) {
    item.addEventListener("click", function(e) {
        let listType = e.target.innerText;
        switch (listType) {
            case "Completed":
                togglelistElementClass(listType);
                break;
            case "Incompleted":
                togglelistElementClass(listType);
                break;
            case "All":
                togglelistElementClass(listType);
                break;
        }
    });
});
// click event for showing modal
addBtn.addEventListener("click", function() {
    Object.assign(todoForm.style, { bottom: "22%" });
});
// click event for hiding modal
modalCancelBtn.addEventListener("click", function(e) {
    e.preventDefault();
    Object.assign(todoForm.style, { bottom: "-22%" });
});
// // click event foradding todo
modalAddBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // console.log(todoValue.value.length);
    if (todoValue.value !== "") {
        let todoArr = JSON.parse(localStorage.getItem("todo"));
        if (todoArr === null || todoArr.length == 0) {
            todoArr = [];
            todoArr.push(todoValue.value);
        } else {
            todoArr.push(todoValue.value);
        }

        localStorage.setItem("todo", JSON.stringify(todoArr));
        createHtmlStructure(todoValue.value);
    }
    todoValue.value = "";
    msg.style.display = "none";
    Object.assign(todoForm.style, { bottom: "-22%" });
});

// Set todo as completed
document.querySelector("body").addEventListener("click", function(e) {
    if (event.target.classList.value === "fa fa-check") {
        e.target.parentNode.parentNode.classList.add("completedTodo");
        let completeTodoText = e.target.parentNode.previousSibling.innerText;
        let comTodoArr = JSON.parse(localStorage.getItem("ctodo"));
        if (comTodoArr === null || comTodoArr.length == 0) {
            comTodoArr = [];
            comTodoArr.push(completeTodoText);
        } else {
            comTodoArr.push(completeTodoText);
        }

        localStorage.setItem("ctodo", JSON.stringify(comTodoArr));
        let allTodo = JSON.parse(localStorage.getItem("todo"));
        let completedIndex = allTodo.indexOf(completeTodoText);
        allTodo.splice(completedIndex, 1);
        localStorage.setItem("todo", JSON.stringify(allTodo));
    }
});

document.querySelector("body").addEventListener("click", function(e) {
    if (event.target.classList.value === "fa fa-trash") {
        let deleteTodoText = e.target.parentNode.previousSibling;
        if (deleteTodoText.parentNode.classList.value === "todo completedTodo") {
            let cTodo = JSON.parse(localStorage.getItem("ctodo"));
            let deleteIndex = cTodo.indexOf(deleteTodoText.innerText);
            cTodo.splice(deleteIndex, 1);
            localStorage.setItem("ctodo", JSON.stringify(cTodo));
            deleteTodoText.parentNode.remove();
        } else {
            let aTodo = JSON.parse(localStorage.getItem("todo"));
            let delIndex = aTodo.indexOf(deleteTodoText.innerText);
            aTodo.splice(delIndex, 1);
            localStorage.setItem("todo", JSON.stringify(aTodo));
            deleteTodoText.parentNode.remove();
        }

        let allTodoArr = JSON.parse(localStorage.getItem("todo"));
        let comTodoArr = JSON.parse(localStorage.getItem("ctodo"));
        if (allTodoArr.length == 0 && comTodoArr.length == 0) {
            msg.style.display = "flex";
        }
    }
});

/***************************Functions*******************
 ******************************************************/

// Toggle nav active class
function togglelistElementClass(listType) {
    switch (listType) {
        case "Completed":
            all.classList.remove("active");
            incompleted.classList.remove("active");
            completed.classList.add("active");
            toggleTodoClasses(listType);
            break;
        case "Incompleted":
            all.classList.remove("active");
            incompleted.classList.add("active");
            completed.classList.remove("active");
            toggleTodoClasses(listType);
            break;
        case "All":
            all.classList.add("active");
            incompleted.classList.remove("active");
            completed.classList.remove("active");
            toggleTodoClasses(listType);
            break;
    }
}

// Append new todo in DOM
function createHtmlStructure(textValue, type = null) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (type === "completedTodo") {
        todoDiv.classList.add("completedTodo");
    }

    let todoText = document.createElement("p");
    todoText.classList.add("todoText");
    todoText.innerText = textValue;

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';

    let trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';

    todoDiv.innerHTML =
        todoText.outerHTML + checkBtn.outerHTML + trashBtn.outerHTML;
    todosContainer.appendChild(todoDiv);
}

// Show todos respective to active tab
function toggleTodoClasses(listType) {
    let allTodo = document.querySelectorAll(".todo");
    let completeTodo = document.querySelectorAll(".completedTodo");
    switch (listType) {
        case "Completed":
            allTodo.forEach(function(todo) {
                todo.style.display = "none";
            });
            completeTodo.forEach(function(todo) {
                todo.style.display = "flex";
            });
            break;
        case "Incompleted":
            allTodo.forEach(function(todo) {
                todo.style.display = "flex";
            });
            completeTodo.forEach(function(todo) {
                todo.style.display = "none";
            });
            break;
        case "All":
            allTodo.forEach(function(todo) {
                todo.style.display = "flex";
            });
            break;
    }
}