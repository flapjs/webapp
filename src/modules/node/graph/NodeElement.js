import GraphElement from './GraphElement.js';

export default class NodeElement extends GraphElement
{
    constructor(graph, id, opts)
    {
        super(graph, id, opts);

        this.x = 0;
        this.y = 0;
        this.label = '';
    }

    /** @override */
    onUpdate(source)
    {

    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
        this.markDirty();
        return this;
    }

    setLabel(label)
    {
        this.label = label;
        this.markDirty();
        return this;
    }
}

