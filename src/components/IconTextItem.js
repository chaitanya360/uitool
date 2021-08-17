import React from "react";
import { Menu } from "antd";
import { EyeIcon } from "./Icon";

function IconTextItem({
  Icon = { EyeIcon },
  text = "Icon",
  id,
  onClick = () => console.log("clicked"),
}) {
  return (
    <Menu.Item
      key={id}
      id={id}
      style={{
        padding: "0px",
        margin: "0px",
        textAlign: "center",
        width: "100%",
        fontSize: "1rem",
      }}
      onClick={onClick}
      className="icon-dropdown-item"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "0px 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Icon}
        </div>
        <span style={{ flex: "1", textAlign: "left", margin: "0px 10px" }}>
          {text}
        </span>
      </div>
    </Menu.Item>
  );
}

export default IconTextItem;
