import React from "react";
import { CURSOR } from "../../utility/data";

const stack = [];
const VertexPoints = ({
  setCursor,
  setAdjusting,
  isAdjustView,
  co,
  getCursorPos,
  frame,
  canRef,
  paths,
  setPaths,
  drawing,
}) => {
  let AdjustStatus = 0;
  if (!isAdjustView) return <></>;

  const handleMouseMove = (clickedPoint, e) => {
    if (AdjustStatus !== 1) return;

    let newCo = [];

    if (co[0] === clickedPoint || co[co.length - 1] === clickedPoint) {
      // this is for first point, as last point should also be changed
      newCo.push(getCursorPos(e));
      for (let i = 1; i < co.length - 1; i++) newCo.push(co[i]);
      newCo.push(getCursorPos(e));
    } else {
      co.forEach((singlePoint) =>
        singlePoint === clickedPoint
          ? newCo.push(getCursorPos(e))
          : newCo.push(singlePoint)
      );
    }

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

  const handleMouseClick = (clickedPoint, e) => {
    e.stopPropagation();
    AdjustStatus = 1;
    setAdjusting(true);
    canRef.current.onmousemove = (event) =>
      handleMouseMove(clickedPoint, event);
    // canRef.current.style.cursor = "pointer";
    if (!drawing)
      setCursor((cursor) => {
        stack.push(cursor);
        return CURSOR.resize;
      });
  };

  return co.map((singlePoint, index) => (
    <g>
      <circle
        key={index}
        r="4"
        cx={singlePoint.x}
        cy={singlePoint.y}
        stroke={"red"}
        // className="vertex_point"
        strokeWidth="2"
        fill="transparent"
        onMouseEnter={() => {
          if (drawing) return;
          setCursor((cursor) => {
            stack.push(cursor);
            return CURSOR.resize;
          });
        }}
        onMouseLeave={() => {
          if (drawing) return;
          setCursor(stack.pop());
        }}
        style={{ display: drawing ? "none" : "block" }}
        onMouseDown={(e) => handleMouseClick(singlePoint, e)}
        onMouseUpCapture={() => {
          AdjustStatus = 0;
          setAdjusting(false);
          canRef.current.onmousemove = null;
          if (!drawing) setCursor(stack.pop());
          // canRef.current.style.cursor = "inherit";
        }}
      />
    </g>
  ));
};

export default VertexPoints;
