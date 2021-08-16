import React from "react";
import "./components.css";
import { UpOutlined } from "@ant-design/icons";
import { colors } from "../utility";

function DropDownGroupItem({
  titleBgChangeOnSelect = false,
  children,
  title = "Drop Down List",
  visible,
  onDropDownArrowClick,
}) {
  return (
    <div
      style={{
        fontWeight: "bold",
        display: "block",
        minWidth: "100%",
        padding: "0px",
        border: visible ? "1px solid rgba(255, 71, 105, 0.3)" : "none",
      }}
    >
      <div
        style={{
          padding: "10px 10px",
          fontSize: "16px",
          fontWeight: "lighter",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          color: "white",
          backgroundColor:
            visible && titleBgChangeOnSelect ? colors.secondary : "transparent",
        }}
        onClick={onDropDownArrowClick}
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
          overflow: "auto",
          maxHeight: "500px",
          marginLeft: "0.5px",
          borderTop: "none",
          maxHeight: "220px",
        }}
        id="dropdown"
      >
        {children}
      </div>
    </div>
  );
}

export default DropDownGroupItem;
