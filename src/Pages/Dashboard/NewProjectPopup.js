import React, { useState, useContext, useEffect } from "react";
import { Button } from "antd";
import InputUnderline from "../../components/InputUnderline";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getNewToken } from "../../api/users";
import { initialFrameValues } from "../../utility/data";
import storage from "../../api/storage";
import { addProject } from "../../api/projects";
import ErrorMessage from "../../components/ErrorMessage";
import ErrorContext from "../../context/ErrorContext";
import AuthContext from "../../context/AuthContext";
import { colors } from "../../utility";
import Loading from "../../components/Loading";
import UploadImage from "../../components/UploadImage";

function NewProjectPopup({ setBtnClicked }) {
  const { setUser } = useContext(AuthContext);

  const [projectName, setProjectName] = useState("");
  const { setErrorMsg } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const [displayImageUploaderPopup, setDisplayImageUploaderPopup] =
    useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(false);

  const handleCreateNewProject = async () => {
    if (projectName.length === 0) {
      setErrorMsg("Please Enter Valid Project Name");
      return;
    }
    // let token = await getNewToken();
    setLoading(true);

    let newFrame = initialFrameValues;
    if (thumbnailSrc) newFrame[0].thumbnailImg = thumbnailSrc;
    const frames = JSON.stringify(newFrame);
    const token = storage.getToken();

    addProject(projectName, frames, token).then((response) => {
      if (response.ok) {
        if (response.data.status) {
          // rerender dashboard projects
          setUser(storage.getUser());
          setBtnClicked(false);
        } else setErrorMsg("Failed To add New project, Try login again");
      }
      setLoading(false);
    });
  };

  const handleAddThumbnail = () => {
    setDisplayImageUploaderPopup(true);
  };

  return (
    <div className="new_project_wrapper">
      {loading && <Loading />}
      <UploadImage
        setImg={setThumbnailSrc}
        shouldDisplay={displayImageUploaderPopup}
        setShouldDisplay={setDisplayImageUploaderPopup}
        onImageChanged={() => {
          setDisplayImageUploaderPopup(false);
        }}
      />
      <div className="new_project_container animate__animated animate__flipInX animate__delay-0s animate__faster">
        <div className="new_project_header">
          <div>New Project</div>
          <div
            className="new_project_close_btn"
            onClick={() => setBtnClicked(false)}
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <div className="new_project_body">
          <div className="illustration_container">
            <img
              style={{
                height: "auto",
                width: "320px",
                borderRadius: "4px",
                height: "200px",
                border: `2px solid ${colors.primary}`,
                objectFit: "cover",
              }}
              src={
                thumbnailSrc
                  ? thumbnailSrc
                  : `${process.env.PUBLIC_URL}/statics/Images/new_project.png`
              }
            />
          </div>
          <div>
            <form className="new_project_form">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ opacity: 0.9, fontWeight: 500 }}>
                  Project Name
                </label>
                <input
                  style={{
                    marginBottom: "20px",
                    marginTop: "8px",
                    color: colors.primary,
                    fontWeight: 500,
                  }}
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                />
              </div>
              <Button
                type="text"
                icon={<PlusCircleOutlined style={{ fontSize: "1.1rem" }} />}
                className="thumbnail_btn"
                onClick={handleAddThumbnail}
              >
                {thumbnailSrc ? "Change" : "Add"} Thumbnail Image
              </Button>
              <Button className="publish_btn" onClick={handleCreateNewProject}>
                Publish
              </Button>
              <Button
                className="cancel_btn"
                type="text"
                onClick={() => setBtnClicked(false)}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProjectPopup;
