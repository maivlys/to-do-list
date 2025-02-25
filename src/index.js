import "./style.css";
import { allData } from "./dataList.js";

import { renderProjects } from "./projectsHandler.js";
import { addFormListeners } from "./appController.js";

addFormListeners();

Object.assign(allData, JSON.parse(localStorage.getItem("data")) || []);

renderProjects();
