import GraphElement from '@flapjs/services2/graph/elements/GraphElement.js';

// NOTE: Since the default serializer depends on enumerable properties,
// this will make sure the value is not "discoverable" and won't be
// serialized (symbols are not enumerable by default).
const PRIVATE_X_KEY = Symbol('x');
const PRIVATE_Y_KEY = Symbol('y');
const PROXY_TO = Symbol('proxyTo');

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
        this[PROXY_TO] = opts.proxyTo || null;

        // NOTE: DO NOT MANUALLY EDIT THIS! Refer to EdgeElementComponent for more info.
        this[PRIVATE_X_KEY] = 0;
        this[PRIVATE_Y_KEY] = 0;

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

    // This let's the interface have these properties, but won't be enumerated (will not be discovered by the serializer).
    get x() { return this[PRIVATE_X_KEY]; }
    get y() { return this[PRIVATE_Y_KEY]; }
    get proxyTo() { return this[PROXY_TO]; }
    set proxyTo(value) { this[PROXY_TO] = value; }

    static updatePosition(edge, x, y)
    {
        edge[PRIVATE_X_KEY] = x;
        edge[PRIVATE_Y_KEY] = y;
        return edge;
    }

    /** @override */
    static serialize(instance, data = {})
    {
        data.quad = { ...instance.quad };
        data.quad.coords = { ...instance.quad.coords };
        return super.serialize(instance, data);
    }
}
