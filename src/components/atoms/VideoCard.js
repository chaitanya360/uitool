import React, { useEffect, useState } from "react";
import { VideoCardStyle } from "./atoms.style";

function VideoCard({ src }) {
  console.log(src);
  return (
    <VideoCardStyle>
      <img
        muted
        id={src}
        src={`${process.env.PUBLIC_URL}/statics/gifs/draw.gif`}
      />
    </VideoCardStyle>
  );
}

export default VideoCard;
