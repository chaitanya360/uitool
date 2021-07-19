import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";

import Frame from "../components/Frame";
import Popups from "../components/Popups";
import MenuList from "../components/MenuList";
import ContextMenu from "../components/ContextMenu";
import Header from "../components/Header";

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
    width: "100%",
    height: "100vh",
    overflow: "scroll",
  },
};

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;
const initialFrameValues = [
  { paths: [], bgImg: false, frameName: "Tower", id: getId(), type: "Tower" },
  {
    paths: [],
    bgImg: false,
    frameName: "Block",
    id: getId() + 1,
    type: "block",
  },
  {
    paths: [],
    bgImg: false,
    frameName: "Floor",
    id: getId() + 2,
    type: "floor",
  },
  { paths: [], bgImg: false, frameName: "Flat", id: getId() + 3, type: "flat" },
];

const getTowerId = () => {
  for (let i = 0; i < initialFrameValues.length; i++)
    if (initialFrameValues[i].frameName === "Tower")
      return initialFrameValues[i].id;
};

function MainLayout() {
  const pathsState = useState([]);
  const deleteAlertState = useState(false);
  const selectedItemState = useState(false);
  const imgeChangeAlertState = useState(false);
  const displayNewFramePopupState = useState(false);
  const displayImageUploaderState = useState(false);
  const [bgImg, setBgImg] = useState(false);
  const currentToolState = useState("draw");
  const [project, setProject] = useState({ ProjectName: "New Project" });
  const [Frames, setFrames] = useState(initialFrameValues);
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);
  const [currentFrameId, setCurrentFrameId] = useState(getTowerId());
  const [ContextMenuPosition, setContextMenuPosition] = useState(false);
  const [location, setLocation] = useState([getTowerId()]);

  const [paths, setPaths] = pathsState;
  const setshowImgChangeAlert = imgeChangeAlertState[1];
  const [selectedItem, setSelectedItem] = selectedItemState;
  const setDisplayNewFramePopup = displayNewFramePopupState[1];
  const [currentTool, setCurrentTool] = currentToolState;

  const setCurrentFrame = (values) => {
    let tempFrames = Frames;

    const frame = tempFrames.find((frame) => frame.id === currentFrameId);

    tempFrames[tempFrames.indexOf(frame)] = {
      ...frame,
      ...values,
    };

    setFrames(tempFrames);
  };

  const getCurrentFrame = () =>
    Frames.find((frame) => frame.id === currentFrameId);

  useEffect(() => {
    setCurrentFrameId(Frames[Frames.length - 1].id);
    setProject((old) => ({ ...old, Frames }));
  }, [Frames]);

  console.log(location);

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
    updateLocation(currentFrameId);
  }, [currentFrameId]);

  useEffect(() => {
    if (!selectedItem) setContextMenuPosition(false);
  }, [selectedItem]);

  const addNewFrame = (frameName, description, bgImg, id = "not specified") => {
    setFrames((old) => [
      ...old,
      { paths: [], bgImg, frameName, id, description },
    ]);

    setLocation((old) => [...old, id]);
    setDisplayNewFramePopup(false);
    setCurrentTool(false);
    setSelectedItem(false);
  };

  const updateLocation = (currentId) => {
    let index = location.indexOf(currentId);
    let newLocation = [];
    // if (location.length == 0) setLocation([currentFrameId]);
    if (location.length > 0) {
      // if currentId is not visited (moving forward)
      if (index === -1) {
        setLocation((old) => [...old, currentId]);
      }
      // if currentId is visited and clicked (going backward)
      else {
        for (let i = 0; i <= index; i++) newLocation.push(location[i]);
        setLocation(newLocation);
      }
    }
  };

  const handleMenuItemSelected = (e) => {
    setCurrentFrameId(parseInt(e.key));
  };

  // don't know why but it just fixed
  // the problem of routepipeline
  useState(() => {
    setTimeout(() => {
      setCurrentFrameId(getTowerId());
    }, 1);
  }, []);

  return (
    <Layout
      onContextMenuCapture={(e) => e.preventDefault()}
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: "0px",
        left: "0px",
      }}
    >
      <Sider
        style={{ overflow: "hidden" }}
        width={150}
        className="slider"
        theme="dark"
        collapsible
        collapsedWidth={60}
        collapsed={isSliderCollapsed}
        onCollapse={(collapsed) => setIsSliderCollpased(collapsed)}
        onClickCapture={() => setContextMenuPosition(false)}
      >
        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          style={styles.menu}
          onClick={(e) => handleMenuItemSelected(e)}
        >
          <MenuList
            currentFrameId={currentFrameId}
            isSliderCollapsed={isSliderCollapsed}
            selectedItemState={selectedItemState}
            projectName={project.ProjectName}
            Frames={Frames}
          />
        </Menu>
      </Sider>

      <Layout
        style={{
          padding: "0",
        }}
      >
        {ContextMenuPosition && (
          <ContextMenu
            Frames={Frames}
            currentFrameId={currentFrameId}
            pathsState={pathsState}
            selectedItem={selectedItem}
            selectedItemState={selectedItemState}
            setCurrentTool={setCurrentTool}
            setDisplayNewFramePopup={setDisplayNewFramePopup}
            handleContextMenuSelect={handleMenuItemSelected}
            ContextMenuPosition={ContextMenuPosition}
          />
        )}
        <Header
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
          setshowImgChangeAlert={setshowImgChangeAlert}
          FrameName={getCurrentFrame().frameName}
          Frames={Frames}
          location={location}
          setCurrentFrameId={setCurrentFrameId}
        />
        <Content
          className="site-layout-background hidden_scroll"
          style={styles.content}
        >
          <Frame
            setContextMenuPosition={setContextMenuPosition}
            currentToolState={currentToolState}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            paths={paths}
            setPaths={setPaths}
            bgSrc={bgImg}
            setCurrentFrameId={setCurrentFrameId}
            displayImageUploaderState={displayImageUploaderState}
            setBgImg={setBgImg}
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
  );
}

export default MainLayout;
