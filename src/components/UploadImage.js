import React, { useState } from "react";
import ImageUploader from "react-images-upload";

function UploadImage(props) {
  const [src, setSrc] = useState(false);
  console.log(src);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      console.log(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple="false"
      />
      <div
        style={{
          height: "60px",
          width: "60px",
          border: "1px dashed black",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
}

export default UploadImage;
