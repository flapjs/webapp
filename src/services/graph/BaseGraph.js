import { distanceSquared } from '@flapjs/util/MathHelper.js';
import SemanticVersion from '@flapjs/util/SemanticVersion.js';

/** This is the base graph. IT SHOULD NEVER HAVE ANY INSTANCE METHODS! ONLY STATIC METHODS ARE ALLOWED! */
export default class BaseGraph
{
    /** Graph types are by design to NOT BE INSTANTIATABLE. It only has static methods and no state. */
    constructor()
    {
        throw new Error('A graph type cannot be instantiated.');
    }

    /**
     * @abstract
     * @returns {object} An object map of element type keys to classes.
     */
    static get elementTypes() { return {}; }
    
    /**
     * This version guards graph serialization. Any changes to the format of the data should change the
     * major version number (this will force future serializers to recognize incompatible data formats).
     * Any changes that do not affect the data format should change the minor or bugfix version numbers
     * (serializers would recognize that, although a change has occured, it can still safely load from
     * the same format).
     *
     * @abstract
     * @returns {string} The version of this graph implementation in semantic versioning.
     */
    static get version() { return '0.0.0'; }

    /**
     * @abstract
     * @param {object} state The previous graph state.
     * @param {object} action The object containing action type and options.
     * @param {string} action.type The type of action to be performed.
     * @returns {object} The new graph state. If it is falsey, it is assumed to be the previous state.
     */
    static reducer(state, action) {}

    /* ===================== Serialization ===================== */

    static serialize(graphState, graphData, opts = {})
    {
        for(let [key, elementType] of Object.entries(this.elementTypes))
        {
            // Already processed...
            if (key in graphData) continue;
            /// Not yet processed...
            if (key in graphState)
            {
                let elementDataMap = {};
                for(let [id, element] of Object.entries(graphState[key]))
                {
                    elementDataMap[id] = elementType.serialize(element, {});
                }
                graphData[key] = elementDataMap;
            }
        }

        // Version checking...
        graphData.__metadata__ = {
            graphType: this.name,
            version: this.version,
        };

        return graphData;
    }

    static deserialize(graphData, graphState, opts = {})
    {
        // Version checking...
        if (!opts.forceIgnoreVersion)
        {
            if (!graphData || !('__metadata__' in graphData)) throw new Error('Missing metadata.');
    
            if (this.name !== graphData.__metadata__.graphType)
            {
                throw new Error('Mismatched metadata graph type.');
            }
    
            if (!SemanticVersion.parse(this.version).canSupportVersion(graphData.__metadata__.version))
            {
                throw new Error(`Unsupported graph parser version - ${this.version} cannot support `
                    + graphData.__metadata__.version);
            }
        }
        
        for(let [key, elementType] of Object.entries(this.elementTypes))
        {
            if (key in graphData)
            {
                let elements = {};
                for(let [id, elementData] of Object.entries(graphData[key]))
                {
                    let instance = new (elementType)(id);
                    elements[id] = elementType.deserialize(instance, elementData);
                }
                graphState[key] = elements;
            }
        }

        return graphState;
    }

    /* ===================== Helper functions ===================== */
    
    /**
     * Computes the hash for the given graph.
     * 
     * @param {typeof BaseGraph} graphType The type of the graph.
     * @param {object} graphState The graph state.
     * @returns {number} The hash code representing the state of the graph.
     */
    static hashCode(graphType, graphState)
    {
        return 0;
    }

    static getElementTypeKeyForElementType(elementType)
    {
        for(let [key, value] of Object.entries(this.elementTypes))
        {
            if (elementType === value)
            {
                return key;
            }
        }
        return 'unknown';
    }

    static getElementIds(graphState, elementType)
    {
        return Object.keys(graphState[this.getElementTypeKeyForElementType(elementType)] || {});
    }

    static getElements(graphState, elementType)
    {
        return Object.values(graphState[this.getElementTypeKeyForElementType(elementType)] || {});
    }
    
    static getElement(graphState, elementType, elementId)
    {
        let graphElementMap = graphState[this.getElementTypeKeyForElementType(elementType)];
        if (graphElementMap && elementId in graphElementMap)
        {
            return graphElementMap[elementId];
        }
        else
        {
            return null;
        }
    }
    
    /**
     * Finds a graph element of the given type within the radius of the position.
     * Assumes the given element type has "x" and "y" as properties describing their position.
     * 
     * @param {object} graphState The graph state containing the list of current elements.
     * @param {typeof GraphElement} elementType The element type to look for.
     * @param {number} x The x position to find the element.
     * @param {number} y The y position to find the element.
     * @param {number} radius The distance from the position to consider.
     * @returns {GraphElement} The graph element within the radius of the position. Null if not found.
     */
    static findElementWithinRadius(graphState, elementType, x, y, radius)
    {
        let elements = this.getElements(graphState, elementType);
        if (elements)
        {
            let radiusSquared = radius * radius;
            for(let element of elements)
            {
                let dist = distanceSquared(x, y, element.x, element.y);
                if (dist <= radiusSquared) return element;
            }
        }
        return null;
    }

    /**
     * Finds a graph element of the given type within the radius of the position.
     * Assumes the given element type has "x" and "y" as properties describing their position.
     * 
     * @param {object} graphState The graph state containing the list of current elements.
     * @param {typeof GraphElement} elementType The element type to look for.
     * @param {number} fromX The top left x position.
     * @param {number} fromY The top left y position.
     * @param {number} toX The bottom right x position.
     * @param {number} toY The bottom right y position.
     * @returns {Array<GraphElement>} The graph elements within the box. Empty array if not found.
     */
    static findElementsWithinBox(graphState, elementType, fromX, fromY, toX, toY)
    {
        // Swap them if from is NOT less than to (and the same for both dimensions).
        if (fromX > toX) { let x = toX; toX = fromX; fromX = x; }
        if (fromY > toY) { let y = toY; toY = fromY; fromY = y; }

        let dst = [];
        let elements = this.getElements(graphState, elementType);
        if (elements)
        {
            for(let element of elements)
            {
                let { x, y } = element;
                if (fromX <= x && x <= toX && fromY <= y && y <= toY)
                {
                    dst.push(element);
                }
            }
        }
        return dst;
    }
}
