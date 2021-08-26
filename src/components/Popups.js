import React, { useState } from "react";
import UploadImage from "./UploadImage";
import AlertBox from "./AlertBox";
import NewFramePopup from "./NewFramePopup";
import DeletePopup from "./DeletePopup";

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
  setContextMenuPosition,
  newPageFormDetails,
  Frames,
  setDisplayDeletePagePopup,
  displayDeletePagePopup,
  handleDeletePage,
  project_id,
  handleImageChangeSuccess,
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
    setPaths((old) => [...old.filter((frame) => frame.id !== selectedItem.id)]);
    setSelectedItem(false);
  }

  return (
    <>
      {displayNewFramePopup && (
        <NewFramePopup
          show={displayNewFramePopup}
          setShow={setDisplayNewFramePopup}
          addNewFrame={addNewFrame}
          selectedItemState={selectedItemState}
          paths={paths}
          newPageFormDetails={newPageFormDetails}
          Frames={Frames}
          project_id={project_id}
        />
      )}
      {displayImageUploader && (
        <UploadImage
          project_id={project_id}
          setImg={setBgImg}
          setShouldDisplay={setDisplayImageUploader}
          onImageChanged={handleImageChangeSuccess}
        />
      )}

      <AlertBox
        show={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        message={"Are you sure to delete"}
        autoClose={false}
        variant={"danger"}
        handleYes={() => {
          setContextMenuPosition(false);
          setShowDeleteAlert(false);
          setCurrentTool("draw");
          setSelectedItem(false);
          deletePath();
        }}
        handleNo={() => {
          setShowDeleteAlert(false);
          setCurrentTool("draw");
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
      {displayDeletePagePopup && (
        <DeletePopup
          handleDeletePage={handleDeletePage}
          setShowPopup={setDisplayDeletePagePopup}
          showPopup={displayDeletePagePopup}
        />
      )}
    </>
  );
}

export default Popups;
