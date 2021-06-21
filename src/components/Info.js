import React from "react";

function Info({ show, info = "this is some information" }) {
  return (
    show && (
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translate(-50%, 0px)",
        }}
      >
        <div
          style={{
            backgroundColor: "dodgerblue",
            padding: "10px 10px",
            color: "white",
            fontSize: "larger",
            borderRadius: "5px",
            boxShadow: "2px 2px 2px grey",
          }}
        >
          {info}
        </div>
      </div>
    )
  );
}

export default Info;
