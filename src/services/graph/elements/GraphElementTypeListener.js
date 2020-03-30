/**
 * @module GraphElementTypeListener
 * @description
 * This allows you to listen for changes for all elements of a type.
 * 
 * Refer to GraphElementListener for more details.
 */

/**
 * The key to all registered event listeners for the graph type.
 */
const ELEMENT_TYPE_LISTENERS = Symbol('elementTypeListeners');

/**
 * Adds a listener for changes (from markDirty()) in the graph element map.
 * 
 * @param {object} graphElementMap The graph element map to listen for changes.
 * @param {Function} listener The callback to be called if any changes occur.
 */
export function addElementTypeListener(graphElementMap, listener)
{
    if (!(ELEMENT_TYPE_LISTENERS in graphElementMap)) graphElementMap[ELEMENT_TYPE_LISTENERS] = [];
    graphElementMap[ELEMENT_TYPE_LISTENERS].push(listener);
}

/**
 * Stops a listener from handling any more changes (from markDirty()) in the graph element map.
 * 
 * @param {object} graphElementMap The graph element map to stop listening to.
 * @param {Function} listener The listening callback to be removed.
 */
export function removeElementTypeListener(graphElementMap, listener)
{
    if (!(ELEMENT_TYPE_LISTENERS in graphElementMap)) return;
    graphElementMap[ELEMENT_TYPE_LISTENERS].splice(graphElementMap[ELEMENT_TYPE_LISTENERS].indexOf(listener), 1);
}

/**
 * Gets an array of active listeners for the graph element map.
 * 
 * @param {object} graphElementMap The graph element map to get listeners for.
 * @returns {Array<Function>} An array of listeners.
 */
export function getElementTypeListeners(graphElementMap)
{
    return graphElementMap[ELEMENT_TYPE_LISTENERS] || [];
}
