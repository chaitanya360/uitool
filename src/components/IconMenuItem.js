import React, { useState } from "react";
import { colors } from "../utility";
import { PenIcon } from "./Icon";
import { Tooltip } from "antd";

function IconMenuItem({
  Icon = <PenIcon />,
  onClick,
  selected,
  tooltip = "This is tool",
  className = "",
}) {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <div
        style={{
          backgroundColor: selected ? colors.primary : colors.secondary,
          display: "flex",
          height: "100%",
          padding: "0px 15px",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
          cursor: "pointer",
          zIndex: "3",
          paddingBottom: "0px",
          borderRadius: "8px",
        }}
        onClick={onClick}
        className={className}
      >
        {Icon}
      </div>
    </Tooltip>
  );
}

export default IconMenuItem;
