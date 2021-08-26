import apiClient from "./client";
import { saveImageEndpoint } from "./config";
import axios from "axios";

const saveImage = (img, token, project_id) => {
  const formData = new FormData();

  if (img) {
    formData.append("project_image", img);

    // if project id is not present
    // saving images which is not related to project
    // 1. profile pix
    // 2. new project thubmnail image
    if (project_id) formData.append("project", project_id);

    return apiClient.post(saveImageEndpoint, formData, {
      headers: { Authorization: token },
    });
  }
};

const deleteImage = (imgPath, token) => {
  var data = JSON.stringify({ image_url: imgPath });

  var config = {
    method: "delete",
    url: "https://estatetool.herokuapp.com/project/image",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export { saveImage, deleteImage };
