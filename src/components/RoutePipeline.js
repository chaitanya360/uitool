import React from "react";
import { Breadcrumb } from "antd";
import { colors } from "../utility";

function RoutePipeline({
  setCurrentFrameId,
  setCurrentTool,
  treeData,
  currentFrameId,
}) {
  const getLocation = () => {
    if (!treeData) return [];
    let curr = false;
    let tempKey = currentFrameId;
    let location = [];
    let is_last = true;
    do {
      curr = treeData.getNode(tempKey);
      let key = curr.key;
      let title = curr.title;
      let parentKey = curr.title;
      let type = curr.type;
      let isLast = is_last;
      location.unshift({
        key,
        title,
        parentKey,
        type,
        isLast,
      });
      is_last = false;

      tempKey = curr.parentKey;
    } while (curr.type !== "tower");

    return location;
  };
  return (
    <Breadcrumb>
      {getLocation().map((singleLocation, index) => (
        <Breadcrumb.Item
          key={index.toString()}
          onClick={() => {
            setCurrentTool("free");
            setCurrentFrameId(singleLocation.key);
          }}
        >
          <span
            style={{
              cursor: "pointer",
              color: singleLocation.isLast ? colors.primary : "inherit",
              fontWeight: "500",
            }}
          >
            {singleLocation.title}
          </span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default RoutePipeline;
