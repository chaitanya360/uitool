import React from "react";

function Image({ src }) {
  return (
    <div
      style={{
        objectFit: "contain",
        height: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ height: "100%", width: "auto" }}
        src={src}
        alt="flat plan"
      />
    </div>
  );
}

export default Image;
