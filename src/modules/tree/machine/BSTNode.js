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
}
export default BSTNode;

