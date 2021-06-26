import React from "react";
import { Breadcrumb } from "antd";

function RoutePipeline({ Frames }) {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {Frames.map((frame) => (
        <Breadcrumb.Item>{frame.frameName}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default RoutePipeline;
