import React from "react";
import { Link } from "react-router-dom";
import VideoCard from "../../components/VideoCard";
import { colors, sizes } from "../../utility";

function landing(props) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: "30px", color: colors.font_medium }}>
          Welcome to UI Tool
        </h1>
        <div
          style={{
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#107AE4",
              color: "white",
              fontSize: sizes.regular,
              padding: "5px 20px",
              borderRadius: "3px",
              fontWeight: "normal",
            }}
          >
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Create New
            </Link>
          </div>
          <div style={{ margin: "10px" }}>
            New Here ?
            <span style={{ margin: "0px 5px", color: "dodgerblue" }}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </span>
          </div>
        </div>

        <div style={{ width: "100%", marginTop: "50px" }}>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <h3
              style={{
                color: colors.font_medium,
                textAlign: "center",
              }}
            >
              How to Use?
            </h3>
            <span>(Move pointer on the images to play video)</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "0px",
              marginTop: "30px",
            }}
          >
            <VideoCard
              number={1}
              src="draw.mp4"
              text="Draw your paths using draw tool"
            />

            <VideoCard
              number={2}
              src="select1.mp4"
              text="Select Paths for which you want to add interactions using select tool and Set Background color and information when mouse pointer is over the path using on Mouse over Option "
            />
            <VideoCard
              number={3}
              src="free1.mp4"
              text="Select free tool To view interactions you made"
            />

            <VideoCard
              number={4}
              src="select2.mp4"
              text="Open new page when clicked on the path using on Mouse click Option"
            />
            <VideoCard
              number={5}
              src="free2.mp4"
              text="Again Select free tool to navigate to the pages use just set"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default landing;
