import GraphElement from './GraphElement.js';

export default class EdgeElement extends GraphElement
{
    constructor(id, opts)
    {
        super(id, opts);

        // A node's id
        this.fromId = opts.from;
        // A node's id (or null)
        this.toId = opts.to || null;
        this.label = opts.label || '';
        // Used to move the endpoint to a custom position (like a cursor)
        this.proxyTo = opts.proxyTo || null;
        // The length of the edge if it is a placeholder
        this.placeholderLength = 10;
        // Whether to force draw as a line (not a quadratic)
        this.forceLine = false;
        // The margins at the endpoints
        this.margin = {
            from: 10,
            to: 10,
        };
        // The quadratic options
        this.quad = {
            radians: 0,
            length: 0,
            coords: { x: 0, y: 0 },
        };
    }
}
