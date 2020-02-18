import BST from '../BST.js';
import BSTNode from '../BSTNode.js';

describe('Trying to check if the tree sattisfies BST properties left child is less than parent is less than right child', () =>
{
    const intType = 'number';
    const bstType = 'bst';
    const bst1 = new BST(intType);

    test('is a valid empty BST machine', () =>
    {
        expect(bst1.root).toBe(null);
        expect(bst1.size).toBe(0);
        expect(bst1.treeType).toBe(bstType);
        expect(bst1.dataType).toBe(intType);
        expect(bst1._errors).toStrictEqual([]);
        expect(bst1._warnings).toStrictEqual([]);
    });
});

describe('Check if single node tree is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(1);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(true);
    });
});

describe('Check if full valid tree is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);

    bst1.root = new BSTNode(intType, 2);
    bst1.root.left = new BSTNode(intType, 1);
    bst1.root.right = new BSTNode(intType, 3);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(true);
    });
});

describe('Check if full invalid tree is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.root = new BSTNode(intType, 1);
    bst1.root.left = new BSTNode(intType, 2);
    bst1.root.right = new BSTNode(intType, 0);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(false);
    });
});

describe('Check if node with 1 left child is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.root = new BSTNode(intType, 4);
    bst1.root.left = new BSTNode(intType, 2);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(true);
    });
});

describe('Check if node with 1 rigth child is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.root = new BSTNode(intType, 4);
    bst1.root.right = new BSTNode(intType, 9);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(true);
    });
});

describe('Check if a valid tree 7 nodes is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.root = new BSTNode(intType, 6);
    bst1.root.left = new BSTNode(intType, 3);
    bst1.root.right = new BSTNode(intType, 7);

    bst1.root.left.left = new BSTNode(intType, 1);
    bst1.root.left.right = new BSTNode(intType, 5);
    bst1.root.left.right.left = new BSTNode(intType, 4);

    bst1.root.right.right = new BSTNode(intType, 8);
    bst1.root.right.right = new BSTNode(intType, 9);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(true);
    });
});

describe('Check if a tree with duplicate nodes is not valid', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.root = new BSTNode(intType, 6);
    bst1.root.left = new BSTNode(intType, 6);
    bst1.root.right = new BSTNode(intType, 7);

    test('to throw for invalid BST', () =>
    {
        expect(bst1.isValidBST()).toBe(false);
    });
});
