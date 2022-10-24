const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

// returns true/false
const validateInput = () => inputElement.value.trim().length > 0;

// checks if input is valid
const handleAddTask = () => {
  const inputIsValid = validateInput();

  // makes the input red
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  // creates a new div
  const taskItemContainer = document.createElement("div");
  // receives task-item class
  taskItemContainer.classList.add("task-item");

  // div content = p
  const taskContent = document.createElement("p");
  // p content = inputElement
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  // trash icon
  const deleteItem = document.createElement("i");
  //adds classes
  deleteItem.classList.add("bx");
  deleteItem.classList.add("bx-trash");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  // removes the color red from input
  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  for (const task of tasksFromLocalStorage){
  // creates a new div
  const taskItemContainer = document.createElement("div");
  // receives task-item class
  taskItemContainer.classList.add("task-item");

  // div content = p
  const taskContent = document.createElement("p");
  // p content = inputElement
  taskContent.innerText = task.description;

  if (task.isCompleted){
    taskContent.classList.add('completed');
  }

  taskContent.addEventListener("click", () => handleClick(taskContent));

  // trash icon
  const deleteItem = document.createElement("i");
  //adds classes
  deleteItem.classList.add("bx");
  deleteItem.classList.add("bx-trash");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);
  }
}

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
