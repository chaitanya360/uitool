import { useEffect, useState } from "react";
import { colors } from "../utility";
import { CURSOR, statusValues } from "../utility/data";
import CopyPoint from "./atoms/CopyPoint";
import Polygon from "./atoms/Polygon";
import VertexPoints from "./atoms/VertexPoints";
import Info from "./Info";

const stack = [];

const Path = ({
  setCursor,
  co,
  tempEnd,
  isSelected,
  handleItemSelect,
  isFreeView,
  setInfo,
  path,
  setCurrentFrameId,
  isAdjustView,
  isTour,
  setCo,
  ContextMenuPosition,
  canRef,
  setPaths,
  paths,
  cursor,
}) => {
  const id = path.id;
  const [bgColor, setBgColor] = useState("transparent");
  const [drawing, setDrawing] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";
  const hoverProps = path.hoverProps;
  const clickProps = path.clickProps;

  // 0 for drawing current polygon
  // 1 for finished drawing current polygon
  const status = path.status;

  useEffect(() => {
    setDrawing(status === 0 ? true : false);
  }, [status]);

  const getCursorPos = (e) => ({
    x: canRef
      ? e.pageX - canRef.current.offsetLeft + canRef.current.scrollLeft
      : 0,
    y: canRef
      ? e.pageY - canRef.current.offsetTop + canRef.current.scrollTop
      : 0,
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
    const getHoverColor = (status) => {
      switch (status) {
        case statusValues.available:
          return colors.available;
        case statusValues.booked:
          return colors.booked;
        case statusValues.notOpened:
          return colors.not_open;
        default:
          return colors.font_dark;
      }
    };
    if (!isFreeView || ContextMenuPosition) return;
    if (path.targetPage) {
      setCursor((cursor) => {
        stack.push(cursor);
        return "pointer";
      });
      setInfo(id);
      setBgColor(getHoverColor(path.targetPage.details.status));
    }

    // if (isFreeView && hoverProps && !ContextMenuPosition) {
    //   if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
    //     setCursor((cursor) => {
    //       stack.push(cursor);
    //       return "pointer";
    //     });
    //     if (hoverProps.isColorEnable) {
    //       setBgColor(hoverProps.hoverColor);
    //     }

    //     if (hoverProps.isInfoEnable) {
    //       setInfo(id);
    //     }
    //   }
    // }
  };

  const handleOnMouseLeave = () => {
    setBgColor("transparent");
    if (path.targetPage) {
      setInfo(false);
      setCursor(stack.pop());
    }
    // if (hoverProps) {
    //   if (hoverProps.isColorEnable || hoverProps.isInfoEnable) {
    //     setInfo(false);
    //     if (isFreeView) setCursor(stack.pop());
    //   }
    // }
  };

  const handleOnMouseClick = (e) => {
    if (isFreeView) {
      e.stopPropagation();
      e.preventDefault();
      if (path.targetPage && path.isClickEnable) {
        setCursor("default");
        setCurrentFrameId(parseInt(path.targetPage.id));
        setInfo(false);
      }

      // if (clickProps) {
      //   if (clickProps.isClickEnable) {
      //     if (clickProps.targetFrameId) {
      //       setCursor("default");
      //       setCurrentFrameId(parseInt(clickProps.targetFrameId));
      //     }
      //     setInfo(false);
      //   }
      // }
    }
  };

  const handleAuxClick = (e) => {
    e.stopPropagation();
    if (isTour || drawing || isFreeView) return;

    if (isSelected && tempEnd.x1) {
      handleItemSelect(false);
      setBgColor(hoverColor);
    } else handleItemSelect({ id: id, e });
  };

  return (
    <g
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onClickCapture={handleOnMouseClick}
      onAuxClick={handleAuxClick}
    >
      <Polygon
        setCursor={setCursor}
        isFreeView={isFreeView}
        bgColor={bgColor}
        canRef={canRef}
        co={co}
        frame={path}
        getCursorPos={getCursorPos}
        isSelected={isSelected}
        paths={paths}
        selectedColor={selectedColor}
        setPaths={setPaths}
        drawing={drawing || adjusting}
      />
      {!isFreeView && (
        <>
          <VertexPoints
            canRef={canRef}
            co={co}
            frame={path}
            getCursorPos={getCursorPos}
            isAdjustView={isAdjustView}
            paths={paths}
            setPaths={setPaths}
            drawing={drawing}
            setAdjusting={setAdjusting}
            setCursor={setCursor}
          />
          <EndCircle />
          <TempLine />
          {/* <CopyPoint
            setCursor={setCursor}
            co={co}
            setCo={setCo}
            drawing={drawing}
            canRef={canRef}
            frame={frame}
            getCursorPos={getCursorPos}
            paths={paths}
            setPaths={setPaths}
            addNewFrame={addNewFrame}
          /> */}
        </>
      )}
    </g>
  );
};

export default Path;
