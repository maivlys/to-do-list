import { allData } from "./dataList.js";
import { appController } from "./appController.js";

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
  appController();
};

export const deleteProject = (id) => {
  for (let i = 0; i < allData.length; i++) {
    if (id === allData[i].id) {
      allData.splice(i, 1);
      console.log(allData);
    }
  }
};

export const displayCurrentProject = (i) => {
  const projectTitle = document.querySelector("#current-project p");
  // console.log(i);

  if (i === null) {
    projectTitle.textContent = "";
    return;
  } else {
    projectTitle.textContent = allData[i].title;
  }
};

const createID = () => {
  let id = 2000;

  return {
    generate: function () {
      id++;
    },
  };
};

export const ID = createID();
