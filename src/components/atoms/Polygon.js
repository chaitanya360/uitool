import { configConsumerProps } from "antd/lib/config-provider";
import React, { useEffect, useRef, useState } from "react";
import { CURSOR, newFrame } from "../../utility/data";

const stack = [];
const Polygon = ({
  setCursor,
  isFreeView,
  getCursorPos,
  co,
  paths,
  frame,
  setPaths,
  canRef,
  isSelected,
  selectedColor,
  drawing,
  bgColor,
}) => {
  let initialX = 0;
  let initialY = 0;
  let MoveStatus = 0;
  const [polygonStroke, setPolygonStroke] = useState("red");

  const getUpdatedPosition = (pointPosition, xDiff, yDiff) => ({
    x: pointPosition.x + xDiff,
    y: pointPosition.y + yDiff,
  });

  const handleMouseMove = (e) => {
    if (MoveStatus !== 1) return;

    let newCo = [];

    const xDiff = getCursorPos(e).x - initialX;
    const yDiff = getCursorPos(e).y - initialY;
    co.forEach((singlePoint) =>
      newCo.push(getUpdatedPosition(singlePoint, xDiff, yDiff))
    );

    let newPath = [];
    let changed = false;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      if (path === frame) {
        path.co = newCo;
        changed = true;
      }
      newPath.push(path);
    }

    if (changed) setPaths(newPath);
  };

  const handleMouseClick = (e) => {
    if (isFreeView || drawing) return;
    e.stopPropagation();
    initialX = getCursorPos(e).x;
    initialY = getCursorPos(e).y;
    MoveStatus = 1;
    setCursor((cursor) => {
      stack.push(cursor);
      return CURSOR.pick;
    });
    if (canRef) canRef.current.onmousemove = (e) => handleMouseMove(e);
    return;
  };

  const handleMouseEnter = () => {
    if (isFreeView || drawing) return;
    if (!drawing) {
      setPolygonStroke("black");
      setCursor((cursor) => {
        stack.push(cursor);
        return CURSOR.pointer;
      });
    }
  };

  const getPointsFromCo = (co) => {
    let points = "";
    co.forEach(
      (currentPoint) => (points += currentPoint.x + "," + currentPoint.y + " ")
    );
    return points;
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (drawing || isFreeView) return;

    const getId = () => new Date().getTime();
    let newPath = [];
    let copyiedId;

    initialX = getCursorPos(e).x;
    initialY = getCursorPos(e).y;
    canRef.current.onmousemove = (e) => handleMouseMove(e);
    let newCo = [];

    const xDiff = getCursorPos(e).x - initialX;
    const yDiff = getCursorPos(e).y - initialY;
    co.forEach((singlePoint) =>
      newCo.push(getUpdatedPosition(singlePoint, xDiff + 10, yDiff + 10))
    );

    let changed = false;
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      copyiedId = getId();
      // this is original
      newPath.push(path);
      if (path.id === frame.id) {
        changed = true;
        // this is copy
        newPath.push({
          ...newFrame,
          co: newCo,
          id: copyiedId,
          status: "copyied",
        });
      }
    }

    if (changed) setPaths(newPath);

    return;
  };
  return (
    <g>
      <polyline
        onDoubleClick={handleDoubleClick}
        points={getPointsFromCo(co)}
        fill={isSelected ? selectedColor : bgColor}
        stroke={polygonStroke}
        strokeWidth="1"
        onMouseDown={(e) => handleMouseClick(e)}
        onMouseUpCapture={() => {
          MoveStatus = 0;
          if (canRef) {
            canRef.current.onmousemove = null;
            if (!drawing) setCursor(stack.pop());
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          if (isFreeView || drawing) return;
          setPolygonStroke("red");
          setCursor(stack.pop());
        }}
        className="polyline"
      />
    </g>
  );
};

export default Polygon;
