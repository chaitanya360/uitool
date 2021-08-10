import { useState } from "react";
import { PathLine } from "react-svg-pathline";
import Info from "./Info";
const Path = ({
  co,
  tempEnd,
  selectedItem = { id: "random" },
  handleItemSelect,
  isFreeView,
  setInfo,
  frame,
  setCurrentFrameId,
  handleShowInfo,
  info,
  isTour,
}) => {
  const id = frame.id;
  const [bgColor, setBgColor] = useState("transparent");

  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";
  const hoverProps = frame.hoverProps;
  const clickProps = frame.clickProps;

  const status = frame.status;

  const Styles = {
    body: {
      cursor:
        isFreeView && clickProps && clickProps.isClickEnable
          ? "pointer"
          : "inherit",
    },
  };

  const VertexPoints = () => {
    co.map((singlePoint) => (
      <circle
        r="3"
        cx={singlePoint.x}
        cy={singlePoint.y}
        stroke={"red"}
        strokeWidth="1"
        fill="transparent"
      />
    ));
  };

  const TempLine = () => (
    <line
      x1={tempEnd.x1}
      y1={tempEnd.y1}
      x2={tempEnd.x2}
      y2={tempEnd.y2}
      stroke="black"
    />
  );

  const Polygon = () => (
    <PathLine
      points={co}
      stroke="red"
      strokeWidth="1"
      fill={selectedItem.id === id ? selectedColor : bgColor}
      r={2}
    />
  );

  const EndCircle = () => {
    return (
      status === 0 &&
      co[0].x !== 0 && (
        <circle
          r="3"
          cx={co[0].x}
          cy={co[0].y}
          stroke={co.length === 1 ? "black" : "red"}
          strokeWidth="1"
          fill="transparent"
        />
      )
    );
  };

  const handleOnMouseOver = (e) => {
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
  };

  const handleOnMouseLeave = () => {
    setBgColor("transparent");

    if (hoverProps) {
      if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
        setInfo(false);
      }
    }
  };

  const handleOnMouseClick = () => {
    if (isFreeView) {
      if (clickProps) {
        if (clickProps.isClickEnable) {
          if (clickProps.targetFrameId)
            setCurrentFrameId(parseInt(clickProps.targetFrameId));
          setInfo(false);
        }
      }
    }
  };

  const handleAuxClick = (e) => {
    if (isFreeView) return;
    if (status === 0) return;
    e.stopPropagation();
    if (selectedItem.id === id && tempEnd.x1) {
      handleItemSelect(false);
      setBgColor(hoverColor);
    } else handleItemSelect({ id: id, e });
  };

  return (
    <g>
      <g
        style={Styles.body}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnMouseClick}
        onAuxClick={handleAuxClick}
      >
        <Polygon />
        <EndCircle />
        <TempLine />
      </g>
    </g>
  );
};

export default Path;
