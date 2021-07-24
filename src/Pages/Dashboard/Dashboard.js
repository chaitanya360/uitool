import React, { useContext, useEffect } from "react";
import { Layout } from "antd";
import "./Dashboard.css";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import ProjectsContext from "../../context/ProjectsContext";
import AuthContext from "../../context/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";
const { Content } = Layout;

function Dashboard(props) {
  const { user } = useContext(AuthContext);
  const { projects } = useContext(ProjectsContext);

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
          {projects && projects.length > 0 ? (
            projects.map((project) => {
              return (
                <ProjectCard
                  name={project.name}
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
    // <div style={{ fontSize: "1.2rem", margin: "20px" }}>
    //   <Link to="/login" style={{ textDecoration: "none" }}>
    //     Login
    //   </Link>{" "}
    //   Required
    // </div>
  );
}

export default Dashboard;
