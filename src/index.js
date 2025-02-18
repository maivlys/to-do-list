// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);
import "./style.css";
import { allData } from "./dataList.js";
console.log(allData);

import { renderProjects } from "./projectsHandler.js";
renderProjects();

import { renderTasks } from "./tasksHandler.js";
renderTasks(allData[0]);

// const addBtn = document.querySelector(".add-btn");
// addBtn.innerHTML = addBtnSvg;

const taskDialog = document.getElementById("add-task-dialog");
const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => {
  taskDialog.showModal();
});

const projectDialog = document.getElementById("add-project-dialog");
const addProjectBtn = document.getElementById("add-project-btn");
addProjectBtn.addEventListener("click", () => {
  projectDialog.showModal();
});

const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
for (const btn of closeDialogBtns) {
  btn.addEventListener("click", () => {
    taskDialog.close();
    projectDialog.close();
  });
}

// -----------------------------------------------------------------------
