import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { CloseCircleOutlined } from "@ant-design/icons";

function UploadImage({
  setImg,
  onImageChanged,
  shouldDisplay,
  setShouldDisplay,
}) {
  const onImageChange = (event) => {
    const file = event[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    onImageChanged();
  };

  return (
    <div
      className="black_bg_wrapper"
      style={{ display: shouldDisplay ? "block" : "none" }}
    >
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <div
          className="animate__animated animate__bounceInDown animate__delay-0s animate__faster"
          style={{
            position: "absolute",
            top: "20px",
            width: "600px",
          }}
        >
          <span
            style={{
              position: "absolute",
              zIndex: 3,
              margin: "20px",
              right: 0,
            }}
          >
            <CloseCircleOutlined
              style={{ fontSize: "25px" }}
              onClick={() => setShouldDisplay(false)}
            />
          </span>
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onImageChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            singleImage
          />
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
