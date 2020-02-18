import Tree from './Tree.js';
import BSTNode from './BSTNode.js';

class BST extends Tree
{
    constructor(dataType)
    {
        super();
        this.root = null;
        this.size = 0;
        this.treeType = 'bst';
        this.dataType = dataType;
        this._errors = [];
        this._warnings = [];
    }
    insert(data)
    {
        if (!(this.validateData(data)))
        {
            //TODO: Throw error for invalid node
            alert('Invalid data');
            return;
        }

        if (this.root === null)
        {
            this.root = new BSTNode(this.dataType, data);
            return;
        }
        let curNode = this.root;
        function recursiveInsert(curNode, dataType)
        {
            if (curNode.data === data)
            {
                //TODO: how to throw error?
                alert('ERROR: Duplicate data inserted');
                return;
            }
            //TODO: Maybe have a custom comparator object???
            else if (data < curNode.data)
            {
                if (curNode.left === null)
                {
                    curNode.left = new BSTNode(dataType, data);
                    curNode.left.parent = curNode;
                    return;
                }
                recursiveInsert(curNode.left, dataType);
            }
            else
            {
                if (curNode.right === null)
                {
                    curNode.right = new BSTNode(dataType, data);
                    curNode.right.parent = curNode;
                    return;
                }
                recursiveInsert(curNode.right, dataType);
            }
        }
        recursiveInsert(curNode, this.dataType);
        return;
    }

    validateData(data)
    {
        return typeof data === this.dataType;
    }

    find(data)
    {
        if (!(this.validateData(data)))
        {
            //TODO: Throw error for invalid node
            alert('Invalid data');
            return;
        }
        let curNode = this.root;
        function recursiveFind(curNode)
        {
            if (curNode === null)
            {
                return false;
            }
            if (data < curNode.data)
            {
                return recursiveFind(curNode.left);
            }
            else if (data > curNode.data)
            {
                return recursiveFind(curNode.right);
            }
            return true;
        }
        return recursiveFind(curNode);
    }

    delete(data)
    {
        if (!(this.validateData(data)))
        {
            //TODO: Throw error for invalid node
            alert('Invalid data');
            return;
        }
        const bst = this;
        let curNode = this.root;
        function recursiveDelete(curNode)
        {
            if (curNode === null)
            {
                alert('Attempting to delete nonexistant node');
            }

            if (curNode.data === data) 
            {
                //no children
                if (curNode.left === null && curNode.right === null)
                {
                    if (bst.root.data === curNode.data)
                    {
                        bst.root = null;
                        return;
                    }

                    if (curNode.parent.left.data === data)
                    {
                        curNode.parent.left = null;
                    }
                    else
                    {
                        curNode.parent.right = null;
                    }
                    return;
                }

                //2 children
                else if (curNode.left !== null && curNode.right !== null)
                {
                    let successor = curNode;
                    successor = successor.right;
                    while (successor.left !== null)
                    {
                        successor = successor.left;
                    }
                    curNode.data = successor.data;

                    /*
                     * Reset data to remove the successor node after obtaining its 
                     * data (since recursiveDelete() uses delete's data())
                     */
                    data = successor.data;
                    recursiveDelete(successor);
                }

                //1 child
                else
                {
                    if (curNode.parent.left.data === data)
                    {
                        if (curNode.left !== null)
                        {
                            curNode.parent.left = curNode.left;
                            curNode.left.parent = curNode.parent;
                        }
                        else
                        {
                            curNode.parent.left = curNode.right;
                            curNode.right.parent = curNode.parent;
                        }
                    }
                    else
                    {
                        if (curNode.left !== null)
                        {
                            curNode.parent.right = curNode.left;
                            curNode.left.parent = curNode.parent;
                        }
                        else
                        {
                            curNode.parent.right = curNode.right;
                            curNode.right.parent = curNode.parent;
                        }
                    }
                    return;
                }
            }
            else if (curNode.data < data)
            {
                if (curNode.right !== null) 
                {
                    recursiveDelete(curNode.right);
                }
                else
                {
                    alert('Invalid delete of a non-existent node');
                }
            }
            else
            {
                if (curNode.left !== null)
                {
                    recursiveDelete(curNode.left);
                }
                else
                {
                    alert('Invalid delete of a non-existent node');
                }
            }
        }

        recursiveDelete(curNode);
    }

    isValidBST()
    {
        let curNode = this.root;

        let prev = null;

        function recursiveIsValidBST(curNode)
        {
            let rightNode = null;
            let leftNode = null;
            if (curNode.left)
            {
                leftNode = curNode.left;
                prev = curNode;
                if (leftNode.data < prev.data)
                {
                    recursiveIsValidBST(leftNode);
                }
                else
                {
                    return false;
                }
            }
            if (curNode.right)
            {
                rightNode = curNode.right;
                prev = curNode;
                if (rightNode.data > prev.data)
                {
                    recursiveIsValidBST(rightNode);
                }
                else
                {
                    return false;
                }
            }
            return true;
        }
        return recursiveIsValidBST(curNode);
    }

    inOrder(traversal, func)
    {
        let curNode = this.root;

        function recursiveInOrder(curNode, traversal, func)
        {
            if (!curNode)
            {
                return;
            }
            if (curNode.left)
            {
                recursiveInOrder(curNode.left, traversal, func);
            }
            if (func)
            {
                func();
            }
            traversal.push(curNode.getData());
            if (curNode.right)
            {
                recursiveInOrder(curNode.right, traversal, func);
            }
        }
        recursiveInOrder(curNode, traversal, func);
    }

    preOrder(traversal, func)
    {
        let curNode = this.root;


        function recursivePreOrder(curNode, traversal, func)
        {
            if (!curNode)
            {
                return;
            }
            if (func)
            {
                func();
            }
            traversal.push(curNode.getData());

            if (curNode.left)
            {

                recursivePreOrder(curNode.left, traversal, func);
            }
            if (curNode.right)
            {
                recursivePreOrder(curNode.right, traversal, func);
            }
        }
        recursivePreOrder(curNode, traversal, func);
    }

    postOrder(traversal, func)
    {
        let curNode = this.root;


        function recursivePostOrder(curNode, traversal, func)
        {
            if (!curNode)
            {
                return;
            }
            if (curNode.left)
            {
                recursivePostOrder(curNode.left, traversal, func);
            }
            if (curNode.right)
            {
                recursivePostOrder(curNode.right, traversal, func);
            }
            if (func)
            {
                func();
            }
            traversal.push(curNode.getData());
        }
        recursivePostOrder(curNode, traversal, func);
    }

    levelOrderTraversal(args, actionFunction)
    {
        let nodeQueue = [];
        let levelOrder = [];

        if (this.root === null)
        {
            alert('No root in tree');
            return [];
        }

        let curr = this.root;
        nodeQueue.push(curr);

        while (!(nodeQueue.length == 0))
        {
            curr = nodeQueue.shift();
            levelOrder.push(curr);

            if (typeof actionFunction !== 'undefined')
            {
                actionFunction(curr, args);
            }

            if (curr.left !== null)
            {
                nodeQueue.push(curr.left);
            }

            if (curr.right !== null)
            {
                nodeQueue.push(curr.right);
            }
        }

        return levelOrder;
    }
}
export default BST;
