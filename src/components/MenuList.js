import React, { useState } from "react";
import { Menu } from "antd";

import { SettingOutlined } from "@ant-design/icons";
import { EyeIcon, PenIcon, SelectIcon } from "../components/Icon";
import OnMouseOver from "./OnMouseOver";
const { SubMenu } = Menu;
function MenuList({
  selectedItem,
  isSliderCollapsed,
  handleOnMouseOverOptions,
  handleOnMouseOverValuesChange,
}) {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <>
      <Menu.ItemGroup key="options">
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
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.8)",
              padding: "0px 10px",
              margin: "20px 0px",
            }}
          >
            {!isSliderCollapsed && (
              <>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Selected Path Id
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  {selectedItem.id}
                </div>
              </>
            )}
          </div>
          <SubMenu
            key="actions"
            icon={<SettingOutlined />}
            title="Actions"
            style={{ width: "100%" }}
          >
            <Menu.Item key="delete">Delete</Menu.Item>
            <OnMouseOver
              handleOnMouseOverOptions={handleOnMouseOverOptions}
              handleOnMouseOverValuesChange={handleOnMouseOverValuesChange}
              selectedItem={selectedItem}
            />
          </SubMenu>
        </>
      )}
    </>
  );
}

export default MenuList;
