import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { colors } from "../../utility";
import { Link, Redirect } from "react-router-dom";
function ProjectCard({ name, id, src }) {
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  return (
    <Link
      to={`/workspace/${id}`}
      params={id}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="project_card_body">
        <div
          style={{
            width: "100%",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3px",
              objectFit: "cover",
              visibility: loadingThumbnail ? "hidden" : "visible",
            }}
            onLoadStart={() => setLoadingThumbnail(true)}
            onLoad={() => setLoadingThumbnail(false)}
            src={src}
          />
          <div
            className="thumnail-loader"
            style={{ display: loadingThumbnail ? "block" : "none" }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "10px",
            paddingBottom: "0px",
          }}
        >
          <div
            style={{
              flex: "1",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SettingOutlined style={{ fontSize: "1.3rem", color: "inherit" }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
