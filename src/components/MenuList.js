import React, { useEffect, useState } from "react";
import { Menu } from "antd";

import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import SelectedPathId from "./SelectedPathId";
import DropDownGroupItem from "./DropDownGroupItem";

function MenuList({
  isSliderCollapsed,
  selectedItemState,
  projectName,
  Frames,
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  currentFrameType,
  setNewPageFormDetails,
}) {
  useEffect(() => {
    setSelectedFrameType(currentFrameType);
  }, [currentFrameId]);

  const [selectedFrameType, setSelectedFrameType] = useState("Tower");
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

    // Resultlist.push({ type, list });
    return Resultlist;
  };

  const selectedItem = selectedItemState[0];
  return (
    <>
      <Menu.ItemGroup title={projectName}>
        {getListedData().map((singleType) => (
          <div
            key={singleType.type}
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
              {singleType.list.map((frame) => (
                <Menu.Item
                  key={frame.id}
                  style={{
                    margin: "0px",
                    color: frame.id === currentFrameId ? "white" : "unset",
                    borderTop: "1px solid rgba(255,255,255,0.3)",
                    padding: "0px 10px",
                  }}
                  onClick={() => setCurrentFrameId(frame.id)}
                >
                  {frame.frameName}
                </Menu.Item>
              ))}

              {singleType.type !== "Tower" && (
                <Menu.Item
                  key="new"
                  style={{ width: "100%", margin: "0px", padding: "0px" }}
                >
                  <Button
                    type="link"
                    icon={<PlusCircleOutlined />}
                    key="new"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderTop: "1px solid rgba(255,255,255,0.3)",
                    }}
                    onClick={() => {
                      setNewPageFormDetails({ type: singleType.type });
                      displayNewFramePopupState[1](true);
                    }}
                  >
                    Add {singleType.type}
                  </Button>
                </Menu.Item>
              )}
            </DropDownGroupItem>
          </div>
        ))}
      </Menu.ItemGroup>

      {selectedItem !== false && (
        <>
          <SelectedPathId
            isSliderCollapsed={isSliderCollapsed}
            selectedItem={selectedItem}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          // alignItems: "flex-end",
        }}
      >
        <Button
          type="primary"
          style={{ position: "absolute", bottom: "10px", fontWeight: "500" }}
        >
          Publish
        </Button>
      </div>
    </>
  );
}

export default MenuList;
