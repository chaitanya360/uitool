import React, { useState } from "react";
import { Menu } from "antd";

import { SettingOutlined, FileImageOutlined } from "@ant-design/icons";
import { EyeIcon, PenIcon, SelectIcon } from "../components/Icon";
import OnMouseOver from "./OnMouseOver";
import OnMouseClick from "./OnMouseClick";
import SelectedPathId from "./SelectedPathId";

const { SubMenu } = Menu;
function MenuList({
  isSliderCollapsed,
  selectedItemState,
  pathsState,
  setCurrentTool,
  setDisplayNewFramePopup,
  Frames,
  currentFrameId,
}) {
  const selectedItem = selectedItemState[0];

  return (
    <>
      <Menu.ItemGroup key="options">
        <Menu.Item key="change_image" icon={<FileImageOutlined />}>
          Change Image
        </Menu.Item>
        <Menu.Item key="draw" icon={<PenIcon />}>
          Draw
        </Menu.Item>
        <Menu.Item key="select" icon={<SelectIcon />}>
          Select
        </Menu.Item>
        <Menu.Item key="free" icon={<EyeIcon />}>
          Free
        </Menu.Item>
      </Menu.ItemGroup>

      {selectedItem !== false && (
        <>
          <SelectedPathId
            isSliderCollapsed={isSliderCollapsed}
            selectedItem={selectedItem}
          />

          <SubMenu
            key="actions"
            icon={<SettingOutlined />}
            title="Actions"
            style={{ width: "100%" }}
          >
            <Menu.Item key="delete" danger>
              Delete
            </Menu.Item>
            <OnMouseOver pathsState={pathsState} selectedItem={selectedItem} />

            <OnMouseClick
              pathsState={pathsState}
              selectedItemState={selectedItemState}
              setCurrentTool={setCurrentTool}
              setDisplayNewFramePopup={setDisplayNewFramePopup}
              Frames={Frames}
              currentFrameId={currentFrameId}
            />
          </SubMenu>
        </>
      )}
    </>
  );
}

export default MenuList;
