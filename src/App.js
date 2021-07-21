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
const getId = () => new Date().getTime();

function App() {
  const [user, setUser] = useState(false);
  const [projects, setProjects] = useState([
    { projectName: "Project IGI", id: 1, Frames: initialFrameValues },
    { projectName: "Project Impossible", id: 2, Frames: initialFrameValues },
    { projectName: "Project Furious", id: 3, Frames: initialFrameValues },
    { projectName: "Project Lost", id: 4, Frames: initialFrameValues },
  ]);

  useEffect(() => {
    // checking for user locally
    const savedUser = storage.getUser();
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <Routes />
      </ProjectsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
