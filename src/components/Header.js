import React, { useEffect, useState } from "react";
import { Layout } from "antd";
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

const { Header: AntHeader } = Layout;

function Header({
  setCurrentTool,
  setshowImgChangeAlert,
  currentTool,
  FrameName = "New",
  location,
  setCurrentFrameId,
  Frames,
}) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(currentTool);

  const handleHeaderMenuSelect = (key) => {
    setSelectedMenuItem(key);
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

  useEffect(() => {
    setSelectedMenuItem(currentTool);
  }, [currentTool]);

  return (
    <AntHeader style={{ height: "40px" }}>
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
        {/* <div>{FrameName}</div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
          }}
        >
          <IconMenuItem
            Icon={<EyeIcon />}
            selected={selectedMenuItem === "free"}
            onClick={() => handleHeaderMenuSelect("free")}
          />
          <IconMenuItem
            Icon={<FileOutlined />}
            selected={selectedMenuItem === "change_bg"}
            onClick={() => handleHeaderMenuSelect("change_bg")}
          />
          <IconMenuItem
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
            listWidth="130px"
          >
            <IconTextItem
              Icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
              text="Edit"
              id="edit"
            />
            <IconTextItem
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
