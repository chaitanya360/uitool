import React from "react";

function SelectedPathId({ isSliderCollapsed, selectedItem }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.8)",
        padding: "0px 10px",
        margin: "20px 0px",
      }}
    >
      {!isSliderCollapsed && (
        <>
          <div style={{ fontSize: "14px" }}>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "15px 20px",
              }}
            >
              Selected Path Id
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "10px 20px 15px 20px",
              }}
            >
              {selectedItem.id}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectedPathId;
