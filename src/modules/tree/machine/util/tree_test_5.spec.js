import BST from '../BST.js';
import BSTNode from '../BSTNode.js';

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

describe('Testing getData() and isValid() of BSTNode', () => 
{
    test('getData()', () =>
    {
        const bsTree = createBST();

        expect(bsTree.root.getData()).toBe(10);
        expect(bsTree.root.left.getData()).toBe(5);
        expect(bsTree.root.right.getData()).toBe(15);
        expect(bsTree.root.left.left.getData()).toBe(2);
        expect(bsTree.root.left.right.getData()).toBe(7);
        expect(bsTree.root.left.left.left.getData()).toBe(1);
        expect(bsTree.root.left.left.right.getData()).toBe(3);
        expect(bsTree.root.left.right.left.getData()).toBe(6);
        expect(bsTree.root.right.right.getData()).toBe(17);
        expect(bsTree.root.right.right.left.getData()).toBe(16);
    });

    test('isValid()', () => 
    {
        const bsTree = createBST();

        expect(bsTree.root.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.isValid(bsTree)).toBe(true);
        expect(bsTree.root.right.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.left.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.right.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.left.left.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.left.right.isValid(bsTree)).toBe(true);
        expect(bsTree.root.left.right.left.isValid(bsTree)).toBe(true);
        expect(bsTree.root.right.right.isValid(bsTree)).toBe(true);
        expect(bsTree.root.right.right.left.isValid(bsTree)).toBe(true);
    });
});

describe('Testing getSuccessor() and getPredecessor() of BSTNode', () => 
{
    test('getSuccessor()', () =>
    {
        const bsTree = createBST();

        expect(bsTree.root.getSuccessor().data).toBe(15);
        expect(bsTree.root.left.getSuccessor().data).toBe(6);
        expect(bsTree.root.right.getSuccessor().data).toBe(16);
        expect(bsTree.root.left.left.getSuccessor().data).toBe(3);
        expect(bsTree.root.left.right.getSuccessor().data).toBe(10);
        expect(bsTree.root.left.left.left.getSuccessor().data).toBe(2);
        expect(bsTree.root.left.left.right.getSuccessor().data).toBe(5);
        expect(bsTree.root.left.right.left.getSuccessor().data).toBe(7);
        expect(bsTree.root.right.right.getSuccessor()).toBe(null);
        expect(bsTree.root.right.right.left.getSuccessor().data).toBe(17);
    });

    test('getPredecessor()', () =>
    {
        const bsTree = createBST();

        expect(bsTree.root.getPredecessor().data).toBe(7);
        expect(bsTree.root.left.getPredecessor().data).toBe(3);
        expect(bsTree.root.right.getPredecessor().data).toBe(10);
        expect(bsTree.root.left.left.getPredecessor().data).toBe(1);
        expect(bsTree.root.left.right.getPredecessor().data).toBe(6);
        expect(bsTree.root.left.left.left.getPredecessor()).toBe(null);
        expect(bsTree.root.left.left.right.getPredecessor().data).toBe(2);
        expect(bsTree.root.left.right.left.getPredecessor().data).toBe(5);
        expect(bsTree.root.right.right.getPredecessor().data).toBe(16);
        expect(bsTree.root.right.right.left.getPredecessor().data).toBe(15);
    });
});

describe('Testing defaultBSTComparator() and comparator()', () => 
{
    test('defaultBSTComparator()', () =>
    {
        const node1 = new BSTNode('number', 10);
        const node2 = new BSTNode('number', 21);

        expect(node1.defaultBSTComparator(node2)).toBe(true);
        expect(node2.defaultBSTComparator(node1)).toBe(false);
    });

    test('comparator()', () =>
    {
        const node1 = new BSTNode('number', 219);
        const node2 = new BSTNode('number', 421);

        const custom = function (curr, other)
        {
            return curr.data > other.data;
        };

        expect(node1.comparator(node2, custom)).toBe(false);
        expect(node2.comparator(node1, custom)).toBe(true);
    });
});
