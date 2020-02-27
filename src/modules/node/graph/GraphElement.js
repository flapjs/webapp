const DIRTY = Symbol('dirty');
const ELEMENT_LISTENERS = Symbol('elementListeners');

/**
 * This class represents the data for the interactive elements of a graph, such as the nodes or edges.
 * This serves as the data model for the graph and will be used by renderers. Any changes made to this
 * object's properties that should propagate to other listeners should markDirty(). That way, the graph
 * itself will know to notify everyone else.
 * 
 * Also, the class name MUST BE UNIQUE. It is used as the key to access its instances.
 */
export default class GraphElement
{
    constructor(id, opts = {})
    {
        this._id = id;

        this[DIRTY] = true;
        this[ELEMENT_LISTENERS] = [];
    }

    get id() { return this._id; }

    /** @abstract */
    update() {}
    /** @abstract */
    destroy() {}

    markDirty(force = true) { this[DIRTY] = force; }
    isDirty() { return this[DIRTY]; }
}

/**
 * Adds a listener for changes (from markDirty()) in the graph element.
 * 
 * @param {GraphElement} graphElement The graph element to listen for changes.
 * @param {Function} listener The callback to be called if any changes occur.
 */
export function addElementListener(graphElement, listener)
{
    graphElement[ELEMENT_LISTENERS].push(listener);
}

/**
 * Stops a listener from handling any more changes (from markDirty()) in the graph element.
 * 
 * @param {GraphElement} graphElement The graph element to stop listening to.
 * @param {Function} listener The listening callback to be removed.
 */
export function removeElementListener(graphElement, listener)
{
    graphElement[ELEMENT_LISTENERS].splice(graphElement[ELEMENT_LISTENERS].indexOf(listener), 1);
}

/**
 * Gets an array of active listeners for the graph element.
 * 
 * @param {GraphElement} graphElement The graph element.
 * @returns {Array<Function>} An array of listeners.
 */
export function getElementListeners(graphElement)
{
    return graphElement[ELEMENT_LISTENERS];
}
