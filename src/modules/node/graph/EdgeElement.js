import GraphElement from './GraphElement.js';

export default class EdgeElement extends GraphElement
{
    constructor(graph, id, opts)
    {
        super(graph, id, opts);

        // A node's id
        this.fromId = null;
        // A node's id (or null)
        this.toId = null;
        this.label = '';
        // Used to move the endpoint to a custom position (like a cursor)
        this.proxyTo = null;
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

    /** @override */
    onUpdate(source)
    {

    }

    setQuadRadians(radians)
    {
        this.quad.radians = radians;
        this.markDirty();
        return this;
    }

    setForceLine(value)
    {
        this.forceLine = value;
        this.markDirty();
        return this;
    }

    setProxyTo(point)
    {
        this.proxyTo = point;
        this.markDirty();
        return this;
    }

    setFrom(nodeElementId)
    {
        this.fromId = nodeElementId;
        this.markDirty();
        return this;
    }

    setTo(nodeElementId)
    {
        this.toId = nodeElementId;
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

