import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { useState } from "react";
import MenuItem from "antd/lib/menu/MenuItem";
import Frame from "../components/Frame";
import AlertBox from "../components/AlertBox";
import MenuList from "../components/MenuList";

const { Content, Sider } = Layout;

function MainLayout({ content }) {
  // draw, select

  const [Frames, setFrames] = useState([]);
  const [currentTool, setCurrentTool] = useState("draw");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);

  // console.log(selectedItem);

  const handleMenuItemSelected = (e) => {
    setCurrentTool(e.key);

    switch (e.key) {
      case "draw":
        setSelectedItem(false);
        break;
      case "delete":
        setShowAlert(true);
        break;

      case "free":
        setSelectedItem(false);
        break;
    }
  };

  const handleOnMouseOverOptions = (id, isChecked) => {
    let tempFrames = Frames;

    tempFrames.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "color")
          frame.hoverProps = { ...frame.hoverProps, isColorEnable: isChecked };
        if (id === "info")
          frame.hoverProps = { ...frame.hoverProps, isInfoEnable: isChecked };
      }
    });

    setFrames([...tempFrames]);
  };

  const handleOnMouseOverValuesChange = (id, value) => {
    let tempFrames = Frames;

    tempFrames.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "color")
          frame.hoverProps = { ...frame.hoverProps, hoverColor: value };
        if (id === "info")
          frame.hoverProps = { ...frame.hoverProps, hoverInfo: value };
      }
    });

    setFrames([...tempFrames]);
  };

  function deletePath() {
    setFrames((old) => [
      ...old.filter((frame) => frame.id !== selectedItem.id),
      {
        co: [{ x: 0, y: 0 }],

        tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
        id: "temp",
      },
    ]);

    setSelectedItem(false);
  }

  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          theme="dark"
          collapsible
          onCollapse={() => setIsSliderCollpased((prev) => !prev)}
        >
          <Menu
            selectedKeys={[currentTool]}
            mode="inline"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
            onSelect={(e) => handleMenuItemSelected(e)}
            theme="dark"
          >
            <MenuList
              selectedItem={selectedItem}
              isSliderCollapsed={isSliderCollapsed}
              handleOnMouseOverOptions={handleOnMouseOverOptions}
              handleOnMouseOverValuesChange={handleOnMouseOverValuesChange}
            />
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
              width: "100%",
              overflow: "scroll",
            }}
          >
            <Frame
              currentTool={currentTool}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              Frames={Frames}
              setFrames={setFrames}
            />

            <AlertBox
              show={showAlert}
              onClose={() => setShowAlert(false)}
              message={"Are you sure to delete"}
              autoClose={false}
              variant={"Info"}
              handleYes={() => {
                setShowAlert(false);
                setCurrentTool(false);

                deletePath();
              }}
              handleNo={() => {
                setShowAlert(false);
                setCurrentTool(false);
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
