import React, { useEffect, useRef, useState } from "react";
import Path from "./Path";
import Image from "./Image";
import Info from "./Info";

const getId = () => new Date().getTime();

function Frame({
  currentTool,
  selectedItem,
  setSelectedItem,
  Frames,
  setFrames,
}) {
  const shouldDraw = currentTool === "draw";
  const shouldSelect = currentTool === "select";
  const isFreeView = currentTool === "free";

  const [co, setCo] = useState([{ x: 0, y: 0 }]);
  const [tempEnd, setTempEnd] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [info, setInfo] = useState(false);

  // 0: nothing is clicked
  // 1: first point is clicked
  // 2: last point is clicked, cursor leaves
  let status = useRef(0);
  const canRef = useRef(null);
  const pathRef = useRef();

  function getCursorPos(e) {
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
      Frames.forEach((frame) => {
        if (frame.id === item.id) setSelectedItem(frame);
      });
    }

    console.log(selectedItem);
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
        },
      };

      setFrames((old) => [
        ...old.filter((frame) => frame.id !== "temp"),
        curr,
        {
          co: [{ x: 0, y: 0 }],
          tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
          id: "temp",
          hoverProps: {
            isInfoEnable: false,
            isColorEnable: false,
          },
        },
      ]);

      if (co.length != 1) resetValues();
    }
  };

  const getInfo = () => {
    let pathInfo = false;
    if (info) {
      Frames.forEach((frame) => {
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
    return Frames.indexOf(frame) === Frames.length - 1;
  };

  console.log("info: ", info);

  return (
    <div
      style={{
        cursor: getCursor(),
        border: "1px solid black",
        height: "80vh",
        width: "1200px",
        display: "block",
        position: "relative",
        objectFit: "contain",
      }}
      id="canvas"
      ref={canRef}
    >
      <Info show={info} info={getInfo()} />
      <Image />
      <svg
        style={{ height: "100%", width: "100%", position: "absolute", top: 0 }}
        onMouseLeave={() => {
          if (shouldDraw && status.current !== 0) {
            setTempEnd({ x1: 0, y1: 0, x2: 0, y2: 0 });
            status.current = 2;
            setTimeout(() => addNewFrame(), 500);
          }
        }}
        onMouseMove={(e) => {
          if (status.current == 1 && shouldDraw)
            setTempEnd((old) => ({
              x1: old.x1,
              y1: old.y1,
              x2: getCursorPos(e).x,
              y2: getCursorPos(e).y,
            }));
        }}
        onMouseDown={(e) => {
          if (!shouldDraw) return;

          if (status.current == 0) {
            setCo([
              {
                x: getCursorPos(e).x,
                y: getCursorPos(e).y,
                x: getCursorPos(e).x,
                y: getCursorPos(e).y,
              },
            ]);
            status.current = 1;
          }

          // for first click
          if (status.current === 0) {
            setTempEnd((old) => ({
              x1: getCursorPos(e).x,
              y1: getCursorPos(e).y,
              x2: getCursorPos(e).x,
              y2: getCursorPos(e).y,
            }));
          }

          if (status.current === 1) {
            setTempEnd((old) => ({
              x1: getCursorPos(e).x,
              y1: getCursorPos(e).y,
              x2: getCursorPos(e).x,
              y2: getCursorPos(e).y,
            }));
          }

          if (status.current !== 0) {
            setCo((old) => [
              ...old,
              {
                x: getCursorPos(e).x,
                y: getCursorPos(e).y,
              },
            ]);
          }
        }}
      >
        {Frames.length > 0 ? (
          Frames.map((frame) => (
            <Path
              co={isLast(frame) ? co : frame.co}
              pathRef={isLast(frame) ? pathRef : frame.pathRef}
              tempEnd={isLast(frame) ? tempEnd : frame.tempEnd}
              id={frame.id}
              key={frame.id}
              shouldSelect={shouldSelect}
              handleItemSelect={handleItemSelect}
              selectedItem={selectedItem}
              hoverProps={frame.hoverProps}
              isFreeView={isFreeView}
              setInfo={setInfo}
            />
          ))
        ) : (
          <Path co={co} pathRef={pathRef} tempEnd={tempEnd} id={0} />
        )}
      </svg>
    </div>
  );
}

export default Frame;
