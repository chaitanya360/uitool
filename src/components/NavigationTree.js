import React, { useContext, useEffect, useState } from "react";
import { Menu, TimePicker, Tree } from "antd";
import { colors } from "../utility";
import { TreeStructure, Node, getChildType } from "../utility/functions";
import Title from "./atoms/TreeTitle";
import TourContext from "../context/TourContext";
// Importing from esm

function NavigationTree({
  Frames,
  setFrames,
  setTreeData,
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  setNewPageFormDetails,
  setShowDeletePagePopup,
  treeData,
}) {
  const { justFinishedStep, nextStep } = useContext(TourContext);
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

  const onDrop = (info) => {
    console.log(info);
    const node = info.node;
    const dragNode = info.dragNode;
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (node.parentKey !== dragNode.parentKey) return;

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...treeData.getDataList()];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    // setTre({
    //   gData: data,
    // });
    // setTreeData(data);
    console.log(data);
    let tempFrames = treeData.getArrayList(data[0]).map((frame) => ({
      bgImg: frame.bgImg,
      frameName: frame.title,
      id: frame.key,
      parentId: frame.parentKey,
      paths: frame.paths,
      status: frame.status,
      thumbnailImg: frame.thumbnailImg,
      type: frame.type,
    }));
    console.log(tempFrames);
    setFrames(treeData);
    // console.log(tempFrames);
    // const targetElement = Frames.find((frame) => frame.id === node.key);
    // const targetIndex = Frames.indexOf(
    //   Frames.find((frame) => frame.id === node.key)
    // );
    // const sourceElement = Frames.find((frame) => frame.id === dragNode.key);
    // const sourceIndex = Frames.indexOf(
    //   Frames.find((frame) => frame.id === dragNode.key)
    // );

    // console.log(targetElement, targetIndex, sourceElement, sourceIndex);

    // // removing source
    // let tempFrames = Frames;
    // tempFrames.splice(sourceIndex, 1);

    // // addding source at target index
    // tempFrames.splice(targetIndex, 0, sourceElement);
    setFrames(tempFrames);
    // console.log(tempFrames);

    // console.log("transpiling");
    // let tree;

    // for (let i = 0; i < tempFrames.length; i++) {
    //   let frame = tempFrames[i];
    //   console.log(frame);
    //   if (frame.type === "tower")
    //     tree = new TreeStructure(
    //       new Node(frame.type, frame.frameName, frame.id, frame.parentId)
    //     );
    //   else
    //     tree.addNode(
    //       new Node(frame.type, frame.frameName, frame.id, frame.parentId)
    //     );
    // }
    // // setTreeData(tree);
  };

  return (
    <div style={{ height: "100%" }}>
      <Tree
        onExpand={() => {
          console.log(justFinishedStep);
          if (justFinishedStep == "create_new_page") nextStep();
        }}
        draggable
        onSelect={onSelect}
        onDrop={onDrop}
        treeData={treeData ? treeData.getDataList() : []}
        defaultExpandParent={treeData ? true : false}
        style={{ padding: "10px 0px", width: "250px", overflow: "auto" }}
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
