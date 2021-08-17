import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { colors } from "../../utility";
import { Link, Redirect, useHistory } from "react-router-dom";

function ProjectCard({
  name,
  id,
  src,
  setDeleteProjectPopup,
  setDisplayImageUploader,
  handleFocusCapture,
  setRenameProjectPopup,
}) {
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  const [imgScale, setImgScale] = useState(1);
  const history = useHistory();
  return (
    <div onMouseEnter={handleFocusCapture}>
      <div
        className="project_card_body"
        onClick={() => history.push(`/workspace/${id}`)}
        onMouseEnter={() => setImgScale(1.2)}
        onMouseLeave={() => setImgScale(1)}
      >
        <div
          style={{
            width: "100%",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3px",
              objectFit: "cover",
              visibility: loadingThumbnail ? "hidden" : "visible",
              transform: `scale(${imgScale})`,
              transition: "transform 200ms linear",
            }}
            className="project-thumb"
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
              fontSize: "1.2rem",
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 1rem",
              paddingLeft: "0.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteOutlined
              className="project-icon"
              style={{ color: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteProjectPopup({ name });
              }}
            />
            <EditOutlined
              className="project-icon"
              onClick={(e) => {
                e.stopPropagation();
                setRenameProjectPopup({ name });
              }}
            />
            <FileImageOutlined
              className="project-icon"
              onClick={(e) => {
                e.stopPropagation();
                setDisplayImageUploader(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
