import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import { CloseCircleOutlined } from "@ant-design/icons";
import imgClient from "../api/imgClient";
import Loading from "./Loading";
import ErrorContext from "../context/ErrorContext";
import { deleteImage, saveImage } from "../api/image";
import storage from "../api/storage";
import { baseURL } from "../api/config";
import { _deleteImage } from "../utility/functions";
function UploadImage({ setImg, onImageChanged, setShouldDisplay, project_id }) {
  const [loading, setLoading] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);
  const onImageChange = (event) => {
    const formData = new FormData();

    if (event.length > 0) {
      const file = event[0];

      if (file) {
        setLoading(true);
        // formData.append("file", file);
        // formData.append("upload_preset", "hn6xkfkd");

        // imgClient.post("", formData).then((response) => {
        //   setLoading(false);
        //   if (response.ok) {
        //     setImg(response.data.url);
        //     onImageChanged();
        //   } else {
        //     setErrorMsg(response.problem);
        //   }
        // });

        saveImage(file, storage.getToken(), project_id).then((response) => {
          setLoading(false);
          if (response.data && response.data.status) {
            console.log("image upload success");
            setImg((old_img) => {
              if (old_img) _deleteImage(storage.getToken(), old_img);
              return response.data.data.image_url;
              return baseURL + response.data.data.image_url;
            });
            // this parameter is only used in profile panel
            onImageChanged(baseURL + response.data.data.image_url);
            console.log(baseURL + response.data.data.image_url);
          } else {
            setErrorMsg(response.problem);
          }
        });
      }
    }
  };

  return (
    <div className="black_bg_wrapper" style={{ zIndex: "4" }}>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="animate__animated animate__bounceInDown animate__delay-0s animate__faster"
          style={{
            position: "absolute",
            top: "20px",
            width: "600px",
            height: "fit-content",
            zIndex: 5,
          }}
        >
          {!loading && (
            <span
              style={{
                position: "absolute",
                margin: "20px",
                right: 0,
                zIndex: "999",
              }}
            >
              <CloseCircleOutlined
                style={{ fontSize: "25px", color: "rgba(255,255,255,0.9)" }}
                onClick={() => setShouldDisplay(false)}
              />
            </span>
          )}
          {!loading && (
            <ImageUploader
              withIcon={true}
              buttonText="Choose image"
              onChange={onImageChange}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage
            />
          )}
        </div>
      </div>
      <div style={{ marginLeft: "50px" }}>{loading && <Loading />}</div>
    </div>
  );
}

export default UploadImage;
