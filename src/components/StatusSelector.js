import React, { useState } from "react";
import { Menu } from "antd";
import { Checkbox } from "antd";
import { Radio, Space } from "antd";
import { colors } from "../utility";

const { SubMenu } = Menu;

function StatusSelector({ pathsState, selectedItem }) {
  const [paths, setPaths] = pathsState;
  const [statusValue, setStatusValue] = useState(selectedItem.bookingStatus);

  const handleStatusValueChange = (e) => {
    const value = e.target.value;
    let color;
    setStatusValue(value);

    switch (value) {
      case "available":
        color = colors.available;
        break;
      case "booked":
        color = colors.booked;
        break;
      case "not_opened":
        color = colors.not_open;
        break;
      default:
        break;
    }

    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        frame.hoverProps = { ...frame.hoverProps, hoverColor: color };
        frame.bookingStatus = value;
      }
    });

    setPaths([...tempPaths]);
  };

  const StatusTitle = () => (
    <div
      style={{
        width: "100%",
        color: "inherit",
        paddingLeft: "20px",
        fontWeight: 500,
        fontSize: "1rem",
      }}
    >
      Status
    </div>
  );

  return (
    <Menu theme="light" id="status_selector">
      <SubMenu key="color" popupOffset={-5} title={<StatusTitle />}>
        <Radio.Group
          onChange={handleStatusValueChange}
          value={statusValue}
          style={{
            margin: "2px",
            padding: "6px",
            borderRadius: "3px",
            border: "1px solid white",
            display: "flex",
            flexDirection: "column",
            borderColor: "rgba(255, 71, 105,0.6)",
            backgroundColor: colors.menu_bg,
          }}
        >
          <Radio className="radio_element" value={"available"}>
            Available
          </Radio>
          <Radio className="radio_element" value={"booked"}>
            Booked
          </Radio>
          <Radio className="radio_element" value={"not_opened"}>
            Not Opened
          </Radio>
        </Radio.Group>
      </SubMenu>
    </Menu>
  );
}

export default StatusSelector;
