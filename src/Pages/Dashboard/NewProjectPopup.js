import React, { useState, useContext } from "react";
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

function NewProjectPopup({ setBtnClicked }) {
  const { setUser } = useContext(AuthContext);

  const [projectName, setProjectName] = useState("");
  const { setErrorMsg } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleCreateNewProject = async () => {
    // let token = await getNewToken();
    setLoading(true);
    const frames = JSON.stringify(initialFrameValues);
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

  return (
    <div className="new_project_wrapper">
      <div className="new_project_container">
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
              style={{ width: "40vw", height: "auto", maxWidth: "300px" }}
              src={`${process.env.PUBLIC_URL}/statics/Images/new_project.png`}
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
              >
                Add Thumbnail Image
              </Button>
              <Button className="publish_btn" onClick={handleCreateNewProject}>
                Publish
              </Button>
              <Button className="cancel_btn" type="text">
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
