import React, { useState } from "react";
import UploadImage from "./UploadImage";
import AlertBox from "./AlertBox";
import NewFramePopup from "./NewFramePopup";

function Popups({
  setBgImg,
  setCurrentTool,
  deleteAlertState,
  imgeChangeAlertState,
  selectedItemState,
  displayImageUploaderState,
  displayNewFramePopupState,
  addNewFrame,
  pathsState,
}) {
  const [displayImageUploader, setDisplayImageUploader] =
    displayImageUploaderState;
  const [showDeleteAlert, setShowDeleteAlert] = deleteAlertState;
  const [showImgChangeAlert, setshowImgChangeAlert] = imgeChangeAlertState;
  const [displayNewFramePopup, setDisplayNewFramePopup] =
    displayNewFramePopupState;
  const [selectedItem, setSelectedItem] = selectedItemState;
  const [paths, setPaths] = pathsState;

  function deletePath() {
    setPaths((old) => [
      ...old.filter((frame) => frame.id !== selectedItem.id),
      {
        co: [{ x: 0, y: 0 }],

        tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
        id: "temp",
      },
    ]);

    setSelectedItem(false);
  }

  return (
    <>
      <NewFramePopup
        show={displayNewFramePopup}
        setShow={setDisplayNewFramePopup}
        addNewFrame={addNewFrame}
        setCurrentTool={setCurrentTool}
        selectedItemState={selectedItemState}
        paths={paths}
      />
      <UploadImage
        setImg={setBgImg}
        shouldDisplay={displayImageUploader}
        setShouldDisplay={setDisplayImageUploader}
        onImageChanged={() => {
          setDisplayImageUploader(false);
          setCurrentTool(false);
        }}
      />

      <AlertBox
        show={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        message={"Are you sure to delete"}
        autoClose={false}
        variant={"danger"}
        handleYes={() => {
          setShowDeleteAlert(false);
          setCurrentTool(false);

          deletePath();
        }}
        handleNo={() => {
          setShowDeleteAlert(false);
          setCurrentTool(false);
        }}
      />

      <AlertBox
        width="350px"
        show={showImgChangeAlert}
        onClose={() => setshowImgChangeAlert(false)}
        message={"Changing Image Would Remove Paths, Still want to change?"}
        autoClose={false}
        variant={"danger"}
        handleYes={() => {
          setshowImgChangeAlert(false);
          setCurrentTool(false);
          setDisplayImageUploader(true);
          setPaths([]);
        }}
        handleNo={() => {
          setshowImgChangeAlert(false);
          setCurrentTool(false);
        }}
      />
    </>
  );
}

export default Popups;
