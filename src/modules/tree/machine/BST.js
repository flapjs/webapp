
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
            //this.root = new BSTNode(data);
            return;
        }
        let curNode = this.root;
        function recursiveInsert(curNode)
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
                    //curNode.left = new BSTNode(data);
                    curNode.left.parent = curNode;
                    return;
                }
                recursiveInsert(curNode.left);
            }
            else
            {
                if (curNode.right === null)
                {
                    //curNode.right = new BSTNode(data);
                    curNode.right.parent = curNode;
                    return;
                }
                recursiveInsert(curNode.right);
            }
        }
        recursiveInsert(curNode);
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
      let curNode = this.root;
      function recursiveDelete(curNode)
      {
        if(curNode === null)
        {
          alert('Attempting to delete nonexistant node');
        }
        if(curNode.data === data) {
          //no children
          if(curNode.left === null && curNode.right === null)
          {
            if (curNode.parent.left.data === data) {
              curNode.parent.left = null;
            }
            else {
              curNode.parent.right = null;
            }
            return;
          }

          //2 children
          else if(curNode.left !== null && curNode.right !== null)
          {
            let successor = curNode;
            successor = successor.right;
            while(successor.left !== null)
            {
              successor = successor.left;
            }
            curNode.data = successor.data;
            recursiveDelete(successor);
          }

          //1 child
          else
          {
            if(curNode.parent.left.data === data) {
              if(curNode.left !== null)
              {
                curNode.parent.left = curNode.left;
              }
              else
              {
                curNode.parent.right = curNode.left;
              }
            }
            else {
              if(curNode.left !== null)
              {
                curNode.parent.left = curNode.right;
              }
              else
              {
                curNode.parent.right = curNode.right;
              }
            }
          }
        }
      }
      recursiveDelete(curNode);
    }
}
export default BST;
