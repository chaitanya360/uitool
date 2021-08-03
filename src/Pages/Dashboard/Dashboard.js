import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import "./Dashboard.css";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import ProjectsContext from "../../context/ProjectsContext";
import AuthContext from "../../context/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import NewProjectPopup from "./NewProjectPopup";
const { Content } = Layout;

function Dashboard(props) {
  const { user } = useContext(AuthContext);
  const { projects } = useContext(ProjectsContext);
  const [loading, setLoading] = useState(true);
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    if (projects) setLoading(false);
  }, [projects]);

  const getProjectSrc = (Project) => {
    if (Project) {
      let frames = JSON.parse(Project.frames);
      for (let i = 0; i < frames.length; i++) {
        if (frames[i].frameName === "Tower") return frames[i].bgImg;
      }
    }
    return `${process.env.PUBLIC_URL}/statics/Images/project_placeholder.jpg`;
  };

  return user ? (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header userName={user.firstName} setBtnClicked={setBtnClicked} />
      <Content style={{ padding: "50px", height: "100%" }}>
        {btnClicked && <NewProjectPopup setBtnClicked={setBtnClicked} />}

        {loading ? (
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <Loading />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "auto",
              justifyContent: "flex-start",
            }}
          >
            {projects.length > 0 ? (
              projects.map((project) => {
                return (
                  <ProjectCard
                    name={project.project_name}
                    id={project._id}
                    nothing={getProjectSrc(project)}
                    src={getProjectSrc()}
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
    // <div style={{ fontSize: "1.2rem", margin: "20px" }}>
    //   <Link to="/login" style={{ textDecoration: "none" }}>
    //     Login
    //   </Link>{" "}
    //   Required
    // </div>
  );
}

export default Dashboard;
