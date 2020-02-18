import BST from '../BST.js';

function createOneNodeBST() 
{
    const bst = new BST('number');

    bst.insert(10);
    return bst;
}

function createBST()
{
    const bst = new BST('number');

    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(17);
    bst.insert(16);
    bst.insert(2);
    bst.insert(7);
    bst.insert(1);
    bst.insert(3);
    bst.insert(6);
    return bst;
}

describe('Testing delete on various children conditions', () =>
{
    test('Valid size of Tree', () =>
    {
        const bsTree = createOneNodeBST();

        bsTree.delete(10);
        expect(bsTree.root).toBe(null);
    });

    test('Test remove with one child', () =>
    {
        const bsTree = createBST();

        bsTree.delete(15);
        expect(bsTree.root.data).toBe(10);
        expect(bsTree.root.right.data).toBe(17);
        expect(bsTree.root.right.left.data).toBe(16);
    });

    test('Test remove with two children', () =>
    {
        const bsTree = createBST();

        bsTree.delete(5);
        expect(bsTree.root.data).toBe(10);
        expect(bsTree.root.left.data).toBe(6);
        expect(bsTree.root.left.right.data).toBe(7);
        expect(bsTree.root.left.right.left).toBe(null);

    });

    test('Test remove leaf', () =>
    {
        const bsTree = createBST();

        bsTree.delete(6);
        expect(bsTree.root.data).toBe(10);
        expect(bsTree.root.left.data).toBe(5);
        expect(bsTree.root.left.right.data).toBe(7);
        expect(bsTree.root.left.right.left).toBe(null);

    });
});
