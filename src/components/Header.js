import React, { useContext, useEffect, useState } from "react";
import { Layout, Button } from "antd";
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  FileOutlined,
} from "@ant-design/icons";
import IconDropDown from "./IconDropDown";
import RoutePipeline from "./RoutePipeline";
import IconTextItem from "./IconTextItem";
import { EyeIcon, PenIcon } from "./Icon";
import IconMenuItem from "./IconMenuItem";
import AlertBox from "./AlertBox";
import storage from "../api/storage";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import ProjectsContext from "../context/ProjectsContext";
import { colors } from "../utility";

const { Header: AntHeader } = Layout;

function Header({
  setCurrentTool,
  setshowImgChangeAlert,
  currentTool,
  location,
  setCurrentFrameId,
  Frames,
  onSaveClick,
  setSelectedItem,
  saving,
}) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(currentTool);
  const authContext = useContext(AuthContext);
  const { setProjects } = useContext(ProjectsContext);

  const history = useHistory();
  const handleHeaderMenuSelect = (key) => {
    setSelectedMenuItem(key);
    setSelectedItem(false);
    switch (key) {
      case "draw":
        setCurrentTool("draw");
        break;
      case "user":
        break;
      case "change_bg":
        setshowImgChangeAlert(true);
        setCurrentTool("change_bg");
        break;
      case "free":
        setCurrentTool("free");
      default:
        return;
    }
  };

  const handleUserMenuItemSelect = (e) => {
    setSelectedMenuItem(false);
    switch (e.item.props.id) {
      case "edit":
        break;
      case "logout":
        break;
    }
  };

  const handleLogout = () => {
    setShowLogoutAlert(false);
    setProjects(false);
    authContext.setUser(false);
    history.push("/dashboard");
    storage.removeToken();
    storage.removeUser();
  };

  useEffect(() => {
    setSelectedMenuItem(currentTool);
  }, [currentTool]);

  const SaveButton = () => (
    <div
      style={{
        fontWeight: "500",
        display: "flex",
        backgroundColor: colors.secondary,
        height: "30px",
        padding: "5px 15px",
        borderRadius: "3px",
        boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onClick={onSaveClick}
    >
      <span style={{ transform: "translateY(-2px)" }}>Save</span>
      <span class="loader" style={{ display: saving ? "block" : "none" }} />
    </div>
  );

  return (
    <AntHeader id="tools_header">
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "40px",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <RoutePipeline
          setCurrentTool={setCurrentTool}
          location={location}
          setCurrentFrameId={setCurrentFrameId}
          Frames={Frames}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
          }}
        >
          <SaveButton />
          <IconMenuItem
            tooltip="Free View"
            Icon={<EyeIcon />}
            selected={selectedMenuItem === "free"}
            onClick={() => handleHeaderMenuSelect("free")}
          />
          <IconMenuItem
            tooltip="Change Background Image"
            Icon={<FileOutlined />}
            selected={selectedMenuItem === "change_bg"}
            onClick={() => handleHeaderMenuSelect("change_bg")}
          />
          <IconMenuItem
            tooltip="Draw Path"
            Icon={<PenIcon />}
            selected={selectedMenuItem === "draw"}
            onClick={() => handleHeaderMenuSelect("draw")}
          />
          <IconDropDown
            setCurrentTool={setCurrentTool}
            setSelected={setSelectedMenuItem}
            selected={selectedMenuItem === "user"}
            onTitleClicked={() => handleHeaderMenuSelect("user")}
            handleMenuItemSelect={handleUserMenuItemSelect}
            Icon={<UserOutlined />}
            listWidth="150px"
          >
            <IconTextItem
              Icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
              text="Dashboard"
              id="edit"
              key="edit"
              onClick={() => history.push("/dashboard")}
            />
            <IconTextItem
              onClick={() => setShowLogoutAlert(true)}
              Icon={<LogoutOutlined style={{ fontSize: "1.1rem" }} />}
              text="Log Out"
              id="logout"
            />
          </IconDropDown>
        </div>
      </div>
    </AntHeader>
  );
}

export default Header;
