import React, { useState } from "react";
import { Checkbox } from "antd";
import { ConsoleSqlOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { colors } from "../utility";
import DropDown from "./DropDown";
import DropDownGroupItem from "./DropDownGroupItem";
import PageSelector from "./PageSelector";
import { Menu, Button } from "antd";
const { SubMenu } = Menu;

function OnMouseClick({
  setCurrentTool,
  selectedItemState,
  pathsState,
  setDisplayNewFramePopup,
  Frames,
  currentFrameId,
  setNewPageFormDetails,
  setContextMenuPosition,
}) {
  const [selectedItem, setSelectedItem] = selectedItemState;
  const [titleColor, setTitleColor] = useState("black");

  const [paths, setPaths] = pathsState;

  const handleOnMouseClickOptionsCheckedChange = (id, isChecked) => {
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "change_page") frame.isClickEnable = isChecked;
      }
    });

    setPaths([...tempPaths]);
  };

  return (
    <>
      <Menu
        theme="light"
        onMouseEnter={() => setTitleColor(colors.secondary)}
        onMouseLeave={() => setTitleColor("black")}
        triggerSubMenuAction="hover"
      >
        {selectedItem && (
          <SubMenu
            key="change_page"
            title={
              <Checkbox
                checked={selectedItem.isClickEnable}
                style={{ color: titleColor }}
                onChange={(e) => {
                  e.stopPropagation();
                  handleOnMouseClickOptionsCheckedChange(
                    "change_page",
                    e.target.checked
                  );
                }}
              >
                Link TO
              </Checkbox>
            }
            style={{ width: "100%" }}
          >
            <PageSelector
              Frames={Frames}
              currentFrameId={currentFrameId}
              paths={paths}
              selectedItem={selectedItem}
              setContextMenuPosition={setContextMenuPosition}
              setCurrentTool={setCurrentTool}
              setDisplayNewFramePopup={setDisplayNewFramePopup}
              setPaths={setPaths}
              setNewPageFormDetails={setNewPageFormDetails}
            />
          </SubMenu>
        )}
      </Menu>
    </>
  );
}

export default OnMouseClick;
