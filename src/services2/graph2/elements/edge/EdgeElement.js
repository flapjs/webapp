import GraphElement from '../GraphElement.js';

export default class EdgeElement extends GraphElement
{
    constructor(id, opts = {})
    {
        super(id, opts);

        // A node's id
        this.fromId = opts.fromId;
        // A node's id (or null)
        this.toId = opts.toId || null;
        this.label = opts.label || '';
        // Used to move the endpoint to a custom position (like a cursor)
        this.proxyTo = opts.proxyTo || null;

        // NOTE: DO NOT MANUALLY EDIT THIS! Refer to EdgeElementComponent for more info.
        this._x = 0;
        this._y = 0;

        // These are options expected by QuadraticEdgeHelper functions...

        // The length of the edge if it is a placeholder
        this.placeholderLength = 15,
        // Whether to force draw as a line (not a quadratic)
        this.forceLine = false,
        // The margins at the endpoints
        this.margin = 0,
        // The quadratic options
        this.quad = {
            radians: 0,
            length: 0,
            coords: { x: 0, y: 0 },
        };
    }

    get x() { return this._x; }
    get y() { return this._y; }
}
