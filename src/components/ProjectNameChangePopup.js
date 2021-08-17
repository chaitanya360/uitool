import React, { useEffect, useState } from "react";
import { NamePopupStyle } from "./components.style";
import { CloseCircleOutlined } from "@ant-design/icons";
import { colors } from "../utility";

function ProjectNameChangepopup({
  showPopup,
  setShowPopup,
  handleProjectNameChange,
}) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName("");
  }, showPopup);

  const projectName = showPopup.name;

  return (
    <div className="black_bg_wrapper">
      <NamePopupStyle
        delete_active={name.length >= 2}
        className="animate__animated animate__fadeInDownBig animate__delay-0s animate__faster"
      >
        <CloseCircleOutlined
          className="close-btn"
          onClick={() => setShowPopup(false)}
        />
        <div className="title">Change Name</div>
        <div className="content">
          <label for="page-name">
            Enter New Name for{" "}
            <span style={{ color: colors.secondary }}>{projectName}</span>
          </label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="btn-container">
            <button
              className="change"
              disabled={name.length < 2}
              onClick={() => handleProjectNameChange(name)}
            >
              Change
            </button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      </NamePopupStyle>
    </div>
  );
}

export default ProjectNameChangepopup;
