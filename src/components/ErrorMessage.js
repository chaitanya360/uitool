import React, { useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

function ErrorMessage({ errorMsg, setErrorMsg }) {
  let timeOutId;
  useEffect(() => {
    timeOutId = setTimeout(() => setErrorMsg(false), 4000);
  }, [errorMsg]);
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
