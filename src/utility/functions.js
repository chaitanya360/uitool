import { List } from "antd/lib/form/Form";
import { baseURL } from "../api/config";
import { deleteImage } from "../api/image";

class Node {
  constructor(type, title, key, parentKey, bgImg, paths, status, thumbnailImg) {
    this.title = title;
    this.key = key;
    this.type = type;
    this.parentKey = parentKey;
    this.children = [];
    this.bgImg = bgImg;
    this.paths = paths;
    this.status = status;
    this.thumbnailImg = thumbnailImg;
  }
  getTitle = () => this.title;
  getKey = () => this.key;
  getParentKey = () => this.parentKey;
  getchildren = () => this.children;
}

function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

class TreeStructure {
  constructor(root) {
    this.root = root;
  }

  addNode = (node, root = this.root) => {
    if (node.parentKey === root.key) {
      // this is for new button
      // if (root.children.length === 0)
      //   root.children.unshift(
      //     new Node(node.type, "+ Add " + node.type, "btn" + root.key, root.key)
      //   );
      root.children.push(node);
      return true;
    } else {
      for (let i = 0; i < root.children.length; i++) {
        let newRoot = root.children[i];
        if (this.addNode(node, newRoot)) return true;
      }
      return false;
    }
  };

  getNode = (key, root = this.root) => {
    if (root.key === key) return root;
    for (let i = 0; i < root.children.length; i++) {
      let singleChild = root.children[i];
      if (this.getNode(key, singleChild)) return this.getNode(key, singleChild);
    }
    return false;
  };

  getchildrenList = (root = this.root) => {
    let list = [];
    for (let i = 0; i < root.children.length; i++) {
      let child = root.children[i];
      list.push({
        key: child.key,
        title: child.title,
      });
    }
    return list;
  };

  getDataList = () => {
    let string = JSON.stringify(this.root);
    return [JSON.parse(string)];
  };

  getArrayList = (root = this.root, list = []) => {
    if (list.length === 0)
      list.push({
        key: root.key,
        title: root.title,
        type: root.type,
        parentKey: root.parentKey,
        bgImg: root.bgImg,
        paths: root.paths,
        status: root.status,
        thumbnailImg: root.thumbnailImg,
      });
    if (root.children.length === 0) {
      return list;
    } else
      for (let i = 0; i < root.children.length; i++) {
        let child = root.children[i];
        list.push({
          key: child.key,
          title: child.title,
          type: child.type,
          parentKey: child.parentKey,
          bgImg: child.bgImg,
          paths: child.paths,
          status: child.status,
          thumbnailImg: child.thumbnailImg,
        });
        this.getArrayList(child, list);
      }
    return list;
  };
}

const getChildType = (type) => {
  switch (type) {
    case "tower":
      return "block";
    case "block":
      return "floor";
    case "floor":
      return "flat";
    default:
      return "Type";
  }
};

const _deleteImage = (token, url) => {
  if (!url.includes(baseURL)) return false;
  console.log("deleting", url);
  let path = parsePathFromUrl(url);
  deleteImage(path, token).then((response) => {
    if (response.data && response.data.status)
      console.log("deleted prev image");
  });
};

const parsePathFromUrl = (url) => {
  return url.replace(baseURL, "");
};

export { TreeStructure, Node, getChildType, _deleteImage, parsePathFromUrl };
