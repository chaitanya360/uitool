import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

function TypeSelector({ Frames, selectedType, setSelectedType }) {
  const handleMenuClick = (e) => {
    setSelectedType(e.key);
  };

  const getTypes = () => {
    let types = [];
    for (let i = 0; i < Frames.length; i++) {
      let currFrame = Frames[i];
      if (types.indexOf(currFrame.type) === -1) types.push(currFrame.type);
    }
    return types;
  };

  const DropDownOptions = (
    <Menu onClick={handleMenuClick} theme="dark">
      {getTypes().map((type) => (
        <Menu.Item key={type}> {type}</Menu.Item>
      ))}
    </Menu>
  );

  getTypes();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px 0px",
      }}
    >
      <div style={{ marginRight: "20px" }}>Select Type</div>
      <Dropdown overlay={DropDownOptions}>
        <Button
          style={{
            color: "black",
            minWidth: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selectedType}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default TypeSelector;
