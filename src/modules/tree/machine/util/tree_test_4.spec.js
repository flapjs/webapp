import BST from '../BST.js';

function createBST()
{
    const bst = new BST('number');

    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(17);
    bst.insert(2);
    bst.insert(7);

    return bst;
}

describe('Testing level order traversal', () => 
{
    test('Valid level order traversal', () =>
    {
        const bsTree = createBST();
        const result = bsTree.levelOrderTraversal([]);

        expect(result[0].data).toBe(10);
        expect(result[1].data).toBe(5);
        expect(result[2].data).toBe(15);
        expect(result[3].data).toBe(2);
        expect(result[4].data).toBe(7);
        expect(result[5].data).toBe(17);
    });
});
