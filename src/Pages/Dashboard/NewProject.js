import React, { useContext, useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addProject } from "../../api/projects";
import { getNewToken } from "../../api/users";
import { initialFrameValues } from "../../utility/data";
import storage from "../../api/storage";
import ErrorMessage from "../../components/ErrorMessage";
import ErrorContext from "../../context/ErrorContext";
import Loading from "../../components/Loading";

function NewProject(props) {
  const [projectName, setProjectName] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);

  const handleCreateNewProject = async () => {
    // let token = await getNewToken();
    setLoading(true);
    const frames = JSON.stringify(initialFrameValues);
    const token = storage.getToken();
    addProject(projectName, frames, token).then((response) => {
      if (response.ok) {
        if (response.data.status) {
          window.location.reload();
          setBtnClicked(false);
        } else setErrorMsg("Failed To add New project, Try login again");
      }
      setLoading(false);
    });
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <Loading />
        </div>
      ) : !btnClicked ? (
        <Button
          type="link"
          icon={<PlusCircleOutlined />}
          key="new"
          className="new_project_btn"
          onClick={() => setBtnClicked(true)}
        >
          <span style={{ marginTop: "2px" }}>New Project</span>
        </Button>
      ) : (
        <div className="new_project_container">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="new_project_input"
          />
          <Button
            type="primary"
            className="new_project_option_btn"
            onClick={handleCreateNewProject}
          >
            Create
          </Button>
          <Button
            type="danger"
            className="new_project_option_btn"
            onClick={() => setBtnClicked(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default NewProject;
