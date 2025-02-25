import { allData } from "./dataList.js";
import { textEvaluate } from "./userInputModule.js";
import {
  findIndex,
  editTaskBtnListeners,
  saveToLocStorage,
} from "./appController.js";
import { ID } from "./projectsHandler.js";

// displayProject
const controlIcons = [
  {
    icon: "edit",
    class: "edit-btn",
    html: `<svg
                      class="edit-svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      ></path>
                      <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      ></path>
                    </svg>`,
  },
  {
    icon: "check",
    class: "check-btn",
    html: `<svg
                      class="check-svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="M22 4 12 14.01l-3-3"></path>
                    </svg>`,
  },
  {
    icon: "bin",
    class: "bin-btn",
    html: `<svg
                      class="bin-svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18"></path>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>`,
  },
];

export const renderTasks = (project) => {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = "";

  if (project !== undefined) {
    project.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      li.id = task.id;

      const priority = document.createElement("button");
      priority.classList.add("priority");
      switch (task.priority) {
        case 1:
          priority.textContent = "!";
          priority.style.backgroundColor = "var(--yellow)";
          break;
        case 2:
          priority.textContent = "!!";
          priority.style.backgroundColor = "var(--light-pink)";
          break;
        case 3:
          priority.textContent = "!!!";
          priority.style.backgroundColor = "var(--orange)";
          break;
        default:
          priority.textContent = "";
          break;
      }

      const infoCnt = document.createElement("div");
      infoCnt.classList.add("todo-info");

      const title = document.createElement("p");
      title.classList.add("title");
      title.textContent = task.title;

      const descr = document.createElement("p");
      descr.classList.add("descr");
      descr.textContent = task.descr;

      infoCnt.appendChild(title);
      infoCnt.appendChild(descr);

      const dueDate = document.createElement("div");
      dueDate.classList.add("due-date");
      dueDate.textContent = task.dueTo;

      li.appendChild(priority);
      li.appendChild(infoCnt);
      li.appendChild(dueDate);

      controlIcons.forEach((icon) => {
        const btn = document.createElement("button");
        btn.classList.add(icon.class);
        btn.innerHTML = icon.html;
        li.appendChild(btn);

        if (icon.class === "check-btn") {
          const svg = btn.getElementsByTagName("svg")[0];

          if (task.done === true) {
            btn.classList.add("done");
            btn.style.backgroundColor = "var(--green)";
            svg.classList.add("done");
          } else {
            task.done = false;
            btn.classList.remove("done");
            btn.style.backgroundColor = "var(--grey-cnt)";
            svg.classList.remove("done");
          }
        }
      });
      tasksList.appendChild(li);
    });
    editTaskBtnListeners();
  } else {
    tasksList.innerHTML = "";
  }
};

const taskName = document.getElementById("title-user-input");
const description = document.getElementById("decription-user-input");
const dueDate = document.getElementById("due-date-user-input");
const priority = document.getElementById("priority-user-input");
export const errTaskInput = document.getElementById("error-task-dialog");

class Task {
  constructor(title, description, dueDate, priority, id) {
    this.title = title;
    this.descr = description;
    this.dueTo = dueDate;
    this.priority = priority;
    this.id = `id${id}`;
    this.done = false;
  }
}

export const addNewTask = () => {
  const projectTitle = document.querySelector("#current-project p");

  if (taskName.value === "" || taskName.value.length <= 3) {
    errTaskInput.textContent = "Title needs to be longer than 3 letters";
    return false;
  } else if (taskName.value === null) {
    errTaskInput.textContent = "Insert a title";
    return false;
  } else if (dueDate.value === "") {
    errTaskInput.textContent = "Insert a due date";
    return false;
  } else if (projectTitle.id === "") {
    errTaskInput.textContent =
      "Close this window and select a project to create a task";
    return false;
  } else {
    if (description.value === "") {
      description.value = "-";
    }

    const newTask = new Task(
      textEvaluate(taskName.value),
      textEvaluate(description.value),
      dueDate.value,
      Number(priority.value),
      String(ID.generate())
    );

    const projectIndex = findIndex(projectTitle.id);

    allData[projectIndex].tasks.push(newTask);
    renderTasks(allData[projectIndex]);

    return true;
  }
};

const titleInput = document.getElementById("title-change");
const descrInput = document.getElementById("decription-change");
const dueDateInput = document.getElementById("due-date-change");
const priorityInput = document.getElementById("priority-change");
export const errChangeTaskInput = document.getElementById(
  "error-change-task-dialog"
);

export const openTask = (editingTask) => {
  titleInput.value = editingTask.title;
  descrInput.value = editingTask.descr;
  dueDateInput.value = editingTask.dueTo;
  priorityInput.value = editingTask.priority;
};

export const findTask = (taskID) => {
  const projectTitle = document.querySelector("#current-project p");
  const projectIndex = findIndex(projectTitle.id);
  for (let i = 0; i < allData[projectIndex].tasks.length; i++) {
    if (allData[projectIndex].tasks[i].id === taskID) {
      return [projectIndex, allData[projectIndex].tasks[i], i];
    }
  }
};

export const changeTask = (input) => {
  const projectIndex = input[0];
  const task = input[1];
  if (titleInput.value.length > 3) {
    task.title = titleInput.value;
  } else {
    errChangeTaskInput.textContent = "Title has to have more than 3 letters";
    return false;
  }

  if (descrInput.value !== "") {
    task.descr = descrInput.value;
  } else {
    task.descr = "-";
  }

  task.dueTo = dueDateInput.value;
  task.priority = Number(priorityInput.value);
  renderTasks(allData[projectIndex]);
  return true;
};

export const checkTaskDone = (task) => {
  const projectIndex = task[0];
  const editedTask = task[1];

  const id = editedTask.id;
  const selector = `li#${id} button.check-btn`;

  const checkBtn = document.querySelector(selector);
  const svg = document.querySelector(`li#${id} button.check-btn svg`);

  if (editedTask.done !== true) {
    editedTask.done = true;
    checkBtn.classList.add("done");
    checkBtn.style.backgroundColor = "var(--green)";
    svg.classList.add("done");
  } else {
    editedTask.done = false;
    checkBtn.classList.remove("done");
    checkBtn.style.backgroundColor = "var(--grey-cnt)";
    svg.classList.remove("done");
  }
};

export const deleteTask = (task) => {
  const projectIndex = task[0];
  const editedTask = task[1];
  const tasIndex = task[2];
  allData[projectIndex].tasks.splice(tasIndex, 1);
  renderTasks(allData[projectIndex]);
};

export const clearInputs = () => {
  taskName.value = "";
  description.value = "";
  dueDate.value = "";
};
