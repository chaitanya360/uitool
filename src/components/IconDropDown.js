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
  const [border, setBorder] = useState(`2px solid transparent`);
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
            backgroundColor: selected ? colors.primary : colors.secondary,
            cursor: "pointer",
            padding: "5px 10px",
            fontSize: "1.2rem",
            color: "white",
            width: "fit-content",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: border,
            borderRadius: "4px",
            transition: "background-color 0.2s linear",
          }}
          onMouseEnter={() => setBorder(`2px solid ${colors.secondary}`)}
          onMouseLeave={() => setBorder(`2px solid transparent`)}
          onClick={() =>
            selected ? setSelected(false) : onTitleClicked && onTitleClicked()
          }
        >
          {Icon}
        </div>
        <div
          style={{
            display: selected ? "block" : "none",
            transition: "opacity 0.2s linear",
            position: "absolute",
            top: listOffset,
          }}
          className="animate__animated animate__flipInX animate__delay-0s animate__faster"
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
