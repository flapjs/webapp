import { distanceSquared } from '@flapjs/util/MathHelper.js';
import { UNSAFE_getGraphElements } from '../GraphContext.jsx';

/**
 * Finds a graph element of the given type within the radius of the position.
 * Assumes the given element type has "x" and "y" as properties describing their position.
 * 
 * @param {object} graphState The graph state containing the list of current elements.
 * @param {Class<GraphElement>} elementType The element type to look for.
 * @param {number} x The x position to find the element.
 * @param {number} y The y position to find the element.
 * @param {number} radius The distance from the position to consider.
 * @returns {GraphElement} The graph element within the radius of the position. Null if not found.
 */
export function findGraphElementWithinPosition(graphState, elementType, x, y, radius)
{
    let elements = UNSAFE_getGraphElements(graphState, elementType);
    if (elements)
    {
        let radiusSquared = radius * radius;
        for(let element of Object.values(elements))
        {
            let dist = distanceSquared(x, y, element.x, element.y);
            if (dist <= radiusSquared) return element;
        }
    }
    return null;
}
