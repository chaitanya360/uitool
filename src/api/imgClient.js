import { create } from "apisauce";

const imgBaseURL = "https://api.cloudinary.com/v1_1/dvdqqphnv/upload";

const imgClient = create({
  baseURL: imgBaseURL,
});

export default imgClient;
