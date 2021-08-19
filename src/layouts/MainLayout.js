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
import { Node, TreeStructure } from "../utility/functions";

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

function MainLayout({ project, isTour = false }) {
  const { user } = useContext(AuthContext);
  const [Frames, setFrames] = useState(JSON.parse(project.frames));

  const [projectName, setProjectName] = useState(project.project_name);

  const getTowerId = () =>
    Frames.find((frame) => frame.frameName === "Tower").id;

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
  const [newPageFormDetails, setNewPageFormDetails] = useState(false);
  const [paths, setPaths] = pathsState;
  const setshowImgChangeAlert = imgeChangeAlertState[1];
  const [selectedItem, setSelectedItem] = selectedItemState;
  const setDisplayNewFramePopup = displayNewFramePopupState[1];
  const [currentTool, setCurrentTool] = currentToolState;
  const [showPublishTagline, setShowPublishTagline] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);
  const [saving, setSaving] = useState(false);
  const [showDeletePagePopup, setShowDeletePagePopup] = useState(false);
  const [treeData, setTreeData] = useState(false);
  const [newPageId, setNewPageId] = useState(false);
  let tree;
  let justDeleted = false;

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
    setCurrentFrame({
      paths,
      bgImg,
    });
  }, [bgImg, paths]);

  // if page is changed updating bg image and its path
  useEffect(() => {
    let tempFrames = Frames;
    const frame = tempFrames.find((frame) => frame.id === currentFrameId);
    setBgImg(frame.bgImg);
    setPaths(frame.paths);
  }, [currentFrameId]);

  useEffect(() => {
    if (!selectedItem) setContextMenuPosition(false);
  }, [selectedItem]);

  useEffect(() => {
    // mapping Frames into the tree so that it can be used for navigation
    console.log("transpiling");
    for (let i = 0; i < Frames.length; i++) {
      let frame = Frames[i];
      if (frame.type === "tower")
        tree = new TreeStructure(
          new Node(frame.type, frame.frameName, frame.id, frame.parentId)
        );
      else
        tree.addNode(
          new Node(frame.type, frame.frameName, frame.id, frame.parentId)
        );
    }
    setTreeData(tree);
  }, [Frames]);

  const addNewFrame = (
    frameName,
    description,
    bgImg,
    id = "not specified",
    type = "tower",
    parentId
  ) => {
    console.log(type, parentId);
    setFrames((old) => [
      ...old,
      {
        paths: [],
        bgImg,
        frameName,
        id,
        description,
        type,
        parentId: parentId ? parentId : false,
      },
    ]);

    setDisplayNewFramePopup(false);
    setCurrentTool(false);
    setSelectedItem(false);
    setNewPageId(id);
  };

  useEffect(() => {
    if (newPageId) setCurrentFrameId(newPageId);
  }, [newPageId]);

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
  // the problem of routepipeline and many other
  // don't change this, just dont
  useState(() => {
    setTimeout(() => {
      setCurrentFrameId(getTowerId());
    }, 1);

    const currFrame = getCurrentFrame();

    setBgImg(currFrame.bgImg);
    setPaths(currFrame.paths);
    if (isTour) setCurrentTool("free");
  }, []);

  const getFallBackPageId = (id) => {
    const parentId = treeData.getNode(id).getParentKey();
    const parent = treeData.getNode(parentId);
    const childrenList = parent.getchildren();

    // checking whether node being deleted is the only child of its parent
    if (childrenList.length < 2) return parentId;
    // this will return id of it's brothers
    else
      for (let i = 0; i < childrenList.length; i++) {
        let child = childrenList[i];
        if (child.key === id)
          return childrenList[i > 0 ? i - 1 : childrenList.length - 1].key;
      }
  };

  const handlePageDelete = () => {
    // delete page id is set in deletepagepopup
    const deletePageId = showDeletePagePopup.id;

    // removing all the references to the page being deleted

    // list of items being deleted
    let tobeDeletedList = treeData.getArrayList(treeData.getNode(deletePageId));

    // list of ids being deleted
    tobeDeletedList = tobeDeletedList.map((item) => item.key);
    console.log(tobeDeletedList);

    setFrames((Frames) => {
      for (let i = 0; i < Frames.length; i++) {
        let frame = Frames[i];
        for (let j = 0; j < frame.paths.length; j++) {
          let path = frame.paths[j];
          if (path.clickProps)
            if (path.clickProps.isClickEnable)
              if (
                tobeDeletedList.indexOf(path.clickProps.targetFrameId) !== -1
              ) {
                Frames[i].paths[j].clickProps = {
                  ...Frames[i].paths[j].clickProps,
                  isClickEnable: false,
                  targetFrameId: 0,
                };
              }
        }
      }
      return Frames;
    });
    // removing all the pages being deleted
    setFrames((Frames) => {
      console.log(
        Frames.filter((frame) => tobeDeletedList.indexOf(frame.id) === -1)
      );
      return Frames.filter((frame) => tobeDeletedList.indexOf(frame.id) === -1);
    });
    setShowDeletePagePopup(false);
    setCurrentFrameId(getFallBackPageId(deletePageId));
  };

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
            maxHeight: "fit-content",
          }}
          width={"fit-content"}
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
              treeData={treeData}
              handlePublishPressed={handlePublish}
              currentFrameId={currentFrameId}
              isSliderCollapsed={isSliderCollapsed}
              selectedItemState={selectedItemState}
              projectName={projectName}
              Frames={Frames}
              setCurrentFrameId={setCurrentFrameId}
              displayNewFramePopupState={displayNewFramePopupState}
              currentFrameType={
                getCurrentFrame() ? getCurrentFrame().type : "null"
              }
              setShowDeletePagePopup={setShowDeletePagePopup}
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
            treeData={treeData}
            currentFrameId={currentFrameId}
            setSelectedItem={setSelectedItem}
            setCurrentFrameId={setCurrentFrameId}
            onSaveClick={handleSave}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            setshowImgChangeAlert={setshowImgChangeAlert}
            FrameName={
              getCurrentFrame() ? getCurrentFrame().frameName : "unnamed"
            }
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
                currentFrameId={currentFrameId}
                setCurrentFrameId={setCurrentFrameId}
                setCurrentTool={setCurrentTool}
                treeData={treeData}
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
            displayDeletePagePopup={showDeletePagePopup}
            setDisplayDeletePagePopup={setShowDeletePagePopup}
            handleDeletePage={handlePageDelete}
          />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Redirect to="/login" />
  );
}

export default MainLayout;
