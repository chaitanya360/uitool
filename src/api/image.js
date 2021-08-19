import apiClient from "./client";
import { saveImageEndpoint } from "./config";
import axios from "axios";

const saveImage = (img, token) => {
  const formData = new FormData();

  if (img) {
    formData.append("project_image", img);

    return apiClient.post(saveImageEndpoint, formData, {
      headers: { Authorization: token },
    });
  }
};

const deleteImage = (imgId, token) => {
  var data = JSON.stringify({ image_id: imgId });

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
