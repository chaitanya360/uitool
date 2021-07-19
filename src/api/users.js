import apiClient from "./client";
import { loginEndpoint, registerEndpoint, viewUserEndpoint } from "./config";

const viewUsers = () => apiClient.get(viewUserEndpoint);

const login = (email, password) =>
  apiClient.post(loginEndpoint, { email, password });

const register = (first_name, last_name, email, password, mobile_number) =>
  apiClient.post(registerEndpoint, {
    first_name,
    last_name,
    email,
    password,
    mobile_number,
  });

export { viewUsers, login, register };
