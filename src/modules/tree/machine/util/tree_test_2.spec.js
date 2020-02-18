import BST from '../BST.js';

function createBST() 
{
    const bst = new BST('string');

    bst.insert('j');
    bst.insert('a');
    bst.insert('m');
    bst.insert('x');
    bst.insert('b');
    bst.insert('t');
    return bst;
}

describe('BST Validation - 1', () =>
{
    const bsTree = createBST();

    test('Valid size of Tree', () =>
    {
        let args = [];
        let count = 0;
        args.push(count);

        // The current node in the traversal is always the last
        // element of the args array
        const sizeFunc = (args) => args[0]++;

        bsTree.levelOrderTraversal(args, sizeFunc);
        expect(args[0]).toBe(6);
    });

    test('Check correct order of nodes in Tree', () =>
    {
        let args = [];
        args.push(true);

        const bstCheckOrder = function (args)
        {
            const node = args[args.length - 1];

            if (node.left !== null)
            {
                if (node.left.data >= node.data)
                {
                    args[0] = false;
                }
            }

            if (node.right !== null)
            {
                if (node.right.data <= node.data)
                {
                    args[0] = false;
                }
            }
        };

        bsTree.levelOrderTraversal(args, bstCheckOrder);
        expect(args[0]).toBe(true);
    });

    test('Check if non-root nodes have parent in Tree', () =>
    {
        let args = [];
        args.push(true);

        const bstCheckParent = function (args)
        {
            const node = args[args.length - 1];

            if (node.left !== null)
            {
                if (node.left.parent === null)
                {
                    args[0] = false;
                }
            }

            if (node.right !== null)
            {
                if (node.right.parent === null)
                {
                    args[0] = false;
                }
            }
        };

        bsTree.levelOrderTraversal(args, bstCheckParent);
        expect(args[0]).toBe(true);
    });

    test('Check correctness of parent-child relationship of nodes in Tree', () =>
    {
        let args = [];
        args.push(true);

        const bstCheckRelationship = function (args)
        {
            const node = args[args.length - 1];

            if (node.left !== null)
            {
                if (node.left.parent.data !== node.data)
                {
                    args[0] = false;
                }
            }

            if (node.right !== null)
            {
                if (node.right.parent.data !== node.data)
                {
                    args[0] = false;
                }
            }
        };

        bsTree.levelOrderTraversal(args, bstCheckRelationship);
        expect(args[0]).toBe(true);
    });

    test('Check if each node in Tree matches Tree"s input type', () =>
    {
        let args = [];
        args.push(true);

        const bstCheckInputType = function (args)
        {
            const node = args[args.length - 1];

            if (node.type !== bsTree.dataType)
            {
                args[0] = false;
            }
        };

        bsTree.levelOrderTraversal(args, bstCheckInputType);
        expect(args[0]).toBe(true);
    });
});
