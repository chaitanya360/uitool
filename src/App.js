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
import { getProjects } from "./api/backend";
const getId = () => new Date().getTime();

function App() {
  const [user, setUser] = useState(true);
  const [projects, setProjects] = useState(false);
  const checkUser = () => {
    // checking for user locally
    const savedUser = storage.getUser();
    if (savedUser) setUser(savedUser);
    else setUser(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      setProjects(getProjects(user.email));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <Routes />
      </ProjectsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
