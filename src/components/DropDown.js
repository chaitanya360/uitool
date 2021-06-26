import React, { useState } from "react";
import "./components.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function DropDown({ children, title = "Drop Down List" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        display: "block",
        width: "97%",
        margin: "10px 4px 5px 1px",
        border: visible ? "1px solid rgba(255,255,255,0.3)" : "none",
      }}
    >
      <div
        style={{
          padding: "20px",
          fontSize: "16px",
          fontWeight: "lighter",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "#001529",
        }}
        onClick={() => setVisible((old) => !old)}
        className="dropdown_title"
      >
        <span>{title}</span>
        <span>
          {visible ? (
            <UpOutlined
              style={{ fontSize: "12px" }}
              className="animate__animated animate__fadeIn"
            />
          ) : (
            <DownOutlined
              style={{ fontSize: "12px" }}
              className="animate__animated animate__fadeIn"
            />
          )}
        </span>
      </div>
      <div
        style={{
          display: visible ? "block" : "none",
          height: visible ? "fit-content" : "0px",
          overflow: "hidden",
          maxHeight: "500px",
          overflowY: "scroll",
        }}
        id="dropdown"
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
