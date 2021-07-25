import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CloseCircleOutlined,
  CopyOutlined,
  CopyTwoTone,
} from "@ant-design/icons";
import { Tooltip } from "antd";
function PublishedTagline({
  visible = true,
  setVisible,
  projectId = "somewhere",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const baseUrl = window.location.origin;
  const URL = `${baseUrl}/project/${projectId}/tour`;
  return (
    <>
      <div
        className="publish_container"
        style={{ height: visible ? "60px" : 0 }}
      >
        <div className="public_close">
          <CloseCircleOutlined
            style={{ fontSize: "1.3rem", cursor: "pointer" }}
            onClick={() => setVisible(false)}
          />
        </div>
        <div>You Site Is publically available on Url</div>
        <div className="publish_link_wrapper">
          <input id="published_link" href={URL} defaultValue={URL} />
          <div>
            {copied ? (
              <CopyTwoTone onClick={handleCopy} />
            ) : (
              <Tooltip overlay="copy link">
                <CopyToClipboard text={URL}>
                  <CopyOutlined onClick={handleCopy} />
                </CopyToClipboard>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      {visible && (
        <div
          className="publish_container_wrapper"
          onClick={() => setVisible(false)}
        />
      )}
    </>
  );
}

export default PublishedTagline;
