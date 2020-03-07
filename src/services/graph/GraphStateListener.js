/**
 * @module GraphStateListener
 * @description
 * This allows you to listen for ALL "minute" details, not just specific to a element.
 * 
 * Refer to GraphElementListener for more details.
 */

/**
 * The key to all registered event listeners for the graph state.
 */
const STATE_LISTENERS = Symbol('stateListeners');

/**
 * Adds a listener for changes (from markDirty()) in the graph element map.
 * 
 * @param {object} graphState The graph state to listen for changes.
 * @param {Function} listener The callback to be called if any changes occur.
 */
export function addStateListener(graphState, listener)
{
    if (!(STATE_LISTENERS in graphState)) graphState[STATE_LISTENERS] = [];
    graphState[STATE_LISTENERS].push(listener);
}

/**
 * Stops a listener from handling any more changes (from markDirty()) in the graph element map.
 * 
 * @param {object} graphState The graph state to stop listening to.
 * @param {Function} listener The listening callback to be removed.
 */
export function removeStateListener(graphState, listener)
{
    if (!(STATE_LISTENERS in graphState)) return;
    graphState[STATE_LISTENERS].splice(graphState[STATE_LISTENERS].indexOf(listener), 1);
}

/**
 * Gets an array of active listeners for the graph element map.
 * 
 * @param {object} graphState The graph state to get listeners for.
 * @returns {Array<Function>} An array of listeners.
 */
export function getStateListeners(graphState)
{
    return graphState[STATE_LISTENERS] || [];
}
