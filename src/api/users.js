import apiClient from "./client";
import { loginEndpoint, registerEndpoint, viewUserEndpoint } from "./config";
import storage from "./storage";

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

const getNewToken = async () => {
  // check for local storage user
  let user = storage.getUser();
  if (user) {
    const email = user.email;
    const pass = user.password;
    let token = false;
    await login(email, pass).then((response) => {
      if (response.ok) {
        if (response.data.status) token = response.data.data.token;
      }
    });
    return token;
  } else return false;
};

export { viewUsers, login, register, getNewToken };
