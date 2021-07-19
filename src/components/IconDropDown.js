import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { colors } from "../utility";

function IconDropDown({
  children,
  Icon = <UserOutlined />,
  listOffset = "40px",
  listWidth = "60px",
  handleMenuItemSelect,
  selected,
  onTitleClicked,
  setSelected,
  setCurrentTool,
}) {
  return (
    <>
      {selected && (
        <div
          onClick={() => {
            setSelected(false);
            setCurrentTool(false);
          }}
          style={{
            position: "absolute",
            top: "0px",
            zIndex: "2",
            left: "0px",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rbga(0,0,0,0.2)",
          }}
        ></div>
      )}
      <div
        style={{
          width: "50px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "3",
        }}
      >
        <div
          style={{
            backgroundColor: selected ? colors.light_blue : colors.blue,
            cursor: "pointer",
            padding: "5px 10px",
            fontSize: "1.2rem",
            color: "white",
            width: "50px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.2s linear",
          }}
          onClick={onTitleClicked}
        >
          {Icon}
        </div>
        <div
          style={{
            opacity: selected ? "1" : "0",
            transition: "opacity 0.2s linear",
            position: "absolute",
            top: listOffset,
          }}
        >
          <Menu
            style={{ width: listWidth, padding: "0px" }}
            selectable={false}
            onClick={handleMenuItemSelect}
          >
            {children}
          </Menu>
        </div>
      </div>
    </>
  );
}

export default IconDropDown;
