import React from "react";
import { RgbaStringColorPicker } from "react-colorful";

function ColorPicker({ bgColor, handleOnMouseOverValuesChange }) {
  return (
    <>
      <div
        style={{
          padding: "10px 40px",
          height: "50px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            height: "20px",
            width: "20px",
            border: "1px solid blue",
            backgroundColor: "white",
            margin: "0px 10px",
            padding: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              height: "100%",
              width: "100%",
              transform: "scale(1.1)",

              backgroundColor: bgColor,
              margin: 0,
            }}
          />
        </span>
        selected color
      </div>
      <section
        className="color-picker"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "scale(0.9)",
        }}
      >
        <RgbaStringColorPicker
          color={"rgba(255,255,255,1)"}
          onChange={(color) => {
            handleOnMouseOverValuesChange("color", color);
            // console.log(selectedItem);
          }}
        />
      </section>
    </>
  );
}

export default ColorPicker;
