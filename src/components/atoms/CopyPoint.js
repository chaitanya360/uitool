import React, { useEffect } from "react";
import { CURSOR, newFrame } from "../../utility/data";

const stack = [CURSOR.pen];
const CopyPoint = ({
  setCursor,
  co,
  drawing,
  canRef,
  paths,
  setPaths,
  getCursorPos,
  frame,
  addNewFrame,
  setCo,
}) => {
  let CopyStatus = false;
  const polygonVertexPosition = co[0];
  let copied;
  const offsetPosition = 15;
  const getId = () => new Date().getTime();
  let newPath = [];
  let copyiedId;

  const pointPosition = {
    x: polygonVertexPosition.x,
    y: polygonVertexPosition.y - offsetPosition,
  };

  let initialX = 0;
  let initialY = 0;
  const circleRadius = 5;

  const handleMouseMove = (e) => {
    if (CopyStatus !== 1) return;
    let newCo = [];

    const xDiff = getCursorPos(e).x - initialX;
    const yDiff = getCursorPos(e).y - initialY;
    co.forEach((singlePoint) =>
      newCo.push(getUpdatedPosition(singlePoint, xDiff, yDiff))
    );

    let tempPath = [];
    let changed = false;
    for (let i = 0; i < newPath.length; i++) {
      let path = newPath[i];
      if (path.id === copyiedId) {
        changed = true;
        path.co = newCo;
        copied = true;
      }
      // again this is original pushed
      tempPath.push(path);
    }

    if (changed) setPaths(tempPath);
  };

  const getUpdatedPosition = (pointPosition, xDiff, yDiff) => ({
    x: pointPosition.x + xDiff,
    y: pointPosition.y + yDiff,
  });

  const handleMouseClick = (e) => {
    e.stopPropagation();

    if (!drawing)
      setCursor((cursor) => {
        stack.push(cursor);
        return CURSOR.copy;
      });

    initialX = getCursorPos(e).x;
    initialY = getCursorPos(e).y;
    CopyStatus = 1;
    canRef.current.onmousemove = (e) => handleMouseMove(e);
    let newCo = [];

    const xDiff = getCursorPos(e).x - initialX;
    const yDiff = getCursorPos(e).y - initialY;
    co.forEach((singlePoint) =>
      newCo.push(getUpdatedPosition(singlePoint, xDiff, yDiff))
    );

    let changed = false;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      copyiedId = getId();
      if (path.id === frame.id) {
        changed = true;
        // this is original
        newPath.push({
          ...newFrame,
          co: newCo,
          id: copyiedId,
          status: "copyied",
        });
        copied = true;
      }
      // again this is copy pushed
      newPath.push(path);
    }

    if (changed) setPaths(newPath);

    return;
  };

  return !drawing ? (
    <g className="copy-point">
      <circle
        r={circleRadius}
        cx={pointPosition.x}
        cy={pointPosition.y}
        stroke={co.length === 1 ? "black" : "red"}
        strokeWidth="1"
        fill="transparent"
        onMouseEnter={(e) => {
          e.stopPropagation();
        }}
        onMouseLeave={() => {
          if (!drawing) setCursor(CURSOR.pen);
        }}
        onMouseDown={(e) => handleMouseClick(e)}
        onMouseUpCapture={(e) => {
          if (!drawing) setCursor(CURSOR.pen);
          e.stopPropagation();
          newPath = [];
          CopyStatus = 0;
          canRef.current.onmousemove = null;
          copied = false;
        }}
      />
      {/* line joining vertex and circle */}
      <line
        x1={co[0].x}
        y1={co[0].y}
        x2={pointPosition.x - 1}
        y2={pointPosition.y + circleRadius - 1}
        stroke="red"
        onMouseDown={(e) => e.stopPropagation()}
      />
      {/* for plus sign */}
      <line
        x1={pointPosition.x - circleRadius + 2}
        y1={pointPosition.y}
        x2={pointPosition.x + circleRadius - 2}
        y2={pointPosition.y}
        stroke="red"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ pointerEvents: "none" }}
      />
      <line
        x1={pointPosition.x}
        y1={pointPosition.y - circleRadius + 2}
        x2={pointPosition.x}
        y2={pointPosition.y + circleRadius - 2}
        stroke="red"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ pointerEvents: "none" }}
      />
    </g>
  ) : (
    <></>
  );
};

export default CopyPoint;
