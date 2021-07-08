import React from "react";
import { Breadcrumb } from "antd";

function RoutePipeline({ location, setCurrentFrameId, Frames, isFreeView }) {
  const getFrameName = (id) => {
    for (let i = 0; i < Frames.length; i++) {
      if (Frames[i].id === id) {
        return Frames[i].frameName;
      }
    }
  };
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {location.map((singleLocation, index) => (
        <Breadcrumb.Item
          onClick={() =>
            isFreeView
              ? setCurrentFrameId(singleLocation)
              : alert("Select Free Tool To Navigate")
          }
        >
          <span
            style={{
              cursor: "pointer",
              color: index === location.length - 1 ? "dodgerblue" : "inherit",
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
