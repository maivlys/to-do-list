import { allData } from "./dataList.js";

export const renderProjects = () => {
  const projectsList = document.getElementById("projects-list");
  allData.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.title;
    projectsList.appendChild(li);
  });
};
