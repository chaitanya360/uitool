class Node {
  constructor(type, title, key, parentKey) {
    this.title = title;
    this.key = key;
    this.type = type;
    this.parentKey = parentKey;
    this.children = [];
  }
  getTitle = () => this.title;
  getKey = () => this.key;
  getParentKey = () => this.getParentKey;
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

  removeNode = (node, root = this.root) => {
    for (let i = 0; i < root.children.length; i++) {
      let singleChild = root.children[i];
      if (singleChild.key === node.key) {
        root.children = removeItem(root.children, node);
        return true;
      } else if (this.removeNode(node, singleChild)) return true;
    }
    return false;
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

export { TreeStructure, Node, getChildType };
