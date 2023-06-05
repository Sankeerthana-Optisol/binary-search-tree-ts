import BinarySearchTree from "./BinarySearchTree.js";
import esserializer from "esserializer";

let bst: BinarySearchTree = new BinarySearchTree();

bst.insert(9, "nine");
bst.insert(4, "four");
bst.insert(6, "six");
bst.insert(20, "twenty");
bst.insert(170, "one hundred seventy");
bst.insert(15, "fifteen");
bst.insert(1, "one");
bst.insert(2, "two");
bst.insert(3, "three");
bst.insert(5, "five");
bst.insert(7, "seven");
bst.insert(8, "eight");
bst.insert(10, "ten");
bst.insert(11, "eleven");
bst.insert(12, "twelve");
bst.insert(13, "thirteen");
bst.insert(14, "fourteen");
bst.insert(16, "sixteen");
bst.insert(17, "seventeen");

bst.remove(9);
bst.remove(17);

console.log(bst.dfsInOrder());
console.log(bst.isValidTree());
console.log(esserializer.serialize(bst));
