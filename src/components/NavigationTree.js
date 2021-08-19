import React, { useEffect, useState } from "react";
import { Menu, Tree } from "antd";
import { colors } from "../utility";
import { TreeStructure, Node, getChildType } from "../utility/functions";
import Title from "./atoms/TreeTitle";
// Importing from esm

function NavigationTree({
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  setNewPageFormDetails,
  setShowDeletePagePopup,
  treeData,
}) {
  const setDisplayNewFramePopup = displayNewFramePopupState[1];

  const handleAddNewBtnClicked = (type, parentKey) => {
    setNewPageFormDetails({ type: getChildType(type), parentKey: parentKey });
    setDisplayNewFramePopup(true);
  };

  const onSelect = (selectedKeys, info) => {
    // check if it is button
    if (info.node.key.toString().indexOf("btn") !== -1) {
      handleAddNewBtnClicked(info.node.type, info.node.parentKey);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Tree
        onSelect={onSelect}
        treeData={treeData ? treeData.getDataList() : []}
        defaultExpandParent={treeData ? true : false}
        style={{ padding: "10px", width: "250px", overflow: "auto" }}
        height={500}
        titleRender={(element) => (
          <Title
            currentFrameId={currentFrameId}
            handleAddNewBtnClicked={handleAddNewBtnClicked}
            setCurrentFrameId={setCurrentFrameId}
            setShowDeletePagePopup={setShowDeletePagePopup}
            element={element}
          />
        )}
      />
    </div>
  );
}

export default NavigationTree;
