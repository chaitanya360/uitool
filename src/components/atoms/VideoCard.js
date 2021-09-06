import React, { useEffect, useState } from "react";
import { VideoCardStyle } from "./atoms.style";

function VideoCard({ src }) {
  console.log(src);
  return (
    <VideoCardStyle>
      <div className="img_container">
        <img
          muted
          id={src}
          src={`${process.env.PUBLIC_URL}/statics/gifs/${src}.gif`}
        />
      </div>
    </VideoCardStyle>
  );
}

export default VideoCard;
