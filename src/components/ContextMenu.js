import { Menu } from "antd";
import React from "react";

import OnMouseOver from "./OnMouseOver";
import OnMouseClick from "./OnMouseClick";
import { colors } from "../utility";

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
}) {
  return (
    <Menu
      style={{
        width: "fit-content",
        fontSize: "16px",
        position: "fixed",
        top: ContextMenuPosition.y,
        left: ContextMenuPosition.x,
        zIndex: "2",
        borderRadius: "4px",
        padding: "0",
      }}
      onClick={handleContextMenuSelect}
    >
      <Menu.Item
        key="edit"
        style={{
          color: "white",
          backgroundColor: colors.light_blue,
          padding: "0px 20px",
          margin: "0px",
          borderRadius: "3px 3px 0px 0px",
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        style={{
          fontSize: "16px",
          color: "tomato",
          fontWeight: "600",
          backgroundColor: "white",
          padding: "0px 30px",
        }}
      >
        Delete
      </Menu.Item>

      {selectedItem && (
        <>
          <OnMouseOver pathsState={pathsState} selectedItem={selectedItem} />
          <OnMouseClick
            pathsState={pathsState}
            selectedItemState={selectedItemState}
            setCurrentTool={setCurrentTool}
            setDisplayNewFramePopup={setDisplayNewFramePopup}
            Frames={Frames}
            currentFrameId={currentFrameId}
          />
        </>
      )}
    </Menu>
  );
}

export default ContextMenu;
