import React, { useState } from "react";
import { Menu, Button } from "antd";
import { Checkbox } from "antd";
import DropDown from "./DropDown";
import { PlusCircleOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

function OnMouseClick({
  setCurrentTool,
  selectedItemState,
  pathsState,
  setDisplayNewFramePopup,
  Frames,
  currentFrameId,
}) {
  const [selectedItem, setSelectedItem] = selectedItemState;
  const [paths, setPaths] = pathsState;

  const handleOnMouseClickOptionsCheckedChange = (id, isChecked) => {
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "change_page")
          frame.clickProps = {
            ...frame.clickProps,
            isClickEnable: isChecked,
          };
      }
    });

    setPaths([...tempPaths]);
  };

  const handleOnMouseClickValuesChange = (id, value) => {
    if (value === "new") setDisplayNewFramePopup(true);
    else {
      let tempPaths = paths;

      tempPaths.forEach((frame) => {
        if (frame.id === selectedItem.id) {
          if (id === "change_page") {
            // setting target frame id
            frame.clickProps = { ...frame.clickProps, targetFrameId: value };
            setSelectedItem(false);
            setCurrentTool(false);
          }
        }
      });
    }
  };

  const handleMenuItemSelect = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "new":
        handleOnMouseClickValuesChange("change_page", "new");
        break;
      default:
        handleOnMouseClickValuesChange("change_page", e.key);
    }
  };

  return (
    <>
      <DropDown title="On Mouse Click">
        <Menu theme="dark">
          <SubMenu
            key="change_page"
            title={
              <Checkbox
                checked={selectedItem.clickProps.isClickEnable}
                style={{ color: "inherit" }}
                onChange={(e) =>
                  handleOnMouseClickOptionsCheckedChange(
                    "change_page",
                    e.target.checked
                  )
                }
              >
                Go To Page
              </Checkbox>
            }
            style={{ width: "100%" }}
          >
            <div style={{ height: "fit-content" }}>
              <DropDown title="Select Page" inverted>
                <Menu theme="dark" onSelect={handleMenuItemSelect}>
                  <Menu.Item key="new" style={{ width: "100%" }}>
                    <div>
                      <Button
                        type="link"
                        icon={<PlusCircleOutlined />}
                        key="new"
                        style={{ width: "100%", height: "100%" }}
                      >
                        Create New Page
                      </Button>
                    </div>
                  </Menu.Item>
                  {Frames.filter((frame) => frame.id !== currentFrameId).map(
                    (frame) => (
                      <Menu.Item key={frame.id}>{frame.frameName}</Menu.Item>
                    )
                  )}
                </Menu>
              </DropDown>
            </div>
          </SubMenu>
        </Menu>
      </DropDown>
    </>
  );
}

export default OnMouseClick;
