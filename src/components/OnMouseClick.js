import React, { useState } from "react";
import { Menu, Button } from "antd";
import { ConsoleSqlOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import DropDown from "./DropDown";
import { colors } from "../utility";
import DropDownGroupItem from "./DropDownGroupItem";
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
  const [selectedFrameType, setSelectedFrameType] = useState(false);

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
    if (value === "new") {
      setContextMenuPosition(false);
      setNewPageFormDetails(false);
      setDisplayNewFramePopup(true);
    } else {
      let tempPaths = paths;

      tempPaths.forEach((frame) => {
        if (frame.id === selectedItem.id) {
          if (id === "change_page") {
            // setting target frame id
            frame.clickProps = {
              ...frame.clickProps,
              targetFrameId: parseInt(value),
            };
            setSelectedItem(false);
            setCurrentTool(false);
          }
        }
      });
    }
  };

  const handleMenuItemSelect = (e) => {
    switch (e.key) {
      case "new":
        handleOnMouseClickValuesChange("change_page", "new");
        break;
      default:
        handleOnMouseClickValuesChange("change_page", e.key);
    }
  };

  const getListedData = () => {
    let Resultlist = [];

    for (let i = 0; i < Frames.length; i++) {
      let currentFrame = Frames[i];
      let hasOfSameType = false;
      for (let j = 0; j < Resultlist.length; j++) {
        if (currentFrame.type === Resultlist[j].type) {
          Resultlist[j].list.push(currentFrame);
          hasOfSameType = true;
          break;
        }
      }
      if (!hasOfSameType) {
        if (currentFrame.isPlaceHolder) {
          Resultlist.push({
            type: currentFrame.type,
            list: [],
          });
        } else {
          Resultlist.push({
            type: currentFrame.type,
            list: [currentFrame],
          });
        }
      }
    }

    return Resultlist;
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
                <Menu theme="dark">
                  <Menu.Item
                    key="new"
                    style={{ width: "100%" }}
                    onClick={() => handleMenuItemSelect({ key: "new" })}
                  >
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

                  {getListedData().map((singleType) => (
                    <div
                      style={{
                        padding: "5px 0px",
                        width: "90%",
                        fontWeight: "600",
                        margin: "10px auto",
                      }}
                    >
                      <DropDownGroupItem
                        titleBgChangeOnSelect
                        title={singleType.type + "s"}
                        visible={selectedFrameType == singleType.type}
                        onDropDownArrowClick={() =>
                          selectedFrameType === singleType.type
                            ? setSelectedFrameType(false)
                            : setSelectedFrameType(singleType.type)
                        }
                      >
                        {singleType.list
                          .filter((frame) => frame.id !== currentFrameId)
                          .map((frame) => (
                            <Menu.Item
                              key={frame.id}
                              onClick={() =>
                                handleOnMouseClickValuesChange(
                                  "change_page",
                                  frame.id
                                )
                              }
                              style={{
                                color:
                                  selectedItem.clickProps &&
                                  selectedItem.clickProps.isClickEnable &&
                                  selectedItem.clickProps.targetFrameId ===
                                    frame.id
                                    ? colors.light_blue
                                    : "white",
                              }}
                            >
                              {frame.frameName}
                            </Menu.Item>
                          ))}
                      </DropDownGroupItem>
                    </div>
                  ))}
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
