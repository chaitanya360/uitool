const initialFrameValues = [
  {
    paths: [],
    bgImg: false,
    frameName: "Tower",
    details: {
      features: [],
      status: "Available",
      title: "Tower",
    },
    id: 1,
    parentId: false,
    type: "tower",
    status: false,
    thumbnailImg: false,
  },
  // {
  //   paths: [],
  //   bgImg: false,
  //   frameName: "Blocka",
  //   id: getId() + 100,
  //   parentId: getId() - 100,
  //   type: "block",
  //   status: false,
  // },
  // {
  //   paths: [],
  //   bgImg: false,
  //   frameName: "Blockb",
  //   id: getId() + 200,
  //   parentId: getId() - 100,
  //   type: "block",
  //   status: false,
  // },
  // {
  //   paths: [],
  //   bgImg: false,
  //   frameName: "Floor 1",
  //   id: getId() + 300,
  //   parentId: getId() + 200,
  //   type: "floor",
  //   status: false,
  // },
  // {
  //   paths: [],
  //   bgImg: false,
  //   frameName: "Flat 101",
  //   id: getId() + 350,
  //   parentId: getId() + 300,
  //   type: "flat",
  //   status: false,
  // },
  // {
  //   paths: [],
  //   bgImg: false,
  //   frameName: "Flat 102",
  //   id: getId() + 351,
  //   parentId: getId() + 300,
  //   type: "flat",
  //   status: false,
  // },
];
// const initialFrameValues = [
//   {
//     paths: [],
//     bgImg: false,
//     frameName: "TowerTitle",
//     isPlaceHolder: true,
//     id: getId() - 200,
//     type: "Tower",
//     status: false,
//     thumbnailImg: false,
//   },
//   {
//     paths: [],
//     bgImg: false,
//     frameName: "Tower",
//     id: getId() - 100,
//     type: "Tower",
//     status: false,
//   },
//   {
//     paths: [],
//     bgImg: false,
//     frameName: "BlockTitle",
//     isPlaceHolder: true,
//     id: getId() + 100,
//     type: "Block",
//     status: false,
//   },
//   {
//     paths: [],
//     bgImg: false,
//     frameName: "FloorTitle",
//     isPlaceHolder: true,
//     id: getId() + 200,
//     type: "Floor",
//     status: false,
//   },
//   {
//     paths: [],
//     bgImg: false,
//     frameName: "FlatTitle",
//     isPlaceHolder: true,
//     id: getId() + 300,
//     type: "Flat",
//     status: false,
//   },
// ];

const newFrame = {
  co: [{ x: 0, y: 0 }],
  tempEnd: { x1: 0, y1: 0, x2: 0, y2: 0 },
  id: "temp",
  targetPage: false,
  isHoverEnable: false,
  isClickEnable: false,
  status: 0,
};

const CURSOR = {
  penClose: `url(${process.env.PUBLIC_URL}/statics/Icons/penClose.svg) 0 20, auto`,
  pen: `url(${process.env.PUBLIC_URL}/statics/Icons/pen.svg) 0 20, auto`,
  pointer: `url(${process.env.PUBLIC_URL}/statics/Icons/select.svg) 5 5, auto`,
  pick: `url(${process.env.PUBLIC_URL}/statics/Icons/pick.svg) -5 -5, auto`,
  resize: `url(${process.env.PUBLIC_URL}/statics/Icons/resize.svg) 5 5, auto`,
  copy: "copy",
};

const cursors = [
  `${process.env.PUBLIC_URL}/statics/Icons/penClose.svg`,
  `${process.env.PUBLIC_URL}/statics/Icons/pen.svg`,
  `${process.env.PUBLIC_URL}/statics/Icons/select.svg`,
  `${process.env.PUBLIC_URL}/statics/Icons/pick.svg`,
  `${process.env.PUBLIC_URL}/statics/Icons/resize.svg`,
];

const statusValues = {
  available: "Available",
  booked: "Booked",
  notOpened: "Not Opened",
};
const getStatusValuesList = () => {
  let list = [];
  Object.keys(statusValues).forEach((key) => list.push(statusValues[key]));
  return list;
};

const statusValuesList = getStatusValuesList();

const TourSteps = [
  {
    selector: ".new_project_btn",
    content: "Click to create New project",
    justFinished: "create_new_project",
  },
  {
    selector: ".new_project_name",
    content: "Give it a name",
    justFinished: "project_name",
  },
  {
    selector: ".thumbnail_btn",
    content: "Choose thumbnail image",
    justFinished: "chose_thumbnail",
  },
  {
    selector: ".publish_btn",
    content: "Click to create",
    justFinished: "publish_project",
  },
  {
    selector: "#add_new_bg_img_btn",
    content: "Select Background Image For current page",
    justFinished: "add_bg",
  },
  {
    selector: "hidden",
    content: "",
    justFinished: "add_bg_success",
  },
  {
    selector: ".draw_path_icon",
    content: "Select Draw Tool to Draw Polygon",
    justFinished: "select_draw",
  },
  {
    selector: "#draw",
    content: "Draw Polygon over element you want to link to other page",
    // for demos justfinisehd will be src
    justFinished: "draw",
  },
  {
    selector: "#adjust",
    content: "Adjust polygon by draging it's vertex",
    justFinished: "adjust",
  },
  {
    selector: "#move",
    content: "Drag polygon to move it to other place",
    justFinished: "move",
  },
  {
    selector: "#copy",
    content: "Double Click inside polygon to make it's copy",
    justFinished: "copy",
  },

  {
    selector: ".new_btn_icon",
    content: "Click on Plus button to create new page inside it.",
    justFinished: "plus_btn_click",
  },
  {
    selector: "hidden",
    content: "",
    justFinished: "create_new_page",
  },
  {
    selector: ".ant-tree-switcher_close",
    content: "Expand Tower",
    justFinished: "expand",
  },
  {
    selector: ".ant-tree-list-holder-inner",
    content: "Select Tower to open it",
    justFinished: "select_tower",
  },
];

export {
  initialFrameValues,
  newFrame,
  CURSOR,
  cursors,
  statusValues,
  statusValuesList,
  TourSteps,
};
