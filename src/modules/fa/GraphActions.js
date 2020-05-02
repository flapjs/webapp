/**
 * # How to use Graph Actions.
 * 
 * These are ways you can manipulate the graph, like create and delete, from within
 * a render function. There are some restrictions:
 * - **Front-end only.** You should only use this if you are doing some logic that is a
 * result of a UI action, like a button click.
 * - **Single-use.** You must NEVER call it in a for loop. Only 1 action can be called
 * per render (as a call to it will cause the component, and many others, to
 * re-render). That means you can call it in different event handlers in a single render
 * method, but you cannot "chain" actions one after another. If you do need this behavior
 * you will have to make a new graph action.
 * - **Must useGraphDispatch() first.** Just make sure to call it at the top of your
 * render function.
 * 
 * Mischief managed.
 */

/**
 * @typedef {typeof import('@flapjs/services/graph/elements/GraphElement.js').default} GraphElementClass
 */

/**
 * Deletes all elements of the given type in the graph.
 * 
 * @param {Function} graphDispatch The result of useGraphDispatch().
 * @param {GraphElementClass} elementType The graph element type class you want to delete.
 * @param {Array<string>} elementIds The graph element ids you want to delete.
 */
export function doGraphDeleteAll(graphDispatch, elementType, elementIds)
{
    graphDispatch({ type: 'deleteAll', elementType, elementIds });
}

/**
 * Deletes one element of the given type in the graph.
 * 
 * @param {Function} graphDispatch The result of useGraphDispatch().
 * @param {GraphElementClass} elementType The graph element type class you want to delete.
 * @param {string} elementId The graph element id you want to delete.
 */
export function doGraphDeleteOne(graphDispatch, elementType, elementId)
{
    graphDispatch({ type: 'delete', elementType, elementId });
}
