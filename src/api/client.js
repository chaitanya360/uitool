import { create } from "apisauce";
import { baseURL } from "./config";

const apiClient = create({
  baseURL: baseURL,
});

export default apiClient;
