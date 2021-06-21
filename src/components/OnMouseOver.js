import React, { useState } from "react";
import { Menu } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";
import ColorPicker from "./ColorPicker";
const { TextArea } = Input;
const { SubMenu } = Menu;

function OnMouseOver({
  handleOnMouseOverOptions,
  handleOnMouseOverValuesChange,
  selectedItem,
}) {
  const bgColor = selectedItem.hoverProps.hoverColor;

  return (
    <>
      <Menu theme="dark">
        <Menu.Item
          key="hover"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          On Mouse Over
        </Menu.Item>
        <SubMenu
          key="color"
          title={
            <Checkbox
              style={{ color: "white" }}
              checked={selectedItem.hoverProps.isColorEnable}
              onChange={(e) =>
                handleOnMouseOverOptions("color", e.target.checked)
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
          key="info"
          title={
            <Checkbox
              checked={selectedItem.hoverProps.isInfoEnable}
              style={{ color: "white" }}
              onChange={(e) =>
                handleOnMouseOverOptions("info", e.target.checked)
              }
            >
              Show Information
            </Checkbox>
          }
          style={{ width: "100%" }}
        >
          <div
            style={{
              backgroundColor: "black",
              display: "flex",
              // height: "200px",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
              color: "black",
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
    </>
  );
}

export default OnMouseOver;
