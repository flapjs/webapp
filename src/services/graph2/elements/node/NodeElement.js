import GraphElement from '../GraphElement.js';

export default class NodeElement extends GraphElement
{
    constructor(id, opts)
    {
        super(id, opts);

        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.label = opts.label || '';
        this.radius = opts.radius || NodeElement.RADIUS;
    }
}
NodeElement.RADIUS = 10;
