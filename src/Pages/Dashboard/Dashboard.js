import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "antd";
import "./Dashboard.css";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import ProjectsContext from "../../context/ProjectsContext";
import AuthContext from "../../context/AuthContext";
import { Redirect, useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import NewProjectPopup from "./NewProjectPopup";
import storage from "../../api/storage";
import { deleteProject, getAllProjects, setProject } from "../../api/projects";
import ErrorContext from "../../context/ErrorContext";
import DeletePopup from "../../components/DeletePopup";
import UploadImage from "../../components/UploadImage";
import ProjectNameChangepopup from "../../components/ProjectNameChangePopup";
import { _deleteImage } from "../../utility/functions";
import TourContext from "../../context/TourContext";

const { Content } = Layout;

function Dashboard(props) {
  const { user } = useContext(AuthContext);
  const { projects, setProjects } = useContext(ProjectsContext);
  const [loading, setLoading] = useState(true);
  const [btnClicked, setBtnClicked] = useState(false);
  const [deleteProjectPopup, setDeleteProjectPopup] = useState(false);
  const [renameProjectPopup, setRenameProjectPopup] = useState(false);
  const [thumbnailImg, setThumbnailImg] = useState(false);

  // selectedProjectRef.curre is used to access project id
  // in rename or image upload popup
  const selectedProjectRef = useRef(false);
  const [displayImageUploader, setDisplayImageUploader] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);
  const history = useHistory();

  const { showTour, justFinishedStep } = useContext(TourContext);

  const getProjects = () => {
    setLoading(true);
    const token = storage.getToken();
    getAllProjects(token).then((response) => {
      console.log("fetched all projects");
      setLoading(false);
      if (response.ok) {
        if (response.data.status) setProjects(response.data.data);
        else {
          history.push("/login");
          setErrorMsg("something went wrong");
        }
      } else {
        setErrorMsg("something went wrong");
        history.push("/login");
      }
    });
  };

  useEffect(() => {
    if (!user) return history.push("/login");
    if (projects) {
      if (projects.length === 0)
        if (justFinishedStep === "init")
          // tour starts here
          showTour();
    } else getProjects();
  }, [projects]);

  useEffect(() => {
    if (thumbnailImg) {
      handleChangeThumbnail();
      setThumbnailImg(false);
    }
  }, [thumbnailImg]);

  const getThumbnailSrc = (id) => {
    // this is for just changed thumbnail
    if (thumbnailImg && selectedProjectRef.current === id) {
      console.log("returing new thumbinai imag");
      return thumbnailImg;
    }
    let src;
    projects.forEach((project) => {
      if (project._id === id) {
        const frames = JSON.parse(project.frames);
        src = frames[0].thumbnailImg;
        return;
      }
    });

    return src
      ? src
      : `${process.env.PUBLIC_URL}/statics/Images/project_placeholder.jpg`;
  };

  const handleDeleteProject = () => {
    if (!loading) setLoading(true);
    const currProjectId = selectedProjectRef.current;
    let token = storage.getToken();
    if (!token) {
      setErrorMsg("Failed to delete project, try login again");
      return;
    }

    deleteProject(token, currProjectId, []).then((response) => {
      let success = false;
      if (response.status) {
        if (response.data.status) {
          setErrorMsg("Project Deleted");
          success = true;
          getProjects();
        }
      }
      if (!success) setErrorMsg("Failed to delete project, try login again");
    });
    setDeleteProjectPopup(false);
  };

  const handleChangeThumbnail = () => {
    if (!selectedProjectRef.current) return;
    const currProjectId = selectedProjectRef.current;
    const project = projects.find((project) => project._id === currProjectId);
    let prevThumbnail = false;

    let frames = JSON.parse(project.frames);
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].type === "tower") {
        if (frames[i].thumbnailImg) prevThumbnail = frames[i].thumbnailImg;
        frames[i].thumbnailImg = thumbnailImg;
        break;
      }
    }
    // deleting prev thubmnail
    if (prevThumbnail) _deleteImage(storage.getToken, prevThumbnail);
    save(project, frames).then(() => getProjects());
  };

  const handleProjectRename = (newName) => {
    if (!selectedProjectRef.current) return;
    const currProjectId = selectedProjectRef.current;
    const project = projects.find((project) => project._id === currProjectId);

    console.log(project);
    project.project_name = newName;
    save(project, JSON.parse(project.frames));
    setRenameProjectPopup(false);
  };

  const save = async (project, frames) => {
    if (project && frames)
      await setProject(
        project._id,
        project.project_name,
        JSON.stringify(frames),
        storage.getToken(),
        frames
      ).then((response) => {
        if (response.ok) {
          if (response.data.status) console.log("saved");
          else setErrorMsg("Your Session is Expired Try Login Again");
        }
      });
  };

  return user ? (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      {deleteProjectPopup && (
        <DeletePopup
          handleDeletePage={handleDeleteProject}
          isProject
          showPopup={deleteProjectPopup}
          setShowPopup={setDeleteProjectPopup}
        />
      )}
      {renameProjectPopup && (
        <ProjectNameChangepopup
          handleProjectNameChange={handleProjectRename}
          setShowPopup={setRenameProjectPopup}
          showPopup={renameProjectPopup}
        />
      )}

      {displayImageUploader && (
        <UploadImage
          project_id={selectedProjectRef.current}
          setImg={setThumbnailImg}
          onImageChanged={() => setDisplayImageUploader(false)}
          setShouldDisplay={setDisplayImageUploader}
        />
      )}
      <Header userName={user.firstName} setBtnClicked={setBtnClicked} />
      <Content
        style={{
          height: "100%",
        }}
      >
        {btnClicked && (
          <NewProjectPopup
            setDashboardLoading={setLoading}
            setBtnClicked={setBtnClicked}
            getProjects={getProjects}
          />
        )}

        {loading && (
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <Loading />
          </div>
        )}
        {projects && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,320px)",
              margin: "auto",
              padding: "0.5rem 1rem",
            }}
          >
            {projects.length > 0 ? (
              projects.map((project) => {
                return (
                  <ProjectCard
                    handleFocusCapture={() =>
                      (selectedProjectRef.current = project._id)
                    }
                    setDisplayImageUploader={setDisplayImageUploader}
                    setDeleteProjectPopup={setDeleteProjectPopup}
                    setRenameProjectPopup={setRenameProjectPopup}
                    key={project._id}
                    name={project.project_name}
                    id={project._id}
                    src={getThumbnailSrc(project._id)}
                  />
                );
              })
            ) : (
              <div>No Projects Available</div>
            )}
          </div>
        )}
      </Content>
    </Layout>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
