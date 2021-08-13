import { useEffect, useState } from "react";
import CopyPoint from "./atoms/CopyPoint";
import Polygon from "./atoms/Polygon";
import VertexPoints from "./atoms/VertexPoints";
import Info from "./Info";
const Path = ({
  co,
  tempEnd,
  isSelected,
  handleItemSelect,
  isFreeView,
  setInfo,
  frame,
  setCurrentFrameId,
  isAdjustView,
  isTour,
  setCo,
  ContextMenuPosition,
  canRef,
  setPaths,
  paths,
  addNewFrame,
}) => {
  const id = frame.id;
  const [bgColor, setBgColor] = useState("transparent");
  const [drawing, setDrawing] = useState(false);
  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";
  const hoverProps = frame.hoverProps;
  const clickProps = frame.clickProps;

  // 0 for drawing current polygon
  // 1 for finished drawing current polygon
  const status = frame.status;

  useEffect(() => {
    setDrawing(status === 0 ? true : false);
  }, [status]);

  const Styles = {
    body: {
      cursor:
        isFreeView && clickProps && clickProps.isClickEnable
          ? "pointer"
          : "inherit",
    },
  };

  const getCursorPos = (e) => ({
    x: e.pageX - canRef.current.offsetLeft + canRef.current.scrollLeft,
    y: e.pageY - canRef.current.offsetTop + canRef.current.scrollTop,
  });

  const TempLine = () => (
    <line
      x1={tempEnd.x1}
      y1={tempEnd.y1}
      x2={tempEnd.x2}
      y2={tempEnd.y2}
      stroke="black"
    />
  );

  const EndCircle = () => {
    if (status !== 0) return <></>;
    return (
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
    if (hoverProps && isFreeView && !ContextMenuPosition) {
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
    if (isTour || drawing) return;

    setInfo(false);
    e.stopPropagation();
    if (isSelected && tempEnd.x1) {
      handleItemSelect(false);
      setBgColor(hoverColor);
    } else handleItemSelect({ id: id, e });
  };

  return (
    <g
      style={Styles.body}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnMouseClick}
      onAuxClick={handleAuxClick}
    >
      <Polygon
        bgColor={bgColor}
        canRef={canRef}
        co={co}
        frame={frame}
        getCursorPos={getCursorPos}
        isSelected={isSelected}
        paths={paths}
        selectedColor={selectedColor}
        setPaths={setPaths}
        drawing={drawing}
      />
      <VertexPoints
        canRef={canRef}
        co={co}
        frame={frame}
        getCursorPos={getCursorPos}
        isAdjustView={isAdjustView}
        paths={paths}
        setPaths={setPaths}
        drawing={drawing}
      />
      <EndCircle />
      <TempLine />
      <CopyPoint
        co={co}
        setCo={setCo}
        drawing={drawing}
        canRef={canRef}
        frame={frame}
        getCursorPos={getCursorPos}
        paths={paths}
        setPaths={setPaths}
        addNewFrame={addNewFrame}
      />
    </g>
  );
};

export default Path;
