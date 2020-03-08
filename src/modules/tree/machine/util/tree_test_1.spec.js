import BST from '../BST.js';

function createBST() 
{
    const bst = new BST('string');

    bst.insert('a');
    bst.insert(1);

    return bst;
}

describe('Valid BST Test #1', () =>
{
    const bsTree = createBST();

    test('Invalid data node insertion #1', () =>
    {
        expect(bsTree.root.left).toBe(null);
    });

    // TODO: Validation step in bst.insert() 
    /*test('Invalid data node insertion #2', () =>
    {
        expect(bsTree.root.right).toBe(null);
    });*/
});
