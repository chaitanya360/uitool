import React from "react";
import { Layout, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

const { Header: HEADER, Content } = Layout;

function Header({ userName }) {
  return (
    <HEADER className="dashboard_header">
      <div>
        <Button
          type="link"
          icon={<PlusCircleOutlined />}
          key="new"
          className="new_project_btn"
        >
          <span style={{ marginTop: "2px" }}>New Project</span>
        </Button>
      </div>
      <div style={{ display: "flex", height: "fit-content" }}>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0px 5px" }}
        >
          <UserOutlined />
        </div>
        <div>{userName}</div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "0px 20px" }}
        >
          <SettingOutlined />
        </div>
      </div>
    </HEADER>
  );
}

export default Header;
