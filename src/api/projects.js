import apiClient from "./client";
import axios from "axios";
import {
  addProjectEndpoint,
  allProjectsEndpoint,
  deleteProjectEndpoint,
  getProjectEndpoint,
  setProjectEndpoint,
} from "./config";

// adding new project
const addProject = (name, frames, token) =>
  apiClient.post(
    addProjectEndpoint,
    { project_name: name, frames },
    { headers: { Authorization: token } }
  );

// saving existing project
const setProject = (id, name, frames, token, frames_obj) =>
  apiClient.post(
    setProjectEndpoint,
    { project_id: id, project_name: name, frames, frames_obj },
    { headers: { Authorization: token } }
  );

const getProject = (id) =>
  apiClient.post(getProjectEndpoint, { project_id: id });

const getAllProjects = (token) =>
  apiClient.get(allProjectsEndpoint, {}, { headers: { Authorization: token } });

const deleteProject = (token, project_id, images_list = []) => {
  var data = JSON.stringify({
    project_id: project_id,
    images_url: images_list,
  });

  var config = {
    method: "delete",
    url: "https://estatetool.herokuapp.com/project/userproject",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };
  return axios(config);
};

export { addProject, setProject, getProject, getAllProjects, deleteProject };
