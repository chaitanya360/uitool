import React, { useEffect, useState } from "react";
import "./components.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { colors } from "../utility";

function DropDown({
  titleBgChangeOnSelect = false,
  children,
  title = "Drop Down List",
  open = true,
  containerStyle = {
    margin: "5px 4px",
    padding: "0px 10px",
    minWidth: "230px",
  },
  titleStyle = { padding: "10px 20px" },
  listContainerStyle,
}) {
  const [visible, setVisible] = useState(open);

  return (
    <div
      style={{
        fontWeight: "bold",
        display: "block",
        border: visible
          ? `1px solid rgba(255, 71, 105,0.3)`
          : "1px solid transparent",
        ...containerStyle,
      }}
    >
      <div
        style={{
          ...titleStyle,
          fontSize: "16px",
          fontWeight: "lighter",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor:
            visible && titleBgChangeOnSelect ? colors.secondary : "transparent",
        }}
        onClick={() => setVisible((old) => !old)}
        className="dropdown_title"
      >
        <span>{title}</span>
        <span>
          <UpOutlined
            style={{
              fontSize: "12px",
              transform: visible ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s linear",
            }}
          />
        </span>
      </div>
      <div
        style={{
          boxSizing: "revert",
          display: visible ? "block" : "none",
          height: visible ? "fit-content" : "0px",
          maxHeight: "500px",
          overflowY: "auto",
          marginLeft: "0.5px",
          ...listContainerStyle,
        }}
        id="dropdown"
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
