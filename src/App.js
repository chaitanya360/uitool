import "antd/dist/antd.less";
import "./App.less";
import "animate.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import storage from "./api/storage";
import MainLayout from "./layouts/MainLayout";
import Routes from "./Routes";
import ProjectCard from "./Pages/Dashboard/ProjectCard";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProjectsContext from "./context/ProjectsContext";
import { initialFrameValues } from "./utility/data";
import PublishedTagline from "./components/PublishedTagline";
import ErrorMessage from "./components/ErrorMessage";
import ErrorContext from "./context/ErrorContext";
import { message } from "antd";
import { getAllProjects } from "./api/projects";
import AlertBox from "./components/AlertBox";

function App() {
  const [user, setUser] = useState(true);
  const [projects, setProjects] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const checkUser = () => {
    // checking for user locally
    const savedUser = storage.getUser();
    if (savedUser) setUser(savedUser);
    else setUser(false);
  };

  const getProjects = () => {
    const token = storage.getToken();
    getAllProjects(token).then((response) => {
      if (response.ok) {
        if (response.data.status) setProjects(response.data.data);
      } else setErrorMsg("something went wrong");
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user]);

  return (
    <>
      <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
        <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
        <AuthContext.Provider value={{ user, setUser }}>
          <ProjectsContext.Provider value={{ projects, setProjects }}>
            <Routes />
          </ProjectsContext.Provider>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </>
  );
}

export default App;
