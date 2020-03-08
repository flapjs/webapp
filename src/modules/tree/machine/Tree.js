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
    {alert('clear hasnt been overridden');}

    validate()
    {alert('validate hasnt been overridden');}

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
    {alert('insert hasnt been overridden');}

    find()
    {alert('find hasnt been overridden');}

    delete()
    {alert('delete hasnt been overridden');}

}

export default Tree;
