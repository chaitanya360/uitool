import React, { useEffect, useState } from "react";
import { Menu } from "antd";

import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import SelectedPathId from "./SelectedPathId";
import DropDownGroupItem from "./DropDownGroupItem";
import { colors } from "../utility";

function MenuList({
  selectedItemState,
  projectName,
  Frames,
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  currentFrameType,
  setNewPageFormDetails,
  handlePublishPressed,
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

  const ProjectTitle = () => (
    <Menu.Item
      style={{
        backgroundColor: "#F33256",
        padding: "2px 15px",
        fontSize: "1rem",
        cursor: "default",
        textTransform: "capitalize",
        color: "rgba(255,255,255,0.8)",
        margin: "5px auto",
        marginTop: "0px",
      }}
    >
      {projectName}
    </Menu.Item>
  );

  return (
    <div id="slider">
      <Menu.ItemGroup title={<ProjectTitle />}>
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
                      color: "black",
                      borderTop: "1px solid rgba(255,255,255,0.3)",
                    }}
                    onClick={() => {
                      setNewPageFormDetails({ type: singleType.type });
                      displayNewFramePopupState[1](true);
                    }}
                    className=".hover_for_black"
                  >
                    Add {singleType.type}
                  </Button>
                </Menu.Item>
              )}
            </DropDownGroupItem>
          </div>
        ))}
      </Menu.ItemGroup>

      {/* {selectedItem !== false && (
        <>
          <SelectedPathId
            isSliderCollapsed={isSliderCollapsed}
            selectedItem={selectedItem}
          />
        </>
      )} */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Button
          type="primary"
          style={{
            position: "absolute",
            bottom: "10px",
            fontWeight: "500",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.8)",
            color: "black",
          }}
          onClick={handlePublishPressed}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

export default MenuList;
