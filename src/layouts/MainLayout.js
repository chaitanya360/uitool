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
  const deleteAlertState = useState(false);
  const selectedItemState = useState(false);
  const imgeChangeAlertState = useState(false);
  const displayNewFramePopupState = useState(false);
  const displayImageUploaderState = useState(false);
  const [bgImg, setBgImg] = useState(defaultBgImage);
  const [currentTool, setCurrentTool] = useState("draw");
  const [Frames, setFrames] = useState([initialFrameValues]);
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);
  const [currentFrameId, setCurrentFrameId] = useState(initialFrameValues.id);

  const [paths, setPaths] = pathsState;
  const setShowDeleteAlert = deleteAlertState[1];
  const setshowImgChangeAlert = imgeChangeAlertState[1];
  const [selectedItem, setSelectedItem] = selectedItemState;
  const setDisplayNewFramePopup = displayNewFramePopupState[1];

  const setCurrentFrame = (values) => {
    let tempFrames = Frames;

    const frame = tempFrames.find((frame) => frame.id === currentFrameId);

    tempFrames[tempFrames.indexOf(frame)] = {
      ...frame,
      ...values,
    };

    setFrames(tempFrames);
  };

  useEffect(() => {
    setCurrentFrameId(Frames[0].id);
  }, []);

  useEffect(() => {
    setCurrentFrameId(Frames[Frames.length - 1].id);
  }, [Frames]);

  useEffect(() => {
    setCurrentFrame({
      paths,
      bgImg,
    });
  }, [bgImg, paths]);

  useEffect(() => {
    let tempFrames = Frames;
    const frame = tempFrames.find((frame) => frame.id === currentFrameId);
    setBgImg(frame.bgImg);
    setPaths(frame.paths);
  }, [currentFrameId]);

  const addNewFrame = (frameName, description, bgImg, id = "not specified") => {
    setFrames((old) => [
      ...old,
      { paths: [], bgImg, frameName, id, description },
    ]);

    setDisplayNewFramePopup(false);
    setCurrentTool(false);
    setSelectedItem(false);
  };

  const handleMenuItemSelected = (e) => {
    setCurrentTool(e.key);
    setIsSliderCollpased(false);

    switch (e.key) {
      case "draw":
        setSelectedItem(false);

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
          <RoutePipeline Frames={Frames} />
          <Content className="site-layout-background" style={styles.content}>
            <Frame
              currentTool={currentTool}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              paths={paths}
              setPaths={setPaths}
              bgSrc={bgImg}
              setCurrentFrameId={setCurrentFrameId}
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
