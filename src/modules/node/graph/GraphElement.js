export default class GraphElement
{
    constructor(graph, id, opts)
    {
        this._graph = graph;
        this._id = id;
        this._dirty = true;
        this._dirtySource = null;
    }

    get graph() { return this._graph; }
    get id() { return this._id; }

    /**
     * @abstract
     * @param {object} source The source that caused the update (could be null).
     */
    onUpdate(source) {}

    update(source) { this._dirty = false; this.onUpdate(source); }
    isDirty() { return this._dirty; }
    markDirty(source = null, force = true)
    {
        this._dirty = force;
        this._dirtySource = source;
        return this;
    }
}
