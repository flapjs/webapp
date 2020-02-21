import BST from '../BST.js';

describe('Trying to check if the tree preOrder traversal is correct', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);

    test('is a valid empty BST machine', () =>
    {
        expect(bst1.root).toBe(null);
        expect(bst1.size).toBe(0);
        expect(bst1.treeType).toBe('bst');
        expect(bst1.dataType).toBe('number');
        expect(bst1._errors).toStrictEqual([]);
        expect(bst1._warnings).toStrictEqual([]);
    });
});

describe('Check traversal for single node BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(4);
    var traversal = [];

    test('to throw for valid BST traversal', () =>
    {
        traversal = bst1.preOrder([]);
        expect(traversal[0]).toBe(4);
    });
});

describe('Check traversal for full BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(2);
    bst1.insert(1);
    bst1.insert(3);
    var traversal = [];

    test('to throw for valid BST traversal', () =>
    {
        traversal = bst1.preOrder([]);
        expect(traversal[0]).toBe(2);
        expect(traversal[1]).toBe(1);
        expect(traversal[2]).toBe(3);
    });
});

describe('Check if node with 1 left child is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(2);
    bst1.insert(1);
    var traversal = [];

    test('to throw for valid BST traversal', () =>
    {
        traversal = bst1.preOrder([]);
        expect(traversal[0]).toBe(2);
        expect(traversal[1]).toBe(1);
    });
});

describe('Check if node with 1 rigth child is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(2);
    bst1.insert(3);
    var traversal = [];

    test('to throw for valid BST traversal', () =>
    {
        traversal = bst1.preOrder([]);
        expect(traversal[0]).toBe(2);
        expect(traversal[1]).toBe(3);
    });
});

describe('Check if a valid tree 7 nodes is a valid BST', () =>
{
    const intType = 'number';
    const bst1 = new BST(intType);
    bst1.insert(6);
    bst1.insert(3);
    bst1.insert(7);
    bst1.insert(1);
    bst1.insert(5);
    bst1.insert(4);
    bst1.insert(9);
    var traversal = [];

    test('to throw for valid BST traversal', () =>
    {
        traversal = bst1.preOrder([]);
        expect(traversal[0]).toBe(6);
        expect(traversal[1]).toBe(3);
        expect(traversal[2]).toBe(1);
        expect(traversal[3]).toBe(5);
        expect(traversal[4]).toBe(4);
        expect(traversal[5]).toBe(7);
        expect(traversal[6]).toBe(9);
    });
});

describe('Check if custom function works with traversal', () =>
{
    const bst1 = new BST('number');
    bst1.insert(6);
    bst1.insert(3);
    bst1.insert(7);
    bst1.insert(1);
    bst1.insert(5);
    bst1.insert(4);
    bst1.insert(9);
    var traversal = [];


    test('to throw for valid BST traversal', () =>
    {
        let args = [];
        let count = 0;
        args.push(count);

        const sizeFunc = (node, args) => args[0]++;

        traversal = bst1.preOrder(args, sizeFunc);
        expect(args[0]).toBe(7);
        expect(traversal[0]).toBe(6);
    });
});
