import React from "react";
import { Menu } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";
import DropDown from "./DropDown";
import { colors } from "../utility";
const { TextArea } = Input;
const { SubMenu } = Menu;

const styles = {
  textBox: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: "3px",
    color: "black",
    border: "none !important",
  },
};

function OnMouseOver({ pathsState, selectedItem }) {
  const [paths, setPaths] = pathsState;
  const handleInfoCheckChange = (e) => {
    // risk to direct change paths
    // so creating new variable changing in it and set it to paths
    let tempPaths = paths;
    let isCheckcked = e.target.checked;
    tempPaths.forEach((frame) => {
      // getting current selected item
      if (frame.id === selectedItem.id) {
        // if checked item is color

        frame.hoverProps = {
          ...frame.hoverProps,
          isInfoEnable: isCheckcked,
        };
      }
    });

    setPaths([...tempPaths]);
  };

  const handleTextChange = (value) => {
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id)
        frame.hoverProps = { ...frame.hoverProps, hoverInfo: value };
    });

    setPaths([...tempPaths]);
  };

  return (
    <>
      <DropDown
        title="On Mouse Over"
        titleStyle={{ color: "black", padding: "10px 20px" }}
        open={false}
      >
        <Menu theme="light">
          {selectedItem && (
            <SubMenu
              popupOffset="10px"
              key="info"
              title={
                <Checkbox
                  checked={selectedItem.hoverProps.isInfoEnable}
                  style={{ color: "inherit" }}
                  onChange={handleInfoCheckChange}
                >
                  Show Information
                </Checkbox>
              }
              style={{ width: "100%", borderRadius: "20px" }}
            >
              <div style={styles.textBox}>
                <TextArea
                  placeholder="Enter Info For the Selected Path"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={selectedItem.hoverProps.hoverInfo}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
              </div>
            </SubMenu>
          )}
        </Menu>
      </DropDown>
    </>
  );
}

export default OnMouseOver;
