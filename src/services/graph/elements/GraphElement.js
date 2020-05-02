const ID = Symbol('elementId');
const DEAD = Symbol('dead');
const DIRTY = Symbol('dirty');

/**
 * This class represents the data for the interactive elements of a graph, such as the nodes or edges.
 * This serves as the data model for the graph and will be used by renderers. Any changes made to this
 * object's properties, that should propagate to other listeners, should markDirty(). That way, the graph
 * itself will know to notify everyone else. This feature is managed by GraphContext, GraphHooks, and
 * GraphElementHooks.
 * 
 * It can also serialize and deserialize itself :) Because of this functionality, EVERY graph element
 * must be able to be instantiated with only an "id" argument. Any additional args will not be provided
 * nor stored by the serializer. Additional arguments will only be used when instantiating during active
 * app use. This feature is mainly used by state serializers to load/save graphs.
 */
export default class GraphElement
{
    constructor(id, opts = {})
    {
        this[ID] = id;
        this[DIRTY] = true;
        this[DEAD] = false;
    }

    get type() { return this.constructor; }
    get id() { return this[ID]; }

    /**
     * This will be called when this object is reconciled with the rendered component,
     * thereby "updating" to the correct state.
     * 
     * Basically when it changes from dirty to clean.
     * 
     * @abstract
     */
    onUpdate() {}

    /**
     * Called when this element is removed from the graph.
     * 
     * Basically, when it changes from alive to dead.
     * 
     * @abstract
     * @param {typeof BaseGraph} graphType The graph type.
     * @param {object} graphState The new, mutable graph state.
     */
    onDestroy(graphType, graphState) {}

    markDirty(force = true) { this[DIRTY] = force; }
    isDirty() { return this[DIRTY]; }
    
    markDead(force = true) { this[DEAD] = force; }
    isDead() { return this[DEAD]; }
    
    /**
     * Attempts to serialize this element. Any function properties will be skipped.
     * Any object properties will be serialized by JSON.stringify().
     *
     * @param {GraphElement} instance The graph element to serialize.
     * @param {object} data The data object to serialize to.
     * @returns {object} The serialized data object.
     */
    static serialize(instance, data)
    {
        let warnings = [];
        for(let key of Object.keys(instance))
        {
            // Don't serialize something already serialized.
            if (key in data) continue;

            let value = instance[key];

            // We won't be serializing functions, thank you.
            if (typeof value === 'function') continue;

            // ...maybe objects...
            if (typeof value === 'object')
            {
                warnings.push(key);
                value = '__OBJECT__' + JSON.stringify(value);
            }

            data[key] = value;
        }

        if (warnings.length > 0)
        {
            // eslint-disable-next-line no-console
            console.warn('Be careful trying to serialize a graph element with nested objects!'
                + ' You should perhaps implement your own serializer to handle these properties: '
                + `${warnings.join(', ')}.`);
        }
        return data;
    }

    /**
     * Attempts to deserialize the data into the instance of this class.
     *
     * @param {GraphElement} instance A new instance to be deserialized into.
     * @param {object} data The data object to deserialize from.
     * @returns {GraphElement} The deserialized instance.
     */
    static deserialize(instance, data)
    {
        for(let key of Object.keys(data))
        {
            let value = data[key];

            // Could be our previous attempt at serializing nested objects...
            if (typeof value === 'string' && value.startsWith('__OBJECT__'))
            {
                value = JSON.parse(value.substring('__OBJECT__'.length));
            }
            else if (typeof value === 'object')
            {
                value = {...value};
            }

            instance[key] = value;
        }
        return instance;
    }
}
