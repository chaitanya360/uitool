import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

function ErrorMessage({ errorMsg, setErrorMsg }) {
  return (
    <div
      className="error_container"
      style={{
        height: errorMsg ? "50px" : 0,
      }}
    >
      <div className="error_close">
        <CloseCircleOutlined
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={() => setErrorMsg(false)}
        />
      </div>
      <div>{errorMsg}</div>
    </div>
  );
}

export default ErrorMessage;