import React, { useEffect, useState } from "react";
import { Menu } from "antd";

import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import SelectedPathId from "./SelectedPathId";
import DropDownGroupItem from "./DropDownGroupItem";
import { colors } from "../utility";
import NavigationTree from "./NavigationTree";
import DeletePopup from "./DeletePopup";

function MenuList({
  setFrames,
  setTreeData,
  selectedItemState,
  projectName,
  Frames,
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  currentFrameType,
  setNewPageFormDetails,
  handlePublishPressed,
  setShowDeletePagePopup,
  treeData,
}) {
  useEffect(() => {
    setSelectedFrameType(currentFrameType);
  }, [currentFrameId]);

  const [selectedFrameType, setSelectedFrameType] = useState("Tower");
  const getListedData = () => {
    console.log(Frames);
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
    <>
      <div id="slider" style={{ display: "flex", flexDirection: "column" }}>
        <Menu.ItemGroup title={<ProjectTitle />}>
          <NavigationTree
            Frames={Frames}
            setFrames={setFrames}
            setTreeData={setTreeData}
            currentFrameId={currentFrameId}
            setCurrentFrameId={setCurrentFrameId}
            displayNewFramePopupState={displayNewFramePopupState}
            setShowDeletePagePopup={setShowDeletePagePopup}
            treeData={treeData}
            setNewPageFormDetails={setNewPageFormDetails}
          />
        </Menu.ItemGroup>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "fit-content",
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
    </>
  );
}

export default MenuList;
