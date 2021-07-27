import React, { useState } from "react";
import { colors } from "../utility";
import { PenIcon } from "./Icon";
import { Tooltip } from "antd";

function IconMenuItem({
  Icon = <PenIcon />,
  onClick,
  selected,
  tooltip = "This is tool",
}) {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <div
        style={{
          backgroundColor: selected ? colors.secondary : colors.primary,
          display: "flex",
          height: "100%",
          padding: "3px 15px",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px 5px",
          cursor: "pointer",
          zIndex: "3",
          paddingBottom: "0px",
        }}
        onClick={onClick}
      >
        {Icon}
      </div>
    </Tooltip>
  );
}

export default IconMenuItem;
