import React, { useRef, useState } from "react";
import { Progress } from "antd";

function VideoCard({
  text = "Set Background color and information when mouse pointer is over the path using on Mouse over Option ",
  src = "draw.mp4",
  number = "1",
  width = "100%",
}) {
  const videoRef = useRef();
  const [videoPercentPlay, setVideoPercentPlay] = useState(0);

  let intervalId;

  const handleOnMouseEnter = (e) => {
    videoRef.current.play();
    intervalId = setInterval(() => setVideoPercentPlay(getPercent()), 20);
  };

  const handleOnMouseLeave = (e) => {
    videoRef.current.pause();
    clearInterval(intervalId);
  };

  const getPercent = () => {
    if (videoRef.current) {
      let total = videoRef.current.duration;
      let current = videoRef.current.currentTime;
      return (current / total) * 100;
    } else return 0;
  };

  return (
    <div
      style={{
        padding: "10px 10px 0px 10px",
        backgroundColor: "white",
        margin: "20px",
        borderRadius: "3px",
        color: "#000520",
        fontWeight: "500",
        boxShadow: "1px 2px 2px 1px grey",
        border: "1px solid black",
        maxWidth: "900px",
        width: width,
      }}
    >
      <div style={{ display: "flex" }}>
        <span
          style={{
            backgroundColor: "dodgerblue",
            color: "white",
            height: "fit-content",
            width: "fit-content",
            padding: "0px 10px",
            display: "inline-block",
            borderRadius: "50%",
            margin: "0px 0px",
            border: "1px solid white",
          }}
        >
          {number}
        </span>
        <span style={{ width: "100%", textAlign: "center" }}>{text}</span>
      </div>
      <Progress
        strokeLinecap="butt"
        percent={videoPercentPlay}
        showInfo={false}
        status="normal"
        style={{ transform: "translateY(10px)" }}
      />
      <div>
        <video
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          muted
          ref={videoRef}
          autoPlay={false}
          src={`${process.env.PUBLIC_URL}/statics/Videos/${src}`}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

export default VideoCard;
