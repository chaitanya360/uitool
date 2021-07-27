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
        <div
          style={{
            backgroundColor: colors.primary,
            padding: "10px 10px",
            color: "white",
            fontSize: "larger",
            borderRadius: "3px",
            maxWidth: "400px",
          }}
        >
          {info}
        </div>
      </div>
    )
  );
}

export default Info;
