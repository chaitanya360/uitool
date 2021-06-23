import { useState } from "react";
import { PathLine } from "react-svg-pathline";
const Path = ({
  co,
  tempEnd,
  shouldSelect,
  selectedItem = { id: "random" },
  handleItemSelect,
  hoverProps,
  isFreeView,
  setInfo,
  frame,
}) => {
  const id = frame.id;
  const [bgColor, setBgColor] = useState("transparent");

  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";

  const status = frame.status;

  return (
    <g>
      <g
        onMouseEnter={() => {
          if (hoverProps && isFreeView) {
            if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
              if (hoverProps.isColorEnable) {
                setBgColor(hoverProps.hoverColor);
              }

              if (hoverProps.isInfoEnable) {
                setInfo(id);
              }
            }
          }

          if (shouldSelect) {
            setBgColor(hoverColor);
          }
        }}
        onMouseLeave={() => {
          setBgColor("transparent");

          if (hoverProps) {
            if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
              setInfo(false);
            }
          }
        }}
        onClick={() => {
          if (shouldSelect) {
            if (selectedItem.id === id) {
              handleItemSelect(false);
            } else handleItemSelect({ id: id });
          }
        }}
      >
        {status === 0 && co[0].x !== 0 && (
          <circle
            r="2"
            cx={co[0].x}
            cy={co[0].y}
            stroke={co.length === 1 ? "black" : "red"}
            strokeWidth="1"
            fill="transparent"
          />
        )}

        <PathLine
          points={co}
          stroke="red"
          strokeWidth="1"
          fill={selectedItem.id === id ? selectedColor : bgColor}
          r={10}
        />
      </g>
      <line
        x1={tempEnd.x1}
        y1={tempEnd.y1}
        x2={tempEnd.x2}
        y2={tempEnd.y2}
        stroke="black"
      />
    </g>
  );
};

export default Path;