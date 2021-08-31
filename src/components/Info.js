import React from "react";
import { colors } from "../utility";

function Info({ show, info = "this is some information", pos: { x, y } }) {
  return (
    show && (
      <div
        style={{
          position: "absolute",
          top: y,
          left: x,
          zIndex: "999",
        }}
        className="animate__animated animate__fadeIn animate__delay-0s animate__faster"
      >
        {info}
      </div>
    )
  );
}

export default Info;
