/**
 * @module GraphElementListener
 * @description
 * You may notice that is you useContext(GraphStateContext), sometimes changes on the
 * graph don't propagate. That is intentional. Use this to listen for "minute" changes
 * in the graph elements that don't incur a re-render.
 * 
 * These functions allow anyone to "listen" for changes in a graph element. Whenever
 * a graph element is marked dirty and then cleaned, the registered event listeners
 * will fire, allowing anyone to handle that change.
 * 
 * This is mostly used by GraphHooks and GraphElementHooks to implement their functionality.
 * 
 * For practical uses, refer to GraphHooks or GraphElementHooks.
 */

/**
 * The key to all registered event listeners for a graph element.
 */
const ELEMENT_LISTENERS = Symbol('elementListeners');

/**
 * Adds a listener for changes (from markDirty()) in the graph element.
 * 
 * @param {GraphElement} graphElement The graph element to listen for changes.
 * @param {Function} listener The callback to be called if any changes occur.
 */
export function addElementListener(graphElement, listener)
{
    if (!(ELEMENT_LISTENERS in graphElement)) graphElement[ELEMENT_LISTENERS] = [];
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
    if (!(ELEMENT_LISTENERS in graphElement)) return;
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
    return graphElement[ELEMENT_LISTENERS] || [];
}
