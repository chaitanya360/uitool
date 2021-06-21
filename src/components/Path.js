import { useState } from "react";
import { PathLine } from "react-svg-pathline";
const Path = ({
  pathRef,
  co,
  tempEnd,
  id,
  shouldSelect,
  selectedItem = { id: "random" },
  handleItemSelect,
  hoverProps,
  isFreeView,
  setInfo,
}) => {
  const [bgColor, setBgColor] = useState("transparent");

  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";

  return (
    <g ref={pathRef} style={{ position: "absolute" }}>
      <g
        onMouseEnter={() => {
          if (hoverProps && isFreeView) {
            if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
              console.log("on element");

              if (hoverProps.hoverColor) {
                setBgColor(hoverProps.hoverColor);
                console.log("hovercolor is present", hoverProps.hoverColor);
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
