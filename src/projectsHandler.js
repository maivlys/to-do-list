import { allData } from "./dataList.js";
import {
  addProjectAndTasksListeners,
  saveToLocStorage,
} from "./appController.js";
import { textEvaluate, projectTitleEvaluate } from "./userInputModule.js";

export const renderProjects = () => {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";

  allData.forEach((project) => {
    const li = document.createElement("li");
    li.id = project.id;
    const projectName = document.createElement("p");
    projectName.textContent = project.title;
    const delOption = document.createElement("button");
    delOption.classList.add("project-bin-btn");
    delOption.id = project.id;
    const binIcon = `<svg
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
                      </svg>`;
    delOption.innerHTML = binIcon;
    li.appendChild(projectName);
    li.appendChild(delOption);
    projectsList.appendChild(li);
  });
  addProjectAndTasksListeners();
};

export const deleteProject = (id) => {
  for (let i = 0; i < allData.length; i++) {
    if (id === allData[i].id) {
      allData.splice(i, 1);
    }
  }
};

export const displayCurrentProject = (i, id) => {
  const projectTitle = document.querySelector("#current-project p");
  const selector = `ul li#${id}`;
  const clickedLi = document.querySelector(selector);

  if (clickedLi !== null) {
    clickedLi.classList.add("clicked");
  }

  if (i === null) {
    projectTitle.textContent = "";
    projectTitle.id = "";
    return;
  } else {
    projectTitle.textContent = allData[i].title;
    projectTitle.id = id;
  }
};

const createID = (() => {
  let id = localStorage.getItem("id")
    ? parseInt(localStorage.getItem("id"), 10)
    : 2000;

  return {
    generate: function () {
      id++;
      localStorage.setItem("id", id);
      return id.toString();
    },
  };
})();

export const ID = createID;

class Project {
  constructor(name, id) {
    this.title = name;
    this.id = id;
    this.tasks = [];
  }
}

export const projectName = document.getElementById("project-title-user-input");
export const errProjectInput = document.getElementById("error-project-dialog");
let projectTitle = "";

export const addNewProject = () => {
  projectTitle = projectName.value;
  errProjectInput.textContent = "";

  if (
    projectTitle === "" ||
    projectTitle === null ||
    projectTitle.length <= 3
  ) {
    errProjectInput.textContent = "Insert a word longer than 3 letters";
    return false;
  } else {
    const newProject = new Project(
      projectTitleEvaluate(projectTitle),
      `id${ID.generate()}`
    );
    allData.push(newProject);

    renderProjects();
    return true;
  }
};
