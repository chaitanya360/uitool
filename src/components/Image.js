import React from "react";

function Image(props) {
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
        src={`${process.env.PUBLIC_URL}/statics/images/bg.jpg`}
        alt="flat plan"
      />
    </div>
  );
}

export default Image;
