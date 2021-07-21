import React, { useContext } from "react";
import { Layout } from "antd";
import "./Dashboard.css";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import ProjectsContext from "../../context/ProjectsContext";
import AuthContext from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
const { Content } = Layout;

function Dashboard(props) {
  const { projects } = useContext(ProjectsContext);
  const { user } = useContext(AuthContext);

  return user ? (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header userName={user.firstName} />
      <Content style={{ padding: "50px 50px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {projects.length > 0 ? (
            projects.map((project) => {
              return (
                <ProjectCard
                  name={project.projectName}
                  id={project.id}
                  src={`${process.env.PUBLIC_URL}/statics/Images/bg3.jpg`}
                />
              );
            })
          ) : (
            <div>No Projects Available</div>
          )}
        </div>
      </Content>
    </Layout>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
