"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = (function () {
    function TreeNode(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
    TreeNode.prototype.isLeaf = function () {
        return this.left == null && this.right == null;
    };
    return TreeNode;
}());
exports.default = TreeNode;
//# sourceMappingURL=TreeNode.js.map