import React from "react";
import { colors } from "../../utility";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getChildType } from "../../utility/functions";

const Title = ({
  element,
  currentFrameId,
  setCurrentFrameId,
  handleAddNewBtnClicked,
  setShowDeletePagePopup,
}) => {
  return (
    <div
      style={{
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "3px",
        color: element.key === currentFrameId ? colors.white : "inherit",
        backgroundColor:
          element.key === currentFrameId ? colors.primary : "inherit",
      }}
    >
      <span
        className="tree_title"
        onClick={() => setCurrentFrameId(element.key)}
        style={{
          padding: "0px 10px",
          maxWidth: "100px",
          whiteSpace: "nowrap",
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          // margin: "1px 0px",
        }}
      >
        {element.title}
      </span>
      <PlusCircleOutlined
        style={{
          margin: "0px 5px",
          display: element.type === "flat" ? "none" : "inline-block",
        }}
        className="new_btn_icon"
        onClick={() => handleAddNewBtnClicked(element.type, element.key)}
        onMouseEnter={(e) => e.preventDefault()}
        title={"Add new " + getChildType(element.type)}
      />
      <DeleteOutlined
        title="Delete Page"
        style={{
          margin: "0px 5px",
          display:
            element.type === "tower" || element.key !== currentFrameId
              ? "none"
              : "inline-block",
        }}
        className="delete_btn_icon"
        onClick={() =>
          setShowDeletePagePopup({ name: element.title, id: element.key })
        }
      />
    </div>
  );
};

export default Title;
