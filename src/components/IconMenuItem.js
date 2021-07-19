import React, { useState } from "react";
import { colors } from "../utility";
import { PenIcon } from "./Icon";

function IconMenuItem({ Icon = <PenIcon />, onClick, selected }) {
  return (
    <div
      style={{
        backgroundColor: selected ? colors.light_blue : colors.blue,
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
  );
}

export default IconMenuItem;
