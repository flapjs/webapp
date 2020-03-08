import GraphElement from '@flapjs/services/graph/elements/GraphElement.js';

// NOTE: Since the default serializer depends on enumerable properties,
// this will make sure the value is not "discoverable" and won't be
// serialized (symbols are not enumerable by default).
const PRIVATE_X_KEY = Symbol('x');
const PRIVATE_Y_KEY = Symbol('y');

export default class EdgeElement extends GraphElement
{
    constructor(id, opts = {})
    {
        super(id, opts);

        // A node's id
        this.fromId = opts.fromId;
        // A node's id (or 0)
        this.toId = opts.toId || 0;
        this.label = opts.label || '';

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
