import React, { useRef, useState } from "react";
import { colors, sizes } from "../utility";
import { WarningOutlined } from "@ant-design/icons";

import "./components.css";

function InputUnderline({
  text = "Enter Here",
  type = "text",
  value,
  setValue,
  error = true,
  setError,
  minWidth = window.innerWidth < 900 ? "100%" : "400px",
}) {
  const [placeholderStyle, setPlaceholderStyle] = useState({});
  const inputRef = useRef();

  let handleOnFocus = () => {
    setError(false);
    setPlaceholderStyle({
      fontSize: sizes.small,
      fontWeight: 400,
      bottom: "100%",
      transform: "translateY(100%)",
    });

    // inputRef.current.style.border = "none";
  };

  let handleOnBlur = (element) => {
    if (element.target.value.length === 0) setPlaceholderStyle({});
    else
      setPlaceholderStyle({
        fontSize: sizes.small,
        bottom: "100%",
        transform: "translateY(100%)",
      });
    inputRef.current.style.borderColor = "rgba(0,0,0,0.1)";
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "20px",
        minWidth: minWidth,
      }}
    >
      <label
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: "-1",
          padding: "10px",
          fontSize: sizes.regular,
          color: "black",
          ...placeholderStyle,
          transition: "300ms cubic-bezier(0.46, 0.03, 0.52, 0.96)",
        }}
        className="placeholder"
      >
        {text}
      </label>
      <input
        type={type}
        style={{
          fontSize: sizes.regular,
          fontWeight: 400,
          width: "100%",
          padding: "30px 0px 10px 10px",
          border: "none",
          borderBottom: error
            ? "2px solid tomato"
            : "2px solid rgba(0,0,0,0.1)",
          backgroundColor: "transparent",
          color: "black",
        }}
        onFocusCapture={handleOnFocus}
        onBlur={handleOnBlur}
        ref={inputRef}
        value={value}
        onChange={(val) => setValue(val.target.value)}
      ></input>
      {error && (
        <>
          <span
            style={{
              position: "absolute",
              top: "40%",
              left: "0px",
              transform: "translateX(-100%)",
              opacity: "0.6",
            }}
          >
            <WarningOutlined style={{ color: "red" }} />
          </span>

          <div
            style={{
              position: "absolute",
              padding: "0px 10px",
              color: "tomato",
              opacity: "0.8",
              width: "fit-content",
              fontSize: "15px",
            }}
          >
            {error}
          </div>
        </>
      )}
    </div>
  );
}

export default InputUnderline;
