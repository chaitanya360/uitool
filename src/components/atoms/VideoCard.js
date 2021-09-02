import React, { useEffect, useState } from "react";
import { VideoCardStyle } from "./atoms.style";

function VideoCard({ src }) {
  console.log(src);
  return (
    <VideoCardStyle>
      <video muted loop autoPlay id={src}>
        <source
          src={`${process.env.PUBLIC_URL}/statics/videos/${src}.mp4`}
          type="video/mp4"
        />
      </video>
    </VideoCardStyle>
  );
}

export default VideoCard;
