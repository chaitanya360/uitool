import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { colors } from "../utility";
import { Tooltip } from "antd";

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
            setCurrentTool && setCurrentTool(false);
          }}
          style={{
            position: "absolute",
            top: "0px",
            zIndex: "2",
            left: "0px",
            height: "100vh",
            width: "100%",
            backgroundColor: "rbga(0,0,0,0.2)",
            overflow: "hidden",
          }}
        />
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
            backgroundColor: selected ? colors.secondary : colors.primary,
            cursor: "pointer",
            padding: "5px 10px",
            fontSize: "1.2rem",
            color: "white",
            width: "fit-content",
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
            style={{
              width: listWidth,
              padding: "0px",
              backgroundColor: "white",
              boxShadow: "1px 1px 4px grey",
            }}
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
