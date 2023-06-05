"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode_1 = __importDefault(require("./TreeNode"));
var ErrorDuplicateKey = new Error("duplicate key");
var ErrorKeyNoExist = new Error("key doesn't exist");
var ErrorNoRoot = new Error("no root");
var Tree = (function () {
    function Tree() {
        this.root = null;
        this._count = 0;
    }
    Tree.prototype.count = function () {
        return this._count;
    };
    Tree.prototype.min = function (startingNode) {
        if (startingNode === void 0) { startingNode = this.root; }
        if (!this.root) {
            return null;
        }
        var current = startingNode;
        while (current) {
            if (current.left == null) {
                return current;
            }
            current = current.left;
        }
    };
    Tree.prototype.max = function () {
        if (!this.root) {
            return null;
        }
        var current = this.root;
        while (current) {
            if (current.right == null) {
                return current;
            }
            current = current.right;
        }
    };
    Tree.prototype.insert = function (newKey, newValue) {
        this._count++;
        var newNode = new TreeNode_1.default(newKey, newValue);
        if (!this.root) {
            this.root = newNode;
            return this.root;
        }
        var current = this.root;
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
    };
    Tree.prototype.find = function (key) {
        if (!this.root) {
            return null;
        }
        var current = this.root;
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
    };
    Tree.prototype.remove = function (key) {
        if (!this.root) {
            return null;
        }
        var current = this.root;
        var parent = null;
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
                    var leftMost = this.min(current.right);
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
    };
    Tree.prototype.dfsInOrder = function () {
        var nodesToVisit = [this.root];
        var visitedNodes = [];
        while (nodesToVisit.length > 0) {
            var current = nodesToVisit.pop();
            visitedNodes.push(current.key);
            if (current.left) {
                nodesToVisit.push(current.left);
            }
            if (current.right) {
                nodesToVisit.push(current.right);
            }
        }
        return visitedNodes;
    };
    Tree.prototype.isValidTree = function () {
        var isValidLeft = true;
        var currentLeft = this.root;
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
        var isValidRight = true;
        var currentRight = this.root;
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
    };
    return Tree;
}());
exports.default = Tree;
//# sourceMappingURL=BinarySearchTree.js.map