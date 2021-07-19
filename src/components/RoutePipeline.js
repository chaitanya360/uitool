import React from "react";
import { Breadcrumb } from "antd";

function RoutePipeline({
  location,
  setCurrentFrameId,
  Frames,
  setCurrentTool,
}) {
  const getFrameName = (id) => {
    for (let i = 0; i < Frames.length; i++) {
      if (Frames[i].id === id) {
        return Frames[i].frameName;
      }
    }
  };
  return (
    <Breadcrumb>
      {location.map((singleLocation, index) => (
        <Breadcrumb.Item
          key={index.toString()}
          onClick={() => {
            setCurrentTool("free");
            setCurrentFrameId(singleLocation);
          }}
        >
          <span
            style={{
              cursor: "pointer",
              color: index === location.length - 1 ? "white" : "inherit",
            }}
          >
            {getFrameName(singleLocation)}
          </span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default RoutePipeline;
