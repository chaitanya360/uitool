import React, { useEffect, useRef, useState } from "react";
import Path from "./Path";
import Info from "./Info";
import { PlusCircleOutlined } from "@ant-design/icons";
import { colors } from "../utility";
import Loading from "./Loading";

const getId = () => new Date().getTime();

const getVerticallyCenteredY = (cos) => {
  let max = 0;
  let min = 99999;
  let i = 0;
  for (i = 0; i < cos.length; i++) {
    if (cos[i].y > max) max = cos[i].y;
    if (cos[i].y < min) min = cos[i].y;
  }

  return (max + min) / 2;
};

const getExtreateRightX = (cos) => {
  let max = 0;
  let i = 0;
  for (i = 0; i < cos.length; i++) {
    if (cos[i].x > max) max = cos[i].x;
  }

  return max;
};

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
  let x, y;
  x = e.pageX - canRef.current.offsetLeft + canRef.current.scrollLeft;
  y = e.pageY - canRef.current.offsetTop + canRef.current.scrollTop;
  return { x: x, y: y };
}

const styles = {
  svgStyle: {
    height: "600px",
    width: "1200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    // width: "100%",
    // height: "auto",
  },
};

function Frame({
  currentToolState,
  selectedItem,
  setSelectedItem,
  paths,
  setPaths,
  bgSrc,
  setCurrentFrameId,
  setContextMenuPosition,
  setBgImg,
  displayImageUploaderState,
  isTour,
  ContextMenuPosition,
}) {
  const [displayImageUploader, setDisplayImageUploader] =
    displayImageUploaderState;
  const [currentTool, setCurrentTool] = currentToolState;
  const shouldDraw = currentTool === "draw";
  // const shouldSelect = currentTool === "select";
  const isFreeView = currentTool === "free";

  const [co, setCo] = useState([{ x: 0, y: 0 }]);
  const [tempEnd, setTempEnd] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [info, setInfo] = useState(false);
  const [isCloserToClose, setIsCloserToClose] = useState(false);
  const [loadingBg, setLoadingBg] = useState(false);

  // 0: nothing is clicked
  // 1: first point is clicked
  // 2: last point is clicked, cursor leaves
  let status = useRef(0);
  const canRef = useRef(null);

  const getCursor = () => {
    if (selectedItem || !bgSrc) return "default";
    switch (currentTool) {
      case "draw":
        return `url(${process.env.PUBLIC_URL}/statics/Icons/pen.svg) 0 20, auto`;
      case "select":
        return "pointer";
      default:
        return "auto";
    }
  };

  useEffect(() => {
    setInfo(false);
  }, []);

  const handleItemSelect = (item) => {
    if (item) {
      paths.forEach((frame) => {
        if (frame.id === item.id) {
          setSelectedItem(frame);

          setContextMenuPosition(
            getContextMenuPosition({ x: item.e.pageX, y: item.e.pageY }, canRef)
          );
        }
      });
    }
  };

  const addNewFrame = () => {
    console.log("adding new");
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

  const getInfoPos = () => {
    const infoWidth = 400;
    const infoHight = 300;
    let currPath = false;
    // info variable contains id which is set when
    // on mouse over event calls in Paths component

    for (let i = 0; i < paths.length; i++)
      if (paths[i].id === info) currPath = paths[i];

    if (!currPath) return { x: -100, y: 0 };
    const extreameX = getExtreateRightX(currPath.co);
    const verticallyCenterredY = getVerticallyCenteredY(currPath.co);

    const x = extreameX + canRef.current.offsetLeft;
    const y = verticallyCenterredY + canRef.current.offsetTop;
    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (selectedItem) {
      setContextMenuPosition(false);
      if (currentTool === "adjust") setCurrentTool("free");
      setSelectedItem(false);
      return;
    }
    if (!shouldDraw) return;
    if (currentTool === "select") return;

    setTempEnd(() => ({
      x1: getCursorPos(e, canRef).x,
      y1: getCursorPos(e, canRef).y,
      x2: getCursorPos(e, canRef).x,
      y2: getCursorPos(e, canRef).y,
    }));

    // for first point
    if (status.current === 0 || status.current === 2) {
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

  const getContextMenuPosition = (e) => {
    let x = e.x;
    let y = e.y;
    // x += canRef.current.offsetLeft;
    let contextWidth = 235;
    let contextHeight = 315;
    if (x > window.innerWidth - contextWidth) x -= contextWidth;
    if (y > window.innerHeight - contextHeight)
      y = window.innerHeight - contextHeight;

    return {
      x,
      y,
    };
  };

  const ImageSelectOption = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        color: colors.secondary,
      }}
    >
      <div style={{ margin: "10px", cursor: "pointer" }}>
        <PlusCircleOutlined
          style={{ fontSize: "1.4rem" }}
          onClick={() => setDisplayImageUploader(true)}
        />
      </div>
      <div>Select Bg Image</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(17,145,255,0.01)",
      }}
    >
      {info && <Info show info={getInfo()} pos={getInfoPos()} />}
      <div
        style={{
          cursor: isCloserToClose
            ? `url(${process.env.PUBLIC_URL}/statics/Icons/penClose.svg) 0 20, auto`
            : getCursor(),
          height: "600px",
          width: "1200px",
        }}
        id="canvas"
        className="svgContainer custom_scroll"
        ref={canRef}
      >
        {loadingBg && <Loading left="40%" />}

        {bgSrc ? (
          <svg
            visibility={loadingBg ? "hidden" : "visible"}
            style={{
              // backgroundImage: `url(${bgSrc})`,
              ...styles.svgStyle,
            }}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClickCapture={handleMouseDown}
            onAuxClick={(e) => {
              setContextMenuPosition(false);
              setSelectedItem(false);
            }}
            fill="none"
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1200 600"
          >
            <image
              onLoadStart={() => setLoadingBg(true)}
              onLoad={() => setLoadingBg(false)}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              xlinkHref={bgSrc}
            />
            {paths.length > 0 ? (
              paths.map((frame) => (
                <Path
                  co={isLast(frame) ? co : frame.co}
                  tempEnd={isLast(frame) ? tempEnd : frame.tempEnd}
                  key={frame.id}
                  frame={frame}
                  handleItemSelect={handleItemSelect}
                  isSelected={frame.id === selectedItem.id}
                  isFreeView={isFreeView}
                  setInfo={setInfo}
                  setCurrentFrameId={setCurrentFrameId}
                  isAdjustView={
                    frame.id === selectedItem.id && currentTool === "adjust"
                  }
                  isTour={isTour}
                  setCo={setCo}
                  ContextMenuPosition={ContextMenuPosition}
                  canRef={canRef}
                  setPaths={setPaths}
                  paths={paths}
                />
              ))
            ) : (
              <Path co={co} tempEnd={tempEnd} frame={{ id: 0, status: 0 }} />
            )}
          </svg>
        ) : isTour ? (
          <div>Nothing Here</div>
        ) : (
          <ImageSelectOption />
        )}
      </div>
    </div>
  );
}

export default Frame;
