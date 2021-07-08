import { useState } from "react";
import { PathLine } from "react-svg-pathline";
const Path = ({
  co,
  tempEnd,
  shouldSelect,
  selectedItem = { id: "random" },
  handleItemSelect,
  isFreeView,
  setInfo,
  frame,
  setCurrentFrameId,
}) => {
  const id = frame.id;
  const [bgColor, setBgColor] = useState("transparent");

  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";
  const hoverProps = frame.hoverProps;
  const clickProps = frame.clickProps;

  const status = frame.status;

  return (
    <g>
      <g
        style={{
          cursor:
            isFreeView && clickProps && clickProps.isClickEnable
              ? "pointer"
              : "inherit",
        }}
        onMouseOver={() => {
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

          if (isFreeView) {
            if (clickProps) {
              if (clickProps.isClickEnable) {
                setCurrentFrameId(parseInt(clickProps.targetFrameId));
                setInfo(false);
              }
            }
          }
        }}
      >
        {status === 0 && co[0].x !== 0 && (
          <circle
            r="3"
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
          r={2}
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
