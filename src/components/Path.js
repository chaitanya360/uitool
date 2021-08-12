import { useState } from "react";
import { PathLine } from "react-svg-pathline";
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
  drawing,
}) => {
  const id = frame.id;
  const [bgColor, setBgColor] = useState("transparent");

  const hoverColor = "rgba(255,0,0,0.15)";
  const selectedColor = "rgba(255,0,0,0.25)";
  const hoverProps = frame.hoverProps;
  const clickProps = frame.clickProps;

  // 0 for drawing current polygon
  // 1 for finished drawing current polygon
  const status = frame.status;

  // 0 for nothing
  // 1 for clicked
  let AdjustStatus = 0;

  // 0 for nothing
  // 1 for clicked;
  let MoveStatus = 0;

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

  const VertexPoints = () => {
    if (!isAdjustView) return <></>;

    const handleMouseMove = (clickedPoint, e) => {
      if (AdjustStatus !== 1) return;

      let newCo = [];

      if (co[0] === clickedPoint || co[co.length - 1] === clickedPoint) {
        // this is for first point, as last point is should also be changed
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

    const handleMouseClick = (clickedPoint) => {
      AdjustStatus = 1;
      canRef.current.onmousemove = (event) =>
        handleMouseMove(clickedPoint, event);
    };

    return co.map((singlePoint, index) => (
      <g>
        <circle
          key={index}
          r="4"
          cx={singlePoint.x}
          cy={singlePoint.y}
          stroke={"red"}
          className="vertex_point"
          strokeWidth="1"
          fill="transparent"
          onMouseDownCapture={() => handleMouseClick(singlePoint)}
          onMouseUpCapture={() => {
            AdjustStatus = 0;
            canRef.current.onmousemove = null;
          }}
        />
      </g>
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

  const Polygon = () => {
    let initialX = 0;
    let initialY = 0;

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
      initialX = getCursorPos(e).x;
      initialY = getCursorPos(e).y;
      MoveStatus = 1;
      canRef.current.onmousemove = (e) => handleMouseMove(e);
      return;
    };

    const getPointsFromCo = (co) => {
      let points = "";
      co.forEach(
        (currentPoint) =>
          (points += currentPoint.x + "," + currentPoint.y + " ")
      );
      return points;
    };

    return (
      <g>
        <polyline
          points={getPointsFromCo(co)}
          fill={isSelected ? selectedColor : bgColor}
          stroke="red"
          strokeWidth="1"
          onMouseDownCapture={(e) => handleMouseClick(e)}
          onMouseUpCapture={() => {
            MoveStatus = 0;
            canRef.current.onmousemove = null;
          }}
          className="polyline"
        />
      </g>
    );
  };

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
      <Polygon />
      <EndCircle />
      <TempLine />
      <VertexPoints />
    </g>
  );
};

export default Path;
