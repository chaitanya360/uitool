import React, { useEffect, useState } from "react";
import { DeletepopupStyle } from "./components.style";
import { CloseCircleOutlined } from "@ant-design/icons";

function DeletePopup({
  showPopup,
  setShowPopup,
  handleDeletePage,
  isProject = false,
}) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName("");
  }, showPopup);

  const deleteItemName = showPopup.name;

  return (
    <div className="black_bg_wrapper">
      <DeletepopupStyle
        delete_active={name === deleteItemName}
        className="animate__animated animate__fadeInDownBig animate__delay-0s animate__faster"
      >
        <CloseCircleOutlined
          className="close-btn"
          onClick={() => setShowPopup(false)}
        />
        <div className="title">Delete {isProject ? "Project" : "Page"}</div>
        <div className="content">
          <label for="page-name">
            ReEnter {isProject ? "Project" : "Page"} Name to Confirm
          </label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="btn-container">
            <button
              className="del"
              disabled={name !== deleteItemName}
              onClick={handleDeletePage}
            >
              Delete
            </button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      </DeletepopupStyle>
    </div>
  );
}

export default DeletePopup;
