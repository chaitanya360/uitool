const getId = () => new Date().getTime();

const initialFrameValues = [
  {
    paths: [],
    bgImg: false,
    frameName: "Tower",
    id: getId(),
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
  hoverProps: {
    isInfoEnable: false,
    isColorEnable: false,
    hoverColor: "",
    hoverInfo: "",
  },
  clickProps: {
    isClickEnable: false,
    targetFrameId: 0,
  },
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

export { initialFrameValues, newFrame, CURSOR };
