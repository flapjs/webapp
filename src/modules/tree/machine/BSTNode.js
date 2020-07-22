class BSTNode
{
    constructor(type, data) 
    {
        this.type = type;
        this.parent = null;
        this.data = data;
        this.left = null;
        this.right = null;
    }

    //destructor is taken care of in tree class ?
    getData()
    {
        return this.data;
    }

    isValid(tree)
    {
        if (this.type === tree.dataType)
        {
            return true;
        }

        return false;
    }

    /**
     * This function obtains the successor of the caller BSTNode, if it has
     * such a successor
     */
    getSuccessor()
    {
        let curNode = this;
        let lagNode = this;

        if (curNode.right !== null)
        {
            curNode = curNode.right;

            while (curNode.left !== null)
            {
                curNode = curNode.left;
            }

            return curNode;
        }

        else
        {
            if (curNode.parent === null)
            {
                // // alert('No successor in tree');
                return null;
            }
            curNode = curNode.parent;
            while (curNode !== null)
            {
                if (curNode.left !== null && curNode.left.data === lagNode.data)
                {
                    return curNode;
                }
                curNode = curNode.parent;
                lagNode = lagNode.parent;
            }
            // // alert('No successor in tree');
            return null;
        }
    }

    /**
     * This function obtains the predecessor of the caller BSTNode, if it has
     * such a predecessor
     */
    getPredecessor()
    {
        let curNode = this;
        let lagNode = this;

        if (curNode.left !== null)
        {
            curNode = curNode.left;

            while (curNode.right !== null)
            {
                curNode = curNode.right;
            }

            return curNode;
        }

        else
        {
            if (curNode.parent === null)
            {
                // // alert('No successor in tree');
                return null;
            }
            curNode = curNode.parent;
            while (curNode !== null)
            {
                if (curNode.right !== null && curNode.right.data === lagNode.data)
                {
                    return curNode;
                }
                curNode = curNode.parent;
                lagNode = lagNode.parent;
            }
            // // alert('No successor in tree');
            return null;
        }
    }

    /**
     * Default comparator for BST using the '<' operator. This is used as the default
     * behavior of insert/lookup/remove -- if data to be inserted is less than
     * current node's data, go left; otherwise go right)
     *
     * @param {BSTNode} otherNode The second node used to compare with the caller object
     */
    defaultBSTComparator(otherNode)
    {
        return this.data < otherNode.data;
    }

    /**
     * General comparator function that allows for default or custom comparison
     * behavior. If a custom comparator is specified, then this function runs
     * the custom comparator on otherNode. Otherwise, this function runs
     * defaultBSTComparator on otherNode by default.
     *
     * @param {BSTNode} otherNode The second node used to compare with the caller object
     * @param {BSTNode} customComparator The custom comparator to replace the default one
     */
    comparator(otherNode, customComparator)
    {
        if (typeof customComparator === 'undefined')
        {
            return this.defaultBSTComparator(otherNode);
        }

        else
        {
            return customComparator(this, otherNode);
        }
    }
}
export default BSTNode;

