import { allData } from "./dataList.js";

// displayProject
const controlIcons = [
  {
    icon: "edit",
    class: "edit-btn",
    html: `<svg
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
  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

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
    });
    tasksList.appendChild(li);
  });
};
