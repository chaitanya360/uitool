import React, { useState } from "react";
import "./components.css";
import UploadImage from "./UploadImage";
import { Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;
const getId = () => new Date().getTime();

function NewFramePopup({
  addNewFrame,
  show,
  setShow,
  selectedItemState,
  paths,
}) {
  const [shouldDisplayUploadPopup, setShouldDisplayUploadPopup] =
    useState(false);
  const [bgImg, setBgImg] = useState(defaultBgImage);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const selectedItem = selectedItemState[0];

  const { TextArea } = Input;

  const handleAddNewFrame = () => {
    const newFrameId = getId();
    addNewFrame(name, description, bgImg, newFrameId);
    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        // setting target frame id
        frame.clickProps = { ...frame.clickProps, targetFrameId: newFrameId };
      }
    });

    setBgImg(defaultBgImage);
    setName("");
    setDescription("");
  };

  return (
    show && (
      <div
        className="black_bg_wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadImage
          shouldDisplay={shouldDisplayUploadPopup}
          setImg={setBgImg}
          setShouldDisplay={setShouldDisplayUploadPopup}
          onImageChanged={() => setShouldDisplayUploadPopup(false)}
        />
        <form>
          <div
            style={{
              width: "500px",
              zIndex: 3,
              backgroundColor: "white",
              boxShadow: "2px 2px 2px rgba(0,0,0,0.4)",
              height: "fit-content",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "16px",
              padding: "30px 0px",
            }}
            className="animate__animated animate__fadeInDownBig animate__delay-0s animate__faster"
          >
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                margin: "20px",
              }}
            >
              <CloseCircleOutlined
                style={{ fontSize: "20px" }}
                onClick={() => setShow(false)}
              />
            </div>

            <h3 style={{}}>New Frame</h3>
            {/* <UploadImage shouldDisplay /> */}
            <div style={{ width: "70%", margin: "10px 0px" }}>
              <div style={{ margin: "10px 0" }}>Frame Name</div>
              <Input
                placeholder="New Frame"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ width: "70%", margin: "10px 0px" }}>
              <div style={{ margin: "10px 0" }}>Frame Description</div>
              <TextArea
                placeholder="This is New Frame"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div style={{ width: "70%", margin: "20px 0px" }}>
              <div style={{ margin: "10px 0" }}>Default Background Image</div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "140px",
                    display: "block",
                  }}
                >
                  <img
                    src={bgImg}
                    height="100%"
                    width="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Button
                  type="link"
                  ghost
                  style={{ fontSize: "12px", padding: "0 10px" }}
                  onClick={() => setShouldDisplayUploadPopup(true)}
                >
                  Select New Image
                </Button>
              </div>
            </div>
            <div style={{ width: "70%" }}>
              <Button
                type="primary"
                style={{ marginTop: "30px" }}
                onClick={handleAddNewFrame}
              >
                Add Frame
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  );
}

export default NewFramePopup;
