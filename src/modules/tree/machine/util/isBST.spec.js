import BST from '../BST.js';

describe('Trying to check if the tree sattisfies BST properties:
          left child is less than parent is less than right child ', () =>
{
    const bst1 = new BST(int);
    const bst2 = new BST(int);

    test('is a valid empty BST machine', () =>
    {
      expect(bst1.root).toBe(null);
      expect(bst1.size).toBe(0);
      expect(bst1.treeType).toBe('bst');
      expect(bst1.dataType).toBe(int);
      expect(bst1._errors).toBe([]);
      expect(bst1._warnings).toBe([]);
    });
});

describe('Check if single node tree is a valid BST', () =>
{
    const bst1 = new BST(int);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(true));
    });
});

describe('Check if full valid tree is a valid BST', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 2);
    bst1.root.left = new BSTNode(int, 1);
    bst1.root.right = new BSTNode(int, 3);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(true));
    });
});

describe('Check if full invalid tree is a valid BST', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 1);
    bst1.root.left = new BSTNode(int, 2);
    bst1.root.right = new BSTNode(int, 0);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(false));
    });
});

describe('Check if node with 1 left child is a valid BST', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 4);
    bst1.root.left = new BSTNode(int, 2);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(true));
    });
});

describe('Check if node with 1 rigth child is a valid BST', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 4);
    bst1.root.right = new BSTNode(int, 9);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(true));
    });
});

describe('Check if a valid tree 7 nodes is a valid BST', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 6);
    bst1.root.left = new BSTNode(int, 3);
    bst1.root.right = new BSTNode(int, 7);

    bst1.root.left.left = new BSTNode(int, 1);
    bst1.root.left.right = new BSTNode(int, 5);
    bst1.root.left.right.left = new BSTNode(int, 4);

    bst1.root.right.right = new BSTNode(int, 8);
    bst1.root.right.right = new BSTNode(int, 9);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(true));
    });
});

describe('Check if a tree with duplicate nodes is not valid', () =>
{
    const bst1 = new BST(int);
    bst1.root = new BSTNode(int, 6);
    bst1.root.left = new BSTNode(int, 6);
    bst1.root.right = new BSTNode(int, 7);

    test('to throw for invalid BST', () =>
    {
      expect(bst1.isValid().toBe(false));
    });
});
