import { Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";

import Frame from "../components/Frame";
import Popups from "../components/Popups";
import MenuList from "../components/MenuList";
import ContextMenu from "../components/ContextMenu";
import Header from "../components/Header";
import ProjectsContext from "../context/ProjectsContext";

const { Content, Sider } = Layout;

const styles = {
  menu: {
    height: "100%",
  },

  content: {
    margin: 0,
    width: "100%",
    height: "100vh",
    overflow: "scroll",
  },
};

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;

const getProject = (projects, id) => {
  return projects.filter((project) => project.id == id)[0];
};

function MainLayout(props) {
  const PROJECT_ID = props.match.params.id;
  const { projects } = useContext(ProjectsContext);

  console.log();

  const [Frames, setFrames] = useState(getProject(projects, PROJECT_ID).Frames);
  const [projectName, setProjectName] = useState(
    getProject(projects, PROJECT_ID).projectName
  );

  const getTowerId = () => {
    for (let i = 0; i < Frames.length; i++)
      if (Frames[i].frameName === "Tower") return Frames[i].id;
  };

  const pathsState = useState([]);
  const deleteAlertState = useState(false);
  const selectedItemState = useState(false);
  const imgeChangeAlertState = useState(false);
  const displayNewFramePopupState = useState(false);
  const displayImageUploaderState = useState(false);
  const [bgImg, setBgImg] = useState(false);
  const currentToolState = useState("draw");
  const [isSliderCollapsed, setIsSliderCollpased] = useState(false);
  const [currentFrameId, setCurrentFrameId] = useState(getTowerId());
  const [ContextMenuPosition, setContextMenuPosition] = useState(false);
  const [location, setLocation] = useState([getTowerId()]);
  const [newPageFormDetails, setNewPageFormDetails] = useState(false);
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
    updateLocation(currentFrameId);
  }, [currentFrameId]);

  useEffect(() => {
    if (!selectedItem) setContextMenuPosition(false);
  }, [selectedItem]);

  const addNewFrame = (
    frameName,
    description,
    bgImg,
    id = "not specified",
    type = "Tower"
  ) => {
    setFrames((old) => [
      ...old,
      { paths: [], bgImg, frameName, id, description, type },
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

  const handleContextMenuItemSelected = (e) => {
    switch (e.key) {
      case "delete":
        deleteAlertState[1](true);
    }
  };

  // don't know why but it just fixed
  // the problem of routepipeline
  useState(() => {
    setTimeout(() => {
      setCurrentFrameId(getTowerId());
    }, 1);
  }, []);

  const handleSave = () => {
    console.table(Frames);
  };

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
        style={{
          padding: "0",
          margin: "0",
          width: "100%",
          maxHeight: "100%",
        }}
        width={150}
        className="slider"
        theme="dark"
        collapsible={false}
        collapsedWidth={60}
        collapsed={false}
        onCollapse={(collapsed) => setIsSliderCollpased(collapsed)}
        onClickCapture={() => setContextMenuPosition(false)}
      >
        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          style={styles.menu}
          // onClick={(e) => console.log(e)}
        >
          <MenuList
            currentFrameId={currentFrameId}
            isSliderCollapsed={isSliderCollapsed}
            selectedItemState={selectedItemState}
            projectName={projectName}
            Frames={Frames}
            setCurrentFrameId={setCurrentFrameId}
            displayNewFramePopupState={displayNewFramePopupState}
            currentFrameType={getCurrentFrame().type}
            setNewPageFormDetails={setNewPageFormDetails}
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
            handleContextMenuSelect={handleContextMenuItemSelected}
            ContextMenuPosition={ContextMenuPosition}
            setNewPageFormDetails={setNewPageFormDetails}
            setContextMenuPosition={setContextMenuPosition}
          />
        )}
        <Header
          onSaveClick={handleSave}
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
            setContextMenuPosition={setContextMenuPosition}
            newPageFormDetails={newPageFormDetails}
            Frames={Frames}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
