import React from "react";
import Lottie from "react-lottie";
import loadingSVG from "./loading.json";

function Loading({ left = "50%", top = "50%" }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingSVG,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        zIndex: 999,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Lottie
        style={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          left,
          top,
        }}
        options={defaultOptions}
        height={200}
        width={200}
        isClickToPauseDisabled
      />
    </div>
  );
}

export default Loading;
