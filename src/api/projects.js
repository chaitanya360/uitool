import apiClient from "./client";
import {
  addProjectEndpoint,
  allProjectsEndpoint,
  getProjectEndpoint,
  setProjectEndpoint,
} from "./config";

const addProject = (name, frames, token) =>
  apiClient.post(
    addProjectEndpoint,
    { project_name: name, frames },
    { headers: { Authorization: token } }
  );

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

export { addProject, setProject, getProject, getAllProjects };
