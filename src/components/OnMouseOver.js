import React, { useState } from "react";
import { Menu } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";
import ColorPicker from "./ColorPicker";
import DropDown from "./DropDown";
const { TextArea } = Input;
const { SubMenu } = Menu;

function OnMouseOver({ pathsState, selectedItem }) {
  const bgColor = selectedItem ? selectedItem.hoverProps.hoverColor : "green";
  const [paths, setPaths] = pathsState;
  const handleOnMouseOverOptionsCheckedChange = (id, isChecked) => {
    // risk to direct change paths
    // so creating new variable changing in it and set it to paths
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      // getting current selected item
      if (frame.id === selectedItem.id) {
        // if checked item is color
        if (id === "color")
          // changing hover props
          frame.hoverProps = {
            ...frame.hoverProps,
            isColorEnable: isChecked,
            hoverColor: "rgba(0,255,0,0.4)",
          };
        if (id === "info")
          frame.hoverProps = { ...frame.hoverProps, isInfoEnable: isChecked };
      }
    });

    setPaths([...tempPaths]);
  };

  const handleOnMouseOverValuesChange = (id, value) => {
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "color")
          frame.hoverProps = { ...frame.hoverProps, hoverColor: value };
        if (id === "info")
          frame.hoverProps = { ...frame.hoverProps, hoverInfo: value };
      }
    });

    setPaths([...tempPaths]);
  };

  return (
    <>
      {selectedItem && (
        <DropDown title="On Mouse Over">
          <Menu theme="dark">
            <SubMenu
              popupOffset="20px"
              key="color"
              title={
                <Checkbox
                  style={{ color: "inherit" }}
                  checked={selectedItem.hoverProps.isColorEnable}
                  onChange={(e) =>
                    handleOnMouseOverOptionsCheckedChange(
                      "color",
                      e.target.checked
                    )
                  }
                >
                  Background Color
                </Checkbox>
              }
              style={{ width: "100%" }}
            >
              <ColorPicker
                bgColor={bgColor}
                handleOnMouseOverValuesChange={handleOnMouseOverValuesChange}
              />
            </SubMenu>
            <SubMenu
              popupOffset="10px"
              key="info"
              title={
                <Checkbox
                  checked={selectedItem.hoverProps.isInfoEnable}
                  style={{ color: "inherit" }}
                  onChange={(e) =>
                    handleOnMouseOverOptionsCheckedChange(
                      "info",
                      e.target.checked
                    )
                  }
                >
                  Show Information
                </Checkbox>
              }
              style={{ width: "100%", borderRadius: "20px" }}
            >
              <div
                style={{
                  backgroundColor: "black",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "10px",
                  color: "white",
                }}
              >
                <TextArea
                  placeholder="Enter Info For the Selected Path"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={selectedItem.hoverProps.hoverInfo}
                  onChange={(e) =>
                    handleOnMouseOverValuesChange("info", e.target.value)
                  }
                />
              </div>
            </SubMenu>
          </Menu>
        </DropDown>
      )}
    </>
  );
}

export default OnMouseOver;
