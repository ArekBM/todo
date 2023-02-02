import { createList, populateList } from "./list";
import {handleDeleteTask, handleEditTask} from ".";

function loadWeek() {
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));

    let todaysDate = new Date();

    //One Weeks Time
    let compareDate = todaysDate.valueOf() + 604800000;

    const weekTasks = allTasks.filter((task)=> (((Date.parse(task.dueDate)) >= todaysDate.valueOf() - 	85353605) && (Date.parse(task.dueDate)) <= compareDate))

    const main = document.querySelector('.main');
    main.textContent = '';

    createList();

    const toDoList = document.querySelector('.todo-items');

    populateList(weekTasks, toDoList)

    main.appendChild(toDoList);

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) => {
     handleDeleteTask(e) 
    }))
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => btn.addEventListener('click', (e) => {
        handleEditTask(e)
        }
        ))
}


export default loadWeek;