import React, { useState } from "react";
import { PageDetailsFormStyle } from "./molecules.style";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Input, Button, Dropdown, Menu } from "antd";
import UploadImage from "../UploadImage";
import { statusValuesList } from "../../utility/data";
import { firstUpper } from "../../utility/functions";

const getId = () => new Date().getTime();

function PageDetailsForm({
  setShow,
  isNewPage = true,
  addNewPage,
  parentId,
  project_id,
  pageType,
  page_for_editing_details,
  handleSaveDetails,
}) {
  //  this is only need for editing exting page
  let details = false;
  let BgImg = false;

  //  this is only need for editing exting page
  if (page_for_editing_details) {
    details = page_for_editing_details.details;
    BgImg = page_for_editing_details.bgImg;
  }

  const [features, setFeatures] = useState(details ? details.features : [""]);
  const [pageTitle, setPageTitle] = useState(details ? details.title : "");
  const [status, setStatus] = useState(details ? details.status : "Available");
  const [bgImg, setBgImg] = useState(BgImg ? BgImg : false);
  const [showImageUploader, setShowImageUploader] = useState(false);

  const setFeatureValue = (index, value) => {
    setFeatures((features) => {
      let newFeatures = features;
      newFeatures[index] = value;
      return newFeatures;
    });
  };

  const handleAddNewFeature = () => {
    setFeatures((features) => [...features, ""]);
  };

  const handleDeleteFeature = (index) => {
    setFeatures((features) => {
      let newFeatures = [];
      for (let i = 0; i < features.length; i++)
        if (i != index) newFeatures.push(features[i]);
      return newFeatures;
    });
  };

  const handleImageChanged = () => {
    setShowImageUploader(false);
    console.log("image upload succes");
  };

  const handleSave = () => {
    if (pageTitle.length === 0) {
      alert("Title Cannot be Empty");
      return;
    }
    // 1. features needs to be preprocessed removed empty feature

    // preprocessing features
    let _features = [];
    for (let i = 0; i < features.length; i++)
      if (features[i].length !== 0) _features.push(features[i]);

    handleSaveDetails(page_for_editing_details.id, pageTitle, features, status);
  };

  const handleAddNewPage = () => {
    if (pageTitle.length === 0) {
      alert("Title Cannot be Empty");
      return;
    }
    let _features = [];
    for (let i = 0; i < features.length; i++)
      if (features[i].length !== 0) _features.push(features[i]);

    console.log("this page will be added");
    const pageId = getId();

    addNewPage(pageTitle, bgImg, pageId, pageType, parentId, {
      features: _features,
      status,
      title: pageTitle,
    });
  };

  const FeatureInput = ({ value, handleBlur, index }) => {
    const [_value, setValue] = useState(value);
    return (
      <Input
        value={_value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => handleBlur(index, _value)}
      />
    );
  };

  const DropdownMenu = () => {
    return (
      <Menu onClick={(e) => setStatus(e.key)}>
        {statusValuesList.map((status) => (
          <Menu.Item key={status}>{status}</Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <PageDetailsFormStyle>
      {showImageUploader && (
        <UploadImage
          project_id={project_id}
          setImg={setBgImg}
          setShouldDisplay={setShowImageUploader}
          onImageChanged={handleImageChanged}
        />
      )}
      <div className="wrapper">
        <div className="animate__animated animate__fadeInDownBig animate__delay-0s animate__faster">
          <form>
            <CloseCircleOutlined
              className="close-btn"
              onClick={() => setShow(false)}
            />
            <h3 className="title">{firstUpper(pageType)} Details</h3>
            <div className="body">
              <div className="image-section">
                <div className="image-wrapper">
                  <img src={bgImg} height="100%" width="100%" />
                </div>
                {isNewPage && (
                  <Button
                    type="link"
                    ghost
                    className="new-img-btn"
                    onClick={() => setShowImageUploader(true)}
                  >
                    Select New Image
                  </Button>
                )}
              </div>
              <div className="right-section">
                <div className="name-container">
                  <span>Title</span>
                  <Input
                    className="input"
                    placeholder="Name"
                    required
                    color="black"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                  />
                </div>
                <div className="status-container">
                  <span>Status</span>
                  <Dropdown
                    overlay={DropdownMenu()}
                    trigger={["click"]}
                    className="drop-down"
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {status} <DownOutlined />
                    </a>
                  </Dropdown>
                </div>
                <div className="features-section">
                  <div>
                    <span>Features</span>
                  </div>
                  <div className="features custom_scroll">
                    {features.map((feature, index) => (
                      <div className="feature-container">
                        <FeatureInput
                          value={feature}
                          index={index}
                          handleBlur={setFeatureValue}
                        />
                        <DeleteOutlined
                          onClick={() => handleDeleteFeature(index)}
                          className="delete-feature"
                        />
                      </div>
                    ))}
                    <Button type="link" className="new-feature-btn">
                      <PlusCircleOutlined />
                      <span onClick={handleAddNewFeature}>Add New Feature</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {isNewPage ? (
              <div className="save-btn" onClick={handleAddNewPage}>
                Add {firstUpper(pageType)}
              </div>
            ) : (
              <div className="save-btn" onClick={handleSave}>
                Save Details
              </div>
            )}
          </form>
        </div>
      </div>
    </PageDetailsFormStyle>
  );
}

export default PageDetailsForm;
