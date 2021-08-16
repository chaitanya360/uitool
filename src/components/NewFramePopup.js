import React, { useState } from "react";
import "./components.css";
import UploadImage from "./UploadImage";
import { Input, Button, Dropdown, Menu } from "antd";
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import TypeSelector from "./TypeSelector";

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;
const getId = () => new Date().getTime();

const styles = {
  form: {
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
    position: "relative",
  },
};
function NewFramePopup({
  addNewFrame,
  show,
  setShow,
  selectedItemState,
  paths,
  newPageFormDetails,
  Frames,
}) {
  const [shouldDisplayUploadPopup, setShouldDisplayUploadPopup] =
    useState(false);
  const [bgImg, setBgImg] = useState(defaultBgImage);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = selectedItemState;

  const [selectedType, setSelectedType] = useState("flat");

  const { TextArea } = Input;
  const handleAddNewFrame = () => {
    if (name.length === 0) return alert("Enter Name");
    const newFrameId = getId();
    console.log(newPageFormDetails.parentKey);
    if (newPageFormDetails.type)
      addNewFrame(
        name,
        description,
        bgImg,
        newFrameId,
        newPageFormDetails.type,
        newPageFormDetails.parentKey
      );
    else addNewFrame(name, description, bgImg, newFrameId, selectedType);

    let tempPaths = paths;

    tempPaths.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        // setting target frame id
        frame.clickProps = { ...frame.clickProps, targetFrameId: newFrameId };
      }
    });
    setSelectedItem(false);
    setBgImg(defaultBgImage);
    setName("");
    setDescription("");
  };

  const type = newPageFormDetails
    ? newPageFormDetails.type[0].toUpperCase() +
      newPageFormDetails.type.substring(1)
    : selectedType
    ? selectedType
    : "Page";

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
        <form
          style={styles.form}
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

          <h3>
            New {type}
            {}
          </h3>

          <div style={{ width: "70%", margin: "10px 0px" }}>
            {!newPageFormDetails && (
              <TypeSelector
                Frames={Frames}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            )}
            <div style={{ margin: "10px 0" }}>
              {type + " "}
              Name
            </div>
            <Input
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              color="red"
            />
          </div>
          <div style={{ width: "70%", margin: "10px 0px" }}>
            <div style={{ margin: "10px 0" }}>
              {type + " "}
              Description
            </div>
            <TextArea
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              color="red"
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
              style={{ marginTop: "0px" }}
              onClick={handleAddNewFrame}
            >
              Add
              {" " + type}
            </Button>
          </div>
        </form>
      </div>
    )
  );
}

export default NewFramePopup;
