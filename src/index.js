import { createList, populateList, populateProjects } from './list';
import loadToday from './today';
import loadWeek from './thisWeek';
import loadHome from './home';
import './style.css';


function createPage() {
    const main = document.createElement('main');
    main.classList.add('main');
    main.setAttribute('id', 'main')

    return main;
}

function addProjectPage() {
    const exitProjectForm = document.querySelector('.exitProjectFormBtn');
    exitProjectForm.addEventListener('click', () => {
        newProjectOverlay.classList.remove('active');
    })
    const  projectsPage = document.querySelector('.projects')
    const newProjectOverlay = document.querySelector('.newProjectOverlay');

    

    newProjectOverlay.classList.add('active')

    const newProjectSubmit = document.querySelector('.newProjectSubmit');

    newProjectSubmit.addEventListener('click', () => {
        const allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
        const projectForm = document.querySelector('.newProjectForm');
        const projectTitle = projectForm.querySelector('[id=projectTitle]').value;
        
        // localStorage.setItem('newProject', newProject)
        const project = {
            projectTitle
        }
        allProjects.push(project)     
        populateProjects(allProjects, projectsPage)
        localStorage.setItem('allProjects', JSON.stringify(allProjects))

        newProjectOverlay.classList.remove('active')
    })

    // create local storage for new projects c  

    
}

function addNewTaskForm() {
    const exitFormBtn = document.querySelector('.exitFormBtn');
    const taskForm = document.querySelector('.newTaskForm');
    exitFormBtn.addEventListener('click', () => {
        taskFormOverlay.classList.remove('active');
        taskForm.reset();
    })
    const taskFormOverlay = document.querySelector('.newFormOverlay');
    taskFormOverlay.classList.add('active');


    if(taskFormOverlay.classList.contains('edit')) {
        const editFormSubmit = document.querySelector('#newFormSubmit');
        editFormSubmit.innerHTML = 'Edit Task';
        
        return;
    }

    console.log('passed')


    taskForm.addEventListener('submit', handleNewTask);

    const priorityBtns = document.querySelectorAll('.priority');

    priorityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            changePriority(btn, priorityBtns);
            if(btn.classList.contains('active')) {
                btn.checked = true;
                priorityBtns.forEach(btn => {
                    if(!btn.classList.contains('active')) {
                        btn.checked = false;
                    }
                });
            }
        })
    })
}

function changePriority(btn, priorityBtns) {
    priorityBtns.forEach((btn) => {
        if(btn !== this) {
            btn.classList.remove('active');
        }
    });
    btn.classList.add('active');
}

function handleNewTask(e) {
    e.preventDefault();
    createList()
    const taskFormOverlay = document.querySelector('.newFormOverlay');
    const allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    const toDoList = document.querySelector('.todo-items');
    const newTitle = this.querySelector(('[id=newTaskTitle]')).value;
    const newDescription = this.querySelector(('[id=newTaskDescription')).value;
    const dueDate = this.querySelector(('[id=newTaskDueDate]')).value;
    const formFooter = document.querySelector('.newFormFooter');
    const priorityValue = formFooter.querySelector(('.priority.active')).value;
    const projectCategory = this.querySelector(('[id=projectCategory]')).value;

    const task = {
        newTitle,
        newDescription,
        dueDate,
        priorityValue,
        projectCategory
    }
    console.log(task)
    allTasks.push(task);
    populateList(allTasks, toDoList);
    localStorage.setItem('allTasks', JSON.stringify(allTasks))
    taskFormOverlay.classList.remove('active');
    this.reset();
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) => {

    handleDeleteTask(e)

    }))
}

function handleDeleteTask(e) {
    const trying = e.target.parentElement;
    const postid = trying.querySelector('.titleTask').textContent;
    console.log(postid)
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));
    const toDoList = document.querySelector('.todo-items');

    const match = allTasks.find(task => task.newTitle === postid)

    console.log(match)

    const index = allTasks.indexOf(match)

    allTasks.splice(index, 1)

    localStorage.setItem('allTasks', JSON.stringify(allTasks))

    populateList(allTasks, toDoList)

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) => {

    handleDeleteTask(e)

    }))

    // const match = allTasks.find(task => task.newTitle === e.target.id)
}


