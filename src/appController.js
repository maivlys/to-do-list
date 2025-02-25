import { allData } from "./dataList.js";
import {
  renderProjects,
  deleteProject,
  displayCurrentProject,
  addNewProject,
  projectName,
  errProjectInput,
} from "./projectsHandler";
import {
  renderTasks,
  addNewTask,
  clearInputs,
  openTask,
  findTask,
  changeTask,
  checkTaskDone,
  deleteTask,
  errTaskInput,
  errChangeTaskInput,
} from "./tasksHandler.js";

export const findIndex = (id) => {
  for (let i = 0; i < allData.length; i++) {
    if (id === allData[i].id) {
      return i;
    }
  }
  return null;
};

const clearErrorMsg = () => {
  errProjectInput.textContent = "";
  errTaskInput.textContent = "";
  errChangeTaskInput.textContent = "";
};

export const addProjectAndTasksListeners = () => {
  const projectBinBtns = document.querySelectorAll(".project-bin-btn");
  for (const btn of projectBinBtns) {
    btn.addEventListener("click", (e) => {
      deleteProject(e.target.id);
      renderProjects();
      saveToLocStorage();
    });
  }

  const allProjects = document.querySelectorAll("ul#projects-list li");
  for (const project of allProjects) {
    project.addEventListener("click", (e) => {
      for (const project of allProjects) {
        project.classList.remove("clicked");
      }
      const i = findIndex(e.target.id);
      displayCurrentProject(i, e.target.id);
      saveToLocStorage();
      renderTasks(allData[i]);
    });
  }
};

function createTask() {
  let task = "";

  return {
    saveTask: (newTask) => {
      task = newTask;
    },
    getTask: () => {
      return task;
    },
    removeTask: () => {
      task = "";
    },
  };
}

const editedTask = createTask();

export const editTaskBtnListeners = () => {
  const changeTaskDialog = document.getElementById("change-task-dialog");
  const allTaskEditBtns = document.querySelectorAll(".edit-btn");
  for (const btn of allTaskEditBtns) {
    btn.addEventListener("click", (e) => {
      editedTask.saveTask(findTask(e.target.closest("li").id));

      openTask(editedTask.getTask()[1]);

      changeTaskDialog.showModal();
    });
  }

  const allTaskCheckBtns = document.querySelectorAll(".check-btn");
  for (const btn of allTaskCheckBtns) {
    btn.addEventListener("click", (e) => {
      editedTask.saveTask(findTask(e.target.closest("li").id));

      checkTaskDone(editedTask.getTask());
      saveToLocStorage();
    });
  }

  const allTaskDeleteBtns = document.querySelectorAll(".bin-btn");
  for (const btn of allTaskDeleteBtns) {
    btn.addEventListener("click", (e) => {
      editedTask.saveTask(findTask(e.target.closest("li").id));
      deleteTask(editedTask.getTask());
      saveToLocStorage();
    });
  }
};

export const addFormListeners = () => {
  const projectDialog = document.getElementById("add-project-dialog");
  const addProjectBtn = document.getElementById("add-project-btn");
  addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
  });

  const taskDialog = document.getElementById("add-task-dialog");
  const addTaskBtn = document.getElementById("add-task-btn");
  addTaskBtn.addEventListener("click", () => {
    taskDialog.showModal();
  });

  // const addProjectForm = document.getElementById("add-project-form");
  const addNewProjectBtn = document.getElementById("project-submit-form-btn");
  addNewProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (addNewProject()) {
      projectName.value = "";
      projectDialog.close();
      saveToLocStorage();
    }
  });

  const addNewTaskBtn = document.getElementById("task-submit-form-btn");
  addNewTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (addNewTask()) {
      clearInputs();
      taskDialog.close();
      clearErrorMsg();
      saveToLocStorage();
    }
  });
  const changeTaskDialog = document.getElementById("change-task-dialog");
  const changeTaskBtn = document.getElementById("task-change-btn");
  changeTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (changeTask(editedTask.getTask())) {
      saveToLocStorage();
      changeTaskDialog.close();
      clearErrorMsg();
    }
  });

  const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
  for (const btn of closeDialogBtns) {
    btn.addEventListener("click", () => {
      taskDialog.close();
      clearErrorMsg();
      projectDialog.close();
    });
  }

  const cancelChangesBtn = document.getElementById("cancel-change-btn");
  cancelChangesBtn.addEventListener("click", () => {
    changeTaskDialog.close();
    clearErrorMsg();
  });
};

export const saveToLocStorage = () => {
  localStorage.setItem("data", JSON.stringify(allData));
};
