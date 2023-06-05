import TreeNode from "./TreeNode";

const ErrorDuplicateKey: Error = new Error("duplicate key");
const ErrorKeyNoExist: Error = new Error("key doesn't exist");
const ErrorNoRoot: Error = new Error("no root");

class Tree {
  root: TreeNode;
  _count: number;

  constructor() {
    this.root = null;
    this._count = 0;
  }

  count(): number {
    return this._count;
  }

  min(startingNode: TreeNode = this.root): TreeNode {
    if (!this.root) {
      return null;
    }

    let current: TreeNode = startingNode;
    while (current) {
      if (current.left == null) {
        return current;
      }
      current = current.left;
    }
  }

  max(): TreeNode {
    if (!this.root) {
      return null;
    }

    let current: TreeNode = this.root;

    while (current) {
      if (current.right == null) {
        return current;
      }

      current = current.right;
    }
  }

  insert(newKey: number, newValue: string): Error | TreeNode | this {
    this._count++;
    const newNode: TreeNode = new TreeNode(newKey, newValue);

    if (!this.root) {
      this.root = newNode;
      return this.root;
    }

    let current: TreeNode = this.root;
    while (current) {
      if (newKey === current.key) {
        return ErrorDuplicateKey;
      }

      if (newKey > current.key) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
        continue;
      }

      if (newKey < current.key) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      }
    }
  }

  find(key: number): TreeNode {
    if (!this.root) {
      return null;
    }

    let current: TreeNode = this.root;
    while (current) {
      if (current.key == key) {
        return current;
      }

      if (key > current.key) {
        current = current.right;
        continue;
      }

      if (key < current.key) {
        current = current.left;
      }
    }

    return null;
  }

  remove(key: number): Tree {
    if (!this.root) {
      return null;
    }

    let current: TreeNode = this.root;
    let parent: TreeNode = null;

    while (current) {
      if (key === current.key) {
        if (!current.left && !current.right) {
          if (parent.left === current) {
            parent.left = null;
          }
          if (parent.right === current) {
            parent.right = null;
          }
          this._count--;
          return this;
        }

        if (current.left === null) {
          if (parent.left === current) {
            parent.left = current.right;
          }
          if (parent.right === current) {
            parent.right = current.right;
          }

          this._count--;
          return this;
        }

        if (current.right === null) {
          if (parent.left === current) {
            parent.left = current.left;
          }
          if (parent.right === current) {
            parent.right = current.left;
          }

          this._count--;
          return this;
        }

        if (current.right && current.left) {
          let leftMost: TreeNode = this.min(current.right);
          this.remove(leftMost.key);

          if (!parent) {
            this.root = leftMost;
            this.root.left = current.left;
            this.root.right = current.right;
            return this;
          }

          if (parent.left === current) {
            parent.left = leftMost;
            return this;
          }
          if (parent.right === current) {
            parent.right = leftMost;
            return this;
          }

          this._count--;
          return this;
        }
      }

      if (key < current.key) {
        parent = current;
        current = current.left;
      }

      if (key > current.key) {
        parent = current;
        current = current.right;
      }
    }
  }

  dfsInOrder(): Array<number> {
    let nodesToVisit: TreeNode[] = [this.root];
    let visitedNodes: number[] = [];
    while (nodesToVisit.length > 0) {
      let current = nodesToVisit.pop();
      visitedNodes.push(current.key);
      if (current.left) {
        nodesToVisit.push(current.left);
      }
      if (current.right) {
        nodesToVisit.push(current.right);
      }
    }

    return visitedNodes;
  }

  isValidTree(): boolean {
    let isValidLeft: boolean = true;

    let currentLeft: TreeNode = this.root;
    while (currentLeft) {
      if (currentLeft.left === null) {
        break;
      }

      console.log("L_PREV", currentLeft.key);
      console.log("L_NEXT", currentLeft.left.key);
      if (currentLeft.key < currentLeft.left.key) {
        isValidLeft = false;
      }
      currentLeft = currentLeft.left;
    }

    let isValidRight: boolean = true;

    let currentRight: TreeNode = this.root;
    while (currentRight) {
      if (currentRight.right === null) {
        break;
      }

      console.log("R_PREV: ", currentRight.key);
      console.log("R_NEXT: ", currentRight.right.key);
      if (currentRight.key > currentRight.right.key) {
        isValidRight = false;
      }
      currentRight = currentRight.right;
    }

    return isValidLeft && isValidRight;
  }
}

export default Tree;
