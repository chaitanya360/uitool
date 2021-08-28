import React, { useState } from "react";
import { PageDetailsFormStyle } from "./molecules.style";
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

function PageDetailsForm(props) {
  const [features, setFeatures] = useState(["one"]);
  return (
    <PageDetailsFormStyle>
      <div className="wrapper">
        <form>
          <CloseCircleOutlined className="close-btn" />
          <h3 className="title">Page Details</h3>
          <div className="body">
            <div className="image-section">
              <div className="image-wrapper">
                <img
                  // src={bgImg}
                  height="100%"
                  width="100%"
                />
              </div>
              <Button
                type="link"
                ghost
                className="new-img-btn"
                // onClick={() => setShouldDisplayUploadPopup(true)}
              >
                Select New Image
              </Button>
            </div>
            <div className="right-section">
              <div className="name-container">
                <span>Title</span>
                <Input
                  className="input"
                  placeholder="Name"
                  required
                  color="black"
                />
              </div>
              <div className="features-section">
                <span>Features</span>
                <div className="features">
                  {features.map((feature, index) => (
                    <Input value={feature} className="feature" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageDetailsFormStyle>
  );
}

export default PageDetailsForm;
