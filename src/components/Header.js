import React, { useContext, useEffect, useState } from "react";
import { Layout, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  FileOutlined,
  ProfileOutlined,
  MenuOutlined,
  InfoCircleOutlined,
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
  onSaveClick,
  setSelectedItem,
  saving,
  setCurrentFrameId,
  treeData,
  currentFrameId,
  handleShowDetails,
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
        if (currentTool === "draw") setCurrentTool("default");
        else setCurrentTool("draw");
        break;
      case "user":
        break;
      case "change_bg":
        setshowImgChangeAlert(true);
        setCurrentTool("change_bg");
        break;
      case "free":
        if (currentTool === "free") setCurrentTool(false);
        else setCurrentTool("free");
        break;
      case "details":
        handleShowDetails();
        setTimeout(() => setSelectedMenuItem(false), 500);
        break;

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
        backgroundColor: colors.primary,
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
          treeData={treeData}
          currentFrameId={currentFrameId}
          setCurrentFrameId={setCurrentFrameId}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
            marginRight: "80px",
          }}
        >
          <SaveButton />
          <IconMenuItem
            tooltip="Preview"
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
            Icon={<PenIcon className="draw_path_icon" />}
            selected={selectedMenuItem === "draw"}
            onClick={() => handleHeaderMenuSelect("draw")}
          />

          <IconMenuItem
            tooltip="Edit Details"
            Icon={<InfoCircleOutlined style={{ fontSize: "1.1rem" }} />}
            selected={selectedMenuItem === "details"}
            onClick={() => handleHeaderMenuSelect("details")}
          />

          <IconDropDown
            setCurrentTool={setCurrentTool}
            setSelected={setSelectedMenuItem}
            selected={selectedMenuItem === "user"}
            onTitleClicked={() => handleHeaderMenuSelect("user")}
            handleMenuItemSelect={handleUserMenuItemSelect}
            Icon={<MenuOutlined />}
            listWidth="150px"
          >
            <IconTextItem
              Icon={<UserOutlined style={{ fontSize: "1.2rem" }} />}
              text="Profile"
              id="profile"
              key="profile"
              onClick={() => history.push("/profile")}
            />
            <IconTextItem
              Icon={<ProfileOutlined style={{ fontSize: "1.2rem" }} />}
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
