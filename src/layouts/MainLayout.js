import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { useState } from "react";
import Frame from "../components/Frame";
import AlertBox from "../components/AlertBox";
import MenuList from "../components/MenuList";
import UploadImage from "../components/UploadImage";

const { Content, Sider } = Layout;

const styles = {
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  content: {
    padding: 24,
    margin: 0,
    height: "100%",
    width: "100%",
    overflow: "scroll",
  },
};

function MainLayout({ content }) {
  // draw, select

  const [Frames, setFrames] = useState([]);
  const [currentTool, setCurrentTool] = useState("draw");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showImgChangeAlert, setshowImgChangeAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);
  const [displayImageUploader, setDisplayImageUploader] = useState(false);
  const [bgImg, setBgImg] = useState(
    `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`
  );

  const handleMenuItemSelected = (e) => {
    setCurrentTool(e.key);

    switch (e.key) {
      case "draw":
        setSelectedItem(false);
        break;
      case "delete":
        setShowDeleteAlert(true);
        break;

      case "free":
        setSelectedItem(false);
        break;

      case "change_image":
        setshowImgChangeAlert(true);
        break;
    }
  };

  const handleOnMouseOverOptions = (id, isChecked) => {
    let tempFrames = Frames;

    tempFrames.forEach((frame) => {
      if (frame.id === selectedItem.id) {
        if (id === "color")
          frame.hoverProps = {
            ...frame.hoverProps,
            isColorEnable: isChecked,
            hoverColor: "rgba(0,255,0,0.4)",
          };
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
            style={styles.menu}
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
          <Content className="site-layout-background" style={styles.content}>
            <Frame
              currentTool={currentTool}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              Frames={Frames}
              setFrames={setFrames}
              bgSrc={bgImg}
            />

            <UploadImage
              setImg={setBgImg}
              shouldDisplay={displayImageUploader}
              setShouldDisplay={setDisplayImageUploader}
              onImageChanged={() => {
                setDisplayImageUploader(false);
                setCurrentTool(false);
              }}
            />

            <AlertBox
              show={showDeleteAlert}
              onClose={() => setShowDeleteAlert(false)}
              message={"Are you sure to delete"}
              autoClose={false}
              variant={"Info"}
              handleYes={() => {
                setShowDeleteAlert(false);
                setCurrentTool(false);

                deletePath();
              }}
              handleNo={() => {
                setShowDeleteAlert(false);
                setCurrentTool(false);
              }}
            />

            <AlertBox
              width="350px"
              show={showImgChangeAlert}
              onClose={() => setshowImgChangeAlert(false)}
              message={
                "Changing Image Would Remove Paths, Still want to change?"
              }
              autoClose={false}
              variant={"Info"}
              handleYes={() => {
                setshowImgChangeAlert(false);
                setCurrentTool(false);
                setDisplayImageUploader(true);
                setFrames([]);
              }}
              handleNo={() => {
                setshowImgChangeAlert(false);
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