function setActivePage(button) {
    const buttons = document.querySelectorAll('.navBtn');
    
    buttons.forEach((button) => {
        if(button !== this) {
            button.classList.remove('active');
        }
    });

    button.classList.add('active');
}

function handleProjectPage(e) {
    createList();
    const projectTitle = e.target.dataset.id;
    const toDoList = document.querySelector('.todo-items');

    const allTasks = JSON.parse(localStorage.getItem('allTasks'));

    const projectTasks = allTasks.filter((task) => (task.projectCategory) === projectTitle)

    populateList(projectTasks, toDoList);

    const deleteProject = document.createElement('button');
    deleteProject.setAttribute('id', `${e.target.dataset.id}`)
    deleteProject.innerHTML = 'Delete Project';

    toDoList.appendChild(deleteProject)

    deleteProject.addEventListener('click', (e) => {
        handleDeleteProject(e)
    })

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

function handleDeleteProject(e) {
    console.log(e.target.id)
    console.log(e.target.parentElement)
    const  projectsPage = document.querySelector('.projects')
    const allProjects = JSON.parse(localStorage.getItem('allProjects'));
    e.target.parentElement.remove()
    const match = allProjects.find(project => project.projectTitle === e.target.id)
    
    const index = allProjects.indexOf(match)
    console.log(index)
    allProjects.splice(index, 1)
    localStorage.setItem('allProjects', JSON.stringify(allProjects));
    populateProjects(allProjects, projectsPage)
    createList();
    loadHome();
}

function handleEditTask(e) {
    const allTasks = JSON.parse(localStorage.getItem('allTasks'));
    const trying = e.target.parentElement;
    const taskTitle = trying.querySelector('.titleTask').textContent;
    const item = trying.querySelector('.titleTask');

    const match = allTasks.find(task => task.newTitle === taskTitle)
    const index = allTasks.indexOf(match)

    console.log(index)

    const toDoList = document.querySelector('.todo-items');
    const newFormOverlay = document.querySelector('.newFormOverlay')
    newFormOverlay.classList.add('edit')
    addNewTaskForm()
    const title = document.querySelector('[id=newTaskTitle]');
    title.textContent = allTasks[index].newTitle;
    const description = document.querySelector('[id=newTaskDescription]');
    description.textContent = allTasks[index].newDescription;
    let dueDate = document.querySelector('[id=newTaskDueDate]');
    dueDate.valueAsDate = new Date(allTasks[index].dueDate);
    const priorityBtns = document.querySelectorAll('.priority');
    const project = document.querySelector('[id=projectCategory]');

    priorityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            changePriority(btn, priorityBtns);
            if(btn.classList.contains('active')) {
                btn.checked = true;
                priorityBtns.forEach(btn => {
                    if(!btn.classList.contains('active')) {
                        btn.checked = false;
                    }
                });
            }
        })
    })

    const editFormSubmit = document.querySelector('#newFormSubmit');
    editFormSubmit.value = 'Edit Task';

    editFormSubmit.addEventListener('click', () => {
        const priorityValue = document.querySelector(('.priority.active')).value;
        const editedTitle = title.value
        const editedDescription = description.value
        const editedDueDate = dueDate.value
        const editedPriority = priorityValue
        const editedProject = project.value
        const editedTask = {
            newTitle : editedTitle,
            newDescription: editedDescription,
            dueDate : editedDueDate,
            priorityValue : editedPriority,
            projectCategory : editedProject
        }
        allTasks.splice(index, 1, editedTask)
        localStorage.setItem('allTasks', JSON.stringify(allTasks));
        populateList(allTasks, toDoList)

    })
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => btn.addEventListener('click', (e) => {
        handleEditTask(e)
        }
        ))

}

function loadNotes() {
    const main = document.querySelector('.main');
    main.textContent = '';
    const newNoteBtn = document.createElement('button');
    newNoteBtn.classList.add('addNote');
    newNoteBtn.textContent = 'Add Note';
    main.appendChild(newNoteBtn);
    const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
    createGrid();
    const grid = document.querySelector('.grid');
    populateGrid(allNotes, grid)

    newNoteBtn.addEventListener('click', () => {
        addNewNote();
    })
    const deleteNoteBtns = document.querySelectorAll('.removeNote')
    deleteNoteBtns.forEach((button) => button.addEventListener('click', handleDeleteNote()))
}

