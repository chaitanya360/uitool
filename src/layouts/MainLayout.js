import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";

import Frame from "../components/Frame";
import Popups from "../components/Popups";
import MenuList from "../components/MenuList";
import RoutePipeline from "../components/RoutePipeline";

const { Content, Sider } = Layout;

const getId = () => new Date().getTime();

const styles = {
  menu: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  content: {
    margin: 0,
    padding: 24,
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
};

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;
const initialFrameValues = {
  paths: [],
  bgImg: defaultBgImage,
  frameName: "new",
  id: getId(),
};

function MainLayout() {
  // draw, select

  const pathsState = useState([]);
  const [Frames, setFrames] = useState([]);
  const deleteAlertState = useState(false);
  const selectedItemState = useState(false);
  const imgeChangeAlertState = useState(false);
  const displayImageUploaderState = useState(false);
  const [bgImg, setBgImg] = useState(defaultBgImage);
  const [frameName, setFrameName] = useState("Home");
  const [currentTool, setCurrentTool] = useState("draw");
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(initialFrameValues);
  const displayNewFramePopupState = useState(false);

  const [paths, setPaths] = pathsState;
  const setShowDeleteAlert = deleteAlertState[1];
  const setshowImgChangeAlert = imgeChangeAlertState[1];
  const [selectedItem, setSelectedItem] = selectedItemState;
  const setDisplayNewFramePopup = displayNewFramePopupState[1];

  useEffect(() => {
    setCurrentFrame((old) => ({
      ...old,
      paths,
      bgImg,
      frameName,
    }));
  }, [bgImg, paths, frameName]);

  const addNewFrame = (frameName, description, bgImg, id = "not specified") => {
    setFrames((old) => [...old, currentFrame]);

    setFrameName(frameName);
    setBgImg(bgImg);
    setCurrentFrame((old) => ({
      ...old,
      id,
      description,
    }));

    setPaths([]);
    setDisplayNewFramePopup(false);
    setCurrentTool(false);
    setSelectedItem(false);
  };

  console.log(Frames);

  const handleMenuItemSelected = (e) => {
    setCurrentTool(e.key);

    switch (e.key) {
      case "draw":
        setSelectedItem(false);
        setIsSliderCollpased(false);

        break;
      case "delete":
        setShowDeleteAlert(true);
        break;

      case "free":
        setSelectedItem(false);
        setIsSliderCollpased(true);
        break;

      case "change_image":
        setshowImgChangeAlert(true);
        setIsSliderCollpased(false);

        break;
    }
  };

  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          className="slider"
          theme="dark"
          collapsible
          collapsed={isSliderCollapsed}
          onCollapse={(collapsed) => setIsSliderCollpased(collapsed)}
        >
          <Menu
            selectedKeys={[currentTool]}
            mode="inline"
            style={styles.menu}
            onSelect={(e) => handleMenuItemSelected(e)}
            theme="dark"
          >
            <MenuList
              addNewFrame={addNewFrame}
              isSliderCollapsed={isSliderCollapsed}
              pathsState={pathsState}
              selectedItemState={selectedItemState}
              setCurrentTool={setCurrentTool}
              setDisplayNewFramePopup={setDisplayNewFramePopup}
              Frames={Frames}
            />
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <RoutePipeline Frames={Frames} currentFrame={currentFrame} />
          <Content className="site-layout-background" style={styles.content}>
            <Frame
              currentTool={currentTool}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              paths={currentFrame.paths}
              setPaths={setPaths}
              bgSrc={currentFrame.bgImg}
            />

            <Popups
              deleteAlertState={deleteAlertState}
              imgeChangeAlertState={imgeChangeAlertState}
              setCurrentTool={setCurrentTool}
              setBgImg={setBgImg}
              selectedItemState={selectedItemState}
              displayImageUploaderState={displayImageUploaderState}
              displayNewFramePopupState={displayNewFramePopupState}
              addNewFrame={addNewFrame}
              pathsState={pathsState}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
