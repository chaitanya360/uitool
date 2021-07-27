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
  selectedItem,
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
      <Menu.Item
        key="edit"
        style={{
          color: "rgba(0,0,0,0.8)",
          fontWeight: 500,
          backgroundColor: colors.menu_bg,
          padding: "0px 35px",
          margin: "0px",
          borderRadius: "3px 3px 0px 0px",
          borderBottom: `1px solid ${colors.primary}`,
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        id="delete_option"
        key="delete"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: "transparent",
          padding: "0px 35px",
        }}
      >
        Delete
      </Menu.Item>

      <StatusSelector pathsState={pathsState} selectedItem={selectedItem} />
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
      <OnMouseOver pathsState={pathsState} selectedItem={selectedItem} />
    </Menu>
  );
}

export default ContextMenu;
