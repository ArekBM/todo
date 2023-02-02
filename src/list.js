function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
            <li>
                <h1 data-index=${i} class="titleTask">${task.newTitle}</h1>
                <h3>${task.newDescription}</h3>
                <p>${task.dueDate}</p>
                <h3>${task.priorityValue}</h3>
                <button class='editBtn' data-edit='${i}'>Edit</button>
                <button class='deleteBtn' data-postid='${i}'>Delete</button>
            </li>
        `
    }).join('');

}

function createList() {
    const toDoList = document.createElement('ul');
    toDoList.classList.add('todo-items');
    const main = document.querySelector('.main');
    main.textContent = '';
    main.appendChild(toDoList);
    
    return main;
}

function populateProjects(projects = [], projectList) {
    projectList.innerHTML = projects.map((project, i) => {
        return `
        <button class="projectBtn" data-index="${i}" data-id="${project.projectTitle}">${project.projectTitle}</button>
        `
    }).join('')
}

export {createList, populateList, populateProjects};

