import { createList, populateList } from "./list";
import {handleDeleteTask, handleEditTask } from "./index";


function loadToday() { 
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));

    let todaysDate = new Date();

    let year = todaysDate.getFullYear().toString();
    let month = (todaysDate.getMonth() + 1).toString();
    let day = todaysDate.getDate().toString();

    let compareDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    const todaysTasks = allTasks.filter(task => (task.dueDate === compareDate))

    const main = document.querySelector('.main');
    main.textContent = '';

    createList();

    const toDoList = document.querySelector('.todo-items');

    populateList(todaysTasks, toDoList)

    main.appendChild(toDoList);

    console.log(todaysTasks)

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) => {
        handleDeleteTask(e)
        }
        ))
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => btn.addEventListener('click', (e) => {
        handleEditTask(e)
        }
        ))

}

export default loadToday;