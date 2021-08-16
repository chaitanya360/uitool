import React, { useEffect, useState } from "react";
import { Menu, Tree } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { colors } from "../utility";
// Importing from esm

class Node {
  constructor(type, title, key, parentKey) {
    this.title = title;
    this.key = key;
    this.type = type;
    this.parentKey = parentKey;
    this.children = [];
  }
  getTitle = () => this.title;
  getKey = () => this.key;
  getParentKey = () => this.getParentKey;
  getchildren = () => this.children;
}
function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

class TreeStructure {
  constructor(root) {
    this.root = root;
  }

  addNode = (node, root = this.root) => {
    if (node.parentKey === root.key) {
      // this is for new button
      // if (root.children.length === 0)
      //   root.children.unshift(
      //     new Node(node.type, "+ Add " + node.type, "btn" + root.key, root.key)
      //   );
      root.children.push(node);
      return true;
    } else {
      for (let i = 0; i < root.children.length; i++) {
        let newRoot = root.children[i];
        if (this.addNode(node, newRoot)) return true;
      }
      return false;
    }
  };

  removeNode = (node, root = this.root) => {
    for (let i = 0; i < root.children.length; i++) {
      let singleChild = root.children[i];
      if (singleChild.key === node.key) {
        root.children = removeItem(root.children, node);
        return true;
      } else if (this.removeNode(node, singleChild)) return true;
    }
    return false;
  };

  getchildrenList = (root = this.root) => {
    let list = [];
    for (let i = 0; i < root.children.length; i++) {
      let child = root.children[i];
      list.push({
        key: child.key,
        title: child.title,
      });
    }
    return list;
  };

  getDataList = () => {
    let string = JSON.stringify(this.root);
    return [JSON.parse(string)];
  };
}

function NavigationTree({
  Frames,
  currentFrameId,
  setCurrentFrameId,
  displayNewFramePopupState,
  setNewPageFormDetails,
  setShowDeletePagePopup,
}) {
  let tree;
  const [displayNewFramePopup, setDisplayNewFramePopup] =
    displayNewFramePopupState;
  const [treeData, setTreeData] = useState(false);
  // const root = new Node("Tower", "tower", false);
  // const tree = new TreeStructure(root);
  // const node1 = new Node("Blocka", "blocka", "tower");
  // const node2 = new Node("Blockb", "blcokb", "tower");
  // const flat2 = new Node("Flat2", "flat2", "floor1");
  // console.log(Frames);

  // tree.addNode(node1);
  // tree.addNode(node2);
  // tree.addNode(new Node("Floor1", "floor1", "blocka"));
  // tree.addNode(new Node("Flat1", "flat1", "floor1"));
  // tree.addNode(flat2);

  const getChildType = (type) => {
    console.log(type);
    switch (type) {
      case "tower":
        return "block";
      case "block":
        return "floor";
      case "floor":
        return "flat";
      default:
        return "Type";
    }
  };

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

  const Title = ({ element }) => {
    return (
      <div
        style={{
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "3px",
          color: element.key === currentFrameId ? colors.white : "inherit",
          backgroundColor:
            element.key === currentFrameId ? colors.primary : "inherit",
        }}
      >
        <span
          onClick={() => setCurrentFrameId(element.key)}
          style={{
            padding: "0px 10px",
            maxWidth: "100px",
            whiteSpace: "nowrap",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // margin: "1px 0px",
          }}
        >
          {element.title}
        </span>
        <PlusCircleOutlined
          style={{
            margin: "0px 5px",
            display: element.type === "flat" ? "none" : "inline-block",
          }}
          className="new_btn_icon"
          onClick={() => handleAddNewBtnClicked(element.type, element.key)}
        />
        <DeleteOutlined
          style={{
            margin: "0px 5px",
            display:
              element.type === "tower" || element.key !== currentFrameId
                ? "none"
                : "inline-block",
          }}
          className="delete_btn_icon"
          onClick={() =>
            setShowDeletePagePopup({ name: element.title, id: element.key })
          }
        />
      </div>
    );
  };

  useEffect(() => {
    for (let i = 0; i < Frames.length; i++) {
      let frame = Frames[i];
      if (frame.type === "tower")
        tree = new TreeStructure(
          new Node(frame.type, frame.frameName, frame.id, frame.parentId)
        );
      else
        tree.addNode(
          new Node(frame.type, frame.frameName, frame.id, frame.parentId)
        );
    }
    setTreeData(tree);
  }, [Frames]);

  return (
    <div style={{ height: "100%" }}>
      <Tree
        onSelect={onSelect}
        treeData={treeData ? treeData.getDataList() : []}
        defaultExpandParent={treeData ? true : false}
        style={{ padding: "10px", width: "250px", overflow: "auto" }}
        height={500}
        titleRender={(element) => <Title element={element} />}
      />
    </div>
  );
}

export default NavigationTree;
