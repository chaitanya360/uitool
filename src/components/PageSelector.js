import React, { useState } from "react";
import { ConsoleSqlOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { colors } from "../utility";
import DropDown from "./DropDown";
import DropDownGroupItem from "./DropDownGroupItem";
import { Menu, Button } from "antd";
const { SubMenu } = Menu;

function PageSelector({
  setContextMenuPosition,
  setNewPageFormDetails,
  setDisplayNewFramePopup,
  paths,
  selectedItem,
  setCurrentTool,
  Frames,
  currentFrameId,
  setPaths,
}) {
  const [selectedFrameType, setSelectedFrameType] = useState(false);
  const [selectedPageid, setSelectedPageid] = useState(
    selectedItem.clickProps &&
      selectedItem.clickProps.isClickEnable &&
      selectedItem.clickProps.targetFrameId
  );
  const handleOnMouseClickValuesChange = (id, targetFrame) => {
    if (targetFrame === "new") {
      setContextMenuPosition(false);
      setNewPageFormDetails(false);
      setDisplayNewFramePopup(true);
    } else {
      let tempPaths = paths;
      console.log(targetFrame);
      tempPaths.forEach((path) => {
        if (path.id === selectedItem.id) {
          if (id === "change_page") {
            path.targetPage = {
              id: targetFrame.id,
            };
            setCurrentTool(false);
          }
        }
      });

      setSelectedPageid(targetFrame.id);
      setPaths(tempPaths);
    }
  };

  const handleMenuItemSelect = (e) => {
    switch (e.key) {
      case "new":
        handleOnMouseClickValuesChange("change_page", "new");
        break;
      default:
        console.log("selected defualt item");
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
    <div style={{ height: "fit-content" }}>
      <Menu theme="light">
        {/* <Menu.Item
          key="new"
          style={{ width: "100%" }}
          onClick={() => handleMenuItemSelect({ key: "new" })}
        >
          <div>
            <Button
              // type="link"
              icon={<PlusCircleOutlined />}
              key="new"
              style={{
                width: "100%",
                height: "100%",
                color: colors.primary,
                display: "flex",
                alignItems: "center",
              }}
              className="dropdown_title"
            >
              Create New Page
            </Button>
          </div>
        </Menu.Item> */}

        {getListedData().map((singleType) => (
          <div
            style={{
              padding: "5px 0px",
              width: "90%",
              fontWeight: "600",
              margin: "0px auto",
            }}
            id="page_list"
          >
            <DropDownGroupItem
              titleBgChangeOnSelect={true}
              title={singleType.type + "s"}
              visible={selectedFrameType == singleType.type || true}
              onDropDownArrowClick={() =>
                selectedFrameType === singleType.type
                  ? setSelectedFrameType(false)
                  : setSelectedFrameType(singleType.type)
              }
            >
              {singleType.list.filter((frame) => frame.id !== currentFrameId)
                .length === 0 ? (
                <Menu.Item>Not Available</Menu.Item>
              ) : (
                singleType.list
                  .filter((frame) => frame.id !== currentFrameId)
                  .map((frame) => (
                    <Menu.Item
                      key={frame.id}
                      onClick={() =>
                        handleOnMouseClickValuesChange("change_page", frame)
                      }
                      style={{
                        color:
                          selectedPageid === frame.id
                            ? colors.primary
                            : "black",
                      }}
                    >
                      {frame.frameName}
                    </Menu.Item>
                  ))
              )}
            </DropDownGroupItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}

export default PageSelector;
