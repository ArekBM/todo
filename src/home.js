import { populateList, createList } from "./list";
import {handleDeleteTask, handleEditTask, populateProjects, handleProjectPage} from "./index";


function loadHome() {
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));
    const main = document.querySelector('.main');
    const allProjects = JSON.parse(localStorage.getItem('allProjects'));
    const  projectsPage = document.querySelector('.projects');

    main.textContent = '';

    createList();

    const toDoList = document.querySelector('.todo-items');

    populateList(allTasks, toDoList)

    main.appendChild(toDoList);

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) => {
        handleDeleteTask(e)
    }));
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => btn.addEventListener('click', (e) => {
        handleEditTask(e)
        }
        ))

    populateProjects(allProjects, projectsPage);

    const projectBtns = document.querySelectorAll('.projectBtn');
    projectBtns.forEach((button) => button.addEventListener('click', (e) => {
        handleProjectPage(e)
    }
    ));

    return main;

}

export default loadHome;