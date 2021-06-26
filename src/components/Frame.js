import React, { useEffect, useRef, useState } from "react";
import Path from "./Path";
import Image from "./Image";
import Info from "./Info";

const getId = () => new Date().getTime();

const isCloserToFirstPoint = (e, co, canRef) => {
  const diffDist = 8;
  const currX = getCursorPos(e, canRef).x;
  const currY = getCursorPos(e, canRef).y;

  const diff = (point1, point2) =>
    point1 > point2 ? point1 - point2 : point2 - point1;

  return (
    diff(co[0].x, currX) < diffDist &&
    diff(co[0].y, currY) < diffDist &&
    co.length > 2
  );
};

function getCursorPos(e, canRef) {
  var a,
    x = 0,
    y = 0;
  e = e || window.event;
  /*get the x and y positions of the image:*/
  a = canRef.current.getBoundingClientRect();
  /*calculate the cursor's x and y coordinates, relative to the image:*/
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  /*consider any page scrolling:*/
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  return { x: x, y: y };
}

const styles = {
  canvasStyle: {
    border: "1px solid black",
    height: "80vh",
    width: "1100px",
    display: "block",
    position: "relative",
    objectFit: "contain",
    overflow: "hidden",
    margin: "auto",
  },
  svgStyle: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
  },
};

function Frame({
  currentTool,
  selectedItem,
  setSelectedItem,
  paths,
  setPaths,
  bgSrc,
  setCurrentFrameId,
}) {
  const shouldDraw = currentTool === "draw";
  const shouldSelect = currentTool === "select";
  const isFreeView = currentTool === "free";

  const [co, setCo] = useState([{ x: 0, y: 0 }]);
  const [tempEnd, setTempEnd] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [info, setInfo] = useState(false);
  const [isCloserToClose, setIsCloserToClose] = useState(false);

  // 0: nothing is clicked
  // 1: first point is clicked
  // 2: last point is clicked, cursor leaves
  let status = useRef(0);
  const canRef = useRef(null);

  const getCursor = () => {
    switch (currentTool) {
      case "draw":
        return `url(${process.env.PUBLIC_URL}/statics/Icons/pen.svg) 0 20, auto`;
      case "select":
        return "pointer";
      default:
        return "auto";
    }
  };

  const handleItemSelect = (item) => {
    if (item) {
      paths.forEach((frame) => {
        if (frame.id === item.id) setSelectedItem(frame);
      });
    }
  };

  const addNewFrame = () => {
    if (co.length > 1) {
      let curr = {
        co,
        id: getId(),
        tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
        hoverProps: {
          isInfoEnable: false,
          isColorEnable: false,
          hoverColor: "",
          hoverInfo: "",
        },
        clickProps: {
          isClickEnable: false,
          targetFrameId: 0,
        },
        status: 1,
      };

      setPaths((old) => [
        // previous paths
        ...old.filter((frame) => frame.id !== "temp"),

        // current frame
        curr,

        // temp frame used for current drawing
        {
          co: [{ x: 0, y: 0 }],
          tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
          id: "temp",
          hoverProps: {
            isInfoEnable: false,
            isColorEnable: false,
            hoverColor: "",
            hoverInfo: "",
          },
          clickProps: {
            isClickEnable: false,
            targetFrameId: 0,
          },
          status: 0,
        },
      ]);

      if (co.length != 1) resetValues();
    }
  };

  const getInfo = () => {
    let pathInfo = false;
    if (info) {
      paths.forEach((frame) => {
        if (frame.id === info) pathInfo = frame.hoverProps.hoverInfo;
      });
    }
    return pathInfo;
  };

  const resetValues = () => {
    status.current = 0;
    setCo([{ x: 0, y: 0 }]);

    setTempEnd({ x1: 0, y1: 0, x2: 0, y2: 0 });
  };

  const isLast = (frame) => {
    return paths.indexOf(frame) === paths.length - 1;
  };

  const handleMouseDown = (e) => {
    if (!shouldDraw) return;

    setTempEnd(() => ({
      x1: getCursorPos(e, canRef).x,
      y1: getCursorPos(e, canRef).y,
      x2: getCursorPos(e, canRef).x,
      y2: getCursorPos(e, canRef).y,
    }));

    // for first point
    if (status.current == 0) {
      setCo([
        {
          x: getCursorPos(e, canRef).x,
          y: getCursorPos(e, canRef).y,
        },
      ]);
      status.current = 1;
      return;
    }

    if (isCloserToClose && status.current === 1) {
      setCo((old) => [...old, { x: old[0].x, y: old[0].y }]);
      status.current = 2;
      setIsCloserToClose(false);
      return;
    }

    if (status.current === 1) {
      setCo((old) => [
        ...old,
        {
          x: getCursorPos(e, canRef).x,
          y: getCursorPos(e, canRef).y,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!shouldDraw) return;

    if (status.current === 2) {
      addNewFrame();
      return;
    }

    if (status.current == 1)
      setTempEnd((old) => ({
        x1: old.x1,
        y1: old.y1,
        x2: getCursorPos(e, canRef).x,
        y2: getCursorPos(e, canRef).y,
      }));

    if (isCloserToFirstPoint(e, co, canRef)) setIsCloserToClose(true);
    else setIsCloserToClose(false);
  };

  const handleMouseLeave = () => () => {
    if (shouldDraw && status.current !== 0) {
      setTempEnd({
        x1: co[co.length - 1].x,
        y1: co[co.length - 1].y,
        x2: co[co.length - 1].x,
        y2: co[co.length - 1].y,
      });
      status.current = 2;
      addNewFrame();
    }
  };

  return (
    <>
      <Info show={info} info={getInfo()} />

      <div
        style={{
          cursor: isCloserToClose
            ? `url(${process.env.PUBLIC_URL}/statics/Icons/penClose.svg) 0 20, auto`
            : getCursor(),
          ...styles.canvasStyle,
        }}
        id="canvas"
        ref={canRef}
      >
        <Image src={bgSrc} />
        <svg
          style={styles.svgStyle}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          {paths.length > 0 ? (
            paths.map((frame) => (
              <Path
                co={isLast(frame) ? co : frame.co}
                tempEnd={isLast(frame) ? tempEnd : frame.tempEnd}
                key={frame.id}
                frame={frame}
                shouldSelect={shouldSelect}
                handleItemSelect={handleItemSelect}
                selectedItem={selectedItem}
                isFreeView={isFreeView}
                setInfo={setInfo}
                setCurrentFrameId={setCurrentFrameId}
              />
            ))
          ) : (
            <Path co={co} tempEnd={tempEnd} frame={{ id: 0, status: 0 }} />
          )}
        </svg>
      </div>
    </>
  );
}

export default Frame;
