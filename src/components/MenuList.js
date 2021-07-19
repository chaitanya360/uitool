import React, { useState } from "react";
import { Menu } from "antd";

import { SettingOutlined, FileImageOutlined } from "@ant-design/icons";
import { EyeIcon, PenIcon } from "../components/Icon";

import SelectedPathId from "./SelectedPathId";
import { colors } from "../utility";

function MenuList({
  isSliderCollapsed,
  selectedItemState,
  projectName,
  Frames,
  currentFrameId,
}) {
  const selectedItem = selectedItemState[0];
  return (
    <>
      <Menu.ItemGroup title={projectName}>
        {Frames.map((frame) => (
          <Menu.Item
            key={frame.id}
            style={{
              padding: "5px 20px",
              width: "100%",
              fontWeight: "600",
              color: frame.id === currentFrameId ? "white" : "unset",

              backgroundColor:
                frame.id === currentFrameId ? colors.light_blue : colors.blue,
            }}
          >
            <div className="menu_item_text_hover">{frame.frameName}</div>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>

      {selectedItem !== false && (
        <>
          <SelectedPathId
            isSliderCollapsed={isSliderCollapsed}
            selectedItem={selectedItem}
          />
        </>
      )}
    </>
  );
}

export default MenuList;
