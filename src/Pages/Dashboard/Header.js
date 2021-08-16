import React, { useContext, useState } from "react";
import { Layout, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import IconDropDown from "../../components/IconDropDown";
import IconTextItem from "../../components/IconTextItem";
import AlertBox from "../../components/AlertBox";
import { useHistory } from "react-router-dom";
import storage from "../../api/storage";
import AuthContext from "../../context/AuthContext";
import ProjectsContext from "../../context/ProjectsContext";

const { Header: HEADER, Content } = Layout;

function Header({ userName, setBtnClicked }) {
  const history = useHistory();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const [userMenuExpand, setUserMenuExpand] = useState(false);
  const { setProjects } = useContext(ProjectsContext);
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    setShowLogoutAlert(false);
    setProjects(false);
    authContext.setUser(false);
    history.push("/dashboard");
    storage.removeToken();
    storage.removeUser();
  };

  return (
    <HEADER
      className="dashboard_header"
      style={{ height: "50px", zIndex: "3" }}
    >
      <AlertBox
        show={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        message={"Are you sure to logout"}
        autoClose={false}
        variant={"danger"}
        handleYes={handleLogout}
        handleNo={() => {
          setShowLogoutAlert(false);
        }}
      />
      <Button
        type="link"
        icon={<PlusCircleOutlined style={{ transform: "translateY(2px)" }} />}
        key="new"
        className="new_project_btn"
        onClick={() => setBtnClicked(true)}
      >
        <span style={{ marginTop: "2px" }}>New Project</span>
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "70px",
        }}
      >
        <IconDropDown
          Icon={
            <div
              onClick={() => setUserMenuExpand(true)}
              style={{
                display: "flex",
                padding: "5px 10px",
                alignItems: "center",
              }}
            >
              <UserOutlined />
              <div style={{ margin: "0px 10px" }}>{userName}</div>
            </div>
          }
          selected={userMenuExpand}
          setSelected={setUserMenuExpand}
          listWidth="130px"
          listOffset="50px"
        >
          <IconTextItem
            Icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
            text="Profile"
            id="edit"
            key="edit"
            onClick={() => history.push("/profile")}
          />
          <IconTextItem
            onClick={() => setShowLogoutAlert(true)}
            Icon={<LogoutOutlined style={{ fontSize: "1.1rem" }} />}
            text="Log Out"
            id="logout"
          />
        </IconDropDown>
      </div>
    </HEADER>
  );
}

export default Header;
