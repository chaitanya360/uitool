import { Menu } from "antd";
import React from "react";

import OnMouseOver from "./OnMouseOver";
import OnMouseClick from "./OnMouseClick";
import { colors } from "../utility";
import StatusSelector from "./StatusSelector";

function ContextMenu({
  pathsState,
  setCurrentTool,
  setDisplayNewFramePopup,
  Frames,
  currentFrameId,
  selectedItemState,
  handleContextMenuSelect,
  ContextMenuPosition = { x: 0, y: 0 },
  setNewPageFormDetails,
  setContextMenuPosition,
}) {
  return (
    <Menu
      theme="light"
      style={{
        width: "fit-content",
        fontSize: "16px",
        position: "fixed",
        top: ContextMenuPosition.y,
        left: ContextMenuPosition.x,
        zIndex: "2",
        borderRadius: "4px",
        padding: "0",
        backgroundColor: colors.menu_bg,
        boxShadow: "1px 1px 3px grey",
      }}
      onClick={handleContextMenuSelect}
    >
      {/* <Menu.Item
        id="adust_option"
        key="adjust"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          padding: "0px 35px",
          height: "25px",
          lineHeight: "25px",
        }}
      >
        Adjust
      </Menu.Item> */}
      <Menu.Item
        id="delete_option"
        key="delete"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "30px",
          paddingLeft: "1rem",
        }}
      >
        Delete
      </Menu.Item>

      {/* <StatusSelector pathsState={pathsState} selectedItem={selectedItem} /> */}
      <OnMouseClick
        pathsState={pathsState}
        selectedItemState={selectedItemState}
        setCurrentTool={setCurrentTool}
        setDisplayNewFramePopup={setDisplayNewFramePopup}
        Frames={Frames}
        currentFrameId={currentFrameId}
        setNewPageFormDetails={setNewPageFormDetails}
        setContextMenuPosition={setContextMenuPosition}
      />
      {/* <OnMouseOver pathsState={pathsState} selectedItem={selectedItem} /> */}
    </Menu>
  );
}

export default ContextMenu;
