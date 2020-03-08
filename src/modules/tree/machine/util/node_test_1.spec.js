import BST from '../BST.js';

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

describe('Testing getSuccessor()', () =>
{

    test('Test getSuccessor() on node with right child', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root.right;
        expect(curr.getSuccessor().data).toBe(16);
    });

    test('Test getSuccessor() on node with no right child', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root.left.left.right;
        expect(curr.getSuccessor().data).toBe(5);
    });

    test('Test getSuccessor() on node with no successor', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root.right.right;
        expect(curr.getSuccessor()).toBe(null);
    });
});

describe('Testing getPredecessor()', () =>
{

    test('Test getPredecessor() on node with left child', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root;
        expect(curr.getPredecessor().data).toBe(7);
    });

    test('Test getPredecessor() on node with no left child', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root.left.right.left;
        expect(curr.getPredecessor().data).toBe(5);
    });

    test('Test getPredecessor() on node with no predecessor', () =>
    {
        const bsTree = createBST();

        let curr = bsTree.root.left.left.left;
        expect(curr.getPredecessor()).toBe(null);
    });
});
