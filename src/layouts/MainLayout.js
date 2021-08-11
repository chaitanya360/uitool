import { Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";

import Frame from "../components/Frame";
import Popups from "../components/Popups";
import MenuList from "../components/MenuList";
import ContextMenu from "../components/ContextMenu";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { setProject } from "../api/projects";
import RoutePipeline from "../components/RoutePipeline";
import { colors } from "../utility";
import PublishedTagline from "../components/PublishedTagline";
import storage from "../api/storage";
import ErrorContext from "../context/ErrorContext";

const { Content, Sider } = Layout;

const styles = {
  menu: {
    height: "100%",
  },

  content: {
    margin: 0,
    width: "100%",
    overflow: "scroll",
  },
};

const defaultBgImage = `${process.env.PUBLIC_URL}/statics/Images/bg.jpg`;

function MainLayout({ project, isTour = false }) {
  const { user } = useContext(AuthContext);
  const [Frames, setFrames] = useState(JSON.parse(project.frames));

  const [projectName, setProjectName] = useState(project.project_name);

  const getTowerId = () => {
    return Frames.find((frame) => frame.frameName === "Tower").id;
    // for (let i = 0; i < Frames.length; i++)
    //   if (Frames[i].frameName === "Tower") {
    //     // console.log(Frames[i]);
    //     return Frames[i].id;
    //   }
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
  const [showPublishTagline, setShowPublishTagline] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);
  const [saving, setSaving] = useState(false);

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
    setContextMenuPosition(false);
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
        break;
      case "adjust":
        setContextMenuPosition(false);
        setCurrentTool("adjust");
        break;
    }
  };

  // don't know why but it just fixed
  // the problem of routepipeline
  useState(() => {
    setTimeout(() => {
      setCurrentFrameId(getTowerId());
    }, 1);

    const currFrame = getCurrentFrame();

    setBgImg(currFrame.bgImg);
    setPaths(currFrame.paths);
    if (isTour) setCurrentTool("free");
  }, []);

  const handleSave = () => {
    setSaving(true);
    setProject(
      project._id,
      projectName,
      JSON.stringify(Frames),
      storage.getToken(),
      Frames
    ).then((response) => {
      setSaving(false);
      if (response.ok) {
        if (response.data.status) console.log("saved");
        else setErrorMsg("Your Session is Expired Try Login Again");
      }
    });
  };

  const handlePublish = () => {
    setShowPublishTagline(true);
  };

  return user || isTour ? (
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
      {!isTour && (
        <Sider
          style={{
            padding: "0",
            margin: "0",
            width: "100%",
            maxHeight: "fit-content",
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
              handlePublishPressed={handlePublish}
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
      )}

      <Layout
        style={{
          padding: "0",
          height: "100%",
          width: "100%",
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
        {!isTour && (
          <Header
            setSelectedItem={setSelectedItem}
            onSaveClick={handleSave}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            setshowImgChangeAlert={setshowImgChangeAlert}
            FrameName={getCurrentFrame().frameName}
            Frames={Frames}
            location={location}
            setCurrentFrameId={setCurrentFrameId}
            saving={saving}
          />
        )}
        <PublishedTagline
          projectId={project._id}
          visible={showPublishTagline}
          setVisible={setShowPublishTagline}
        />
        <Content
          className="site-layout-background hidden_scroll"
          style={styles.content}
        >
          {isTour && (
            <div
              style={{
                width: "100%",
                height: "fit-content",
                backgroundColor: colors.primary,
                padding: "10px",
              }}
            >
              <RoutePipeline
                setCurrentTool={setCurrentTool}
                location={location}
                setCurrentFrameId={setCurrentFrameId}
                Frames={Frames}
              />
            </div>
          )}
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
            isTour={isTour}
            ContextMenuPosition={ContextMenuPosition}
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
  ) : (
    <Redirect to="/login" />
  );
}

export default MainLayout;