function addNewNote() {
    const notesOverlay = document.querySelector('.notesOverlay');
    notesOverlay.classList.add('active');
    const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
    const notesForm = document.querySelector('.newNoteForm');

    const notesSubmit = document.querySelector('#notesSubmit');
    const grid = document.querySelector('.grid');

    const exitNoteForm = document.querySelector('.exitNoteBtn');
    exitNoteForm.addEventListener('click', () => {
        notesOverlay.classList.remove('active');
        notesForm.reset();
    })

    notesSubmit.addEventListener('click', () => {
        const notesTitle = notesForm.querySelector('[id=noteTitle]').value;
        const notesDescription = notesForm.querySelector('[id=noteDescription]').value;

        const note = {
            notesTitle,
            notesDescription
        }

        allNotes.push(note);
        populateGrid(allNotes, grid);
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
    })
}

function populateGrid(allNotes = [], grid) {
    grid.innerHTML = allNotes.map((note, i) => {
        return `
        <div class="grid-item" id="${i}">
            <h2>${note.notesTitle}</h2>
            <p>${note.notesDescription}</p>
            <button class="removeNote" data-id="${i}">&times</button>
        </div>
        `
    }).join('');
}

function createGrid() {
    const main = document.querySelector('.main');
    const grid = document.createElement('div');
    grid.classList.add('grid')

    main.appendChild(grid)
}

function handleDeleteNote() {
    const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
    const grid = document.querySelector('.grid');
    const deleteNoteBtns = document.querySelectorAll('.removeNote');
    const main = document.querySelector('.main')
    document.querySelectorAll('.removeNote').forEach(btn => {
        btn.onclick = function() {
            allNotes.splice(btn.dataset.id, 1);
            populateGrid(allNotes, grid);
            localStorage.setItem('allNotes', JSON.stringify(allNotes));
            main.appendChild(grid);
            deleteNoteBtns.forEach((button) => button.addEventListener('click', handleDeleteNote()))
        }
    })
}

function loadToDo() {
    const content = document.querySelector('.content');
    const homeBtn = document.querySelector('#home');
    const todayBtn = document.querySelector('#today');
    const thisWeekBtn = document.querySelector('#thisWeek');
    const allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    const allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
    const addBtn = document.querySelector('#newTaskBtn');
    const newProject = document.querySelector('.newProjectBtn');
    const projectsPage = document.querySelector('.projects');
    const notesTab = document.querySelector('.notes');

    notesTab.addEventListener('click', (e) => {
        if (e.target.classList.contains('active')) return;
        setActivePage(homeBtn);
        loadNotes();
    })

    homeBtn.addEventListener('click', (e) => {
        if (e.target.classList.contains('active')) return;
        setActivePage(homeBtn);
        loadHome();
    });

    newProject.addEventListener('click', () => {
        addProjectPage();
    })

    todayBtn.addEventListener('click', (e) => {
        if (e.target.classList.contains('active')) return;
        setActivePage(todayBtn);
        loadToday();
    });

    thisWeekBtn.addEventListener('click', (e) => {
        if ( e.target.classList.contains('active')) return;
        setActivePage(thisWeekBtn);
        loadWeek();
    });

    addBtn.addEventListener('click', () => {
        addNewTaskForm();

    });

    content.appendChild(createPage());
    createList();
    const toDoList = document.querySelector('.todo-items');
    populateProjects(allProjects, projectsPage);
    populateList(allTasks, toDoList);

    const projectBtns = document.querySelectorAll('.projectBtn');
    projectBtns.forEach((button) => button.addEventListener('click', (e) => {
        handleProjectPage(e)
    }
    ))

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((button) => button.addEventListener('click', (e) =>  {
    handleDeleteTask(e)
    }
    ))
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn) => btn.addEventListener('click', (e) => {
        handleEditTask(e)
        }
        ))
} 
loadToDo();

export {handleDeleteTask, handleEditTask, populateProjects, handleProjectPage} ;

