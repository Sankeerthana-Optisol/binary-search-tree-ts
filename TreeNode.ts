class TreeNode {
  key: number;
  value: string;
  left: TreeNode;
  right: TreeNode;
  parent: TreeNode;

  constructor(key: number, value: any) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  isLeaf(): boolean {
    return this.left == null && this.right == null;
  }
}

export default TreeNode;
