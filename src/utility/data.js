const getId = () => new Date().getTime();

const initialFrameValues = [
  {
    paths: [],
    bgImg: false,
    frameName: "TowerTitle",
    isPlaceHolder: true,
    id: getId() - 2,
    type: "Tower",
    status: false,
    thumbnailImg: false,
  },
  {
    paths: [],
    bgImg: false,
    frameName: "Tower",
    id: getId() - 1,
    type: "Tower",
    status: false,
  },
  {
    paths: [],
    bgImg: false,
    frameName: "BlockTitle",
    isPlaceHolder: true,
    id: getId() + 1,
    type: "Block",
    status: false,
  },
  {
    paths: [],
    bgImg: false,
    frameName: "FloorTitle",
    isPlaceHolder: true,
    id: getId() + 2,
    type: "Floor",
    status: false,
  },
  {
    paths: [],
    bgImg: false,
    frameName: "FlatTitle",
    isPlaceHolder: true,
    id: getId() + 3,
    type: "Flat",
    status: false,
  },
];

export { initialFrameValues };
