class Tree
{
    constructor()
    {
        this.root = null;
        this.size = 0;
        this.treeType = null;
        this.inputType = null;
        this._errors = [];
    }

    clear()
    {
        throw new Error('clear hasnt been overridden');
    }

    validate()
    {
        throw new Error('validate hasnt been overridden');
    }

    isValid()
    { return this._errors.length === 0; }

    getErrors()
    { return this._errors; }

    getSize()
    { return this.size; }

    getRoot()
    { return this.root;}

    isEmpty()
    { return this.size === 0;}

    insert()
    {throw new Error('insert hasnt been overridden');}

    find()
    {throw new Error('find hasnt been overridden');}

    delete()
    {throw new Error('delete hasnt been overridden');}

}

export default Tree;
