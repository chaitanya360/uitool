import "antd/dist/antd.less";
import "./App.less";
import "animate.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import storage from "./api/storage";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    // checking for user locally
    const savedUser = storage.getUser();
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <MainLayout />
    </AuthContext.Provider>
  );
}

export default App;
