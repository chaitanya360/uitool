import { initialFrameValues } from "../utility/data";
console.log("reinitialising");
let users = [
  {
    email: "f@gmail.com",
    projects: [
      { id: 1, name: "Project IGI" },
      { id: 2, name: "Project War" },
      { id: 3, name: "Project Collide" },
      { id: 4, name: "Project Gothics" },
    ],
  },
];

let projects = [
  { id: 1, name: "Project IGI", frames: initialFrameValues },
  { id: 2, name: "Project War", frames: initialFrameValues },
  { id: 3, name: "Project Collide", frames: initialFrameValues },
  { id: 4, name: "Project Gothics", frames: initialFrameValues },
];

const getProjects = (email) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) return users[i].projects;
  }
};

const getProject = (id) => {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) return projects[i];
  }
};

const setNewProject = (id, name, email) => {
  projects.push({ id: id, name: name, frames: [] });
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      users[i].projects.push({ id: id, name: name });
      return "ok";
    }
  }
};

export { getProjects, setNewProject, getProject };
