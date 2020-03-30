import { distanceSquared } from '@flapjs/util/MathHelper.js';

export function computeElementsKey(elementType)
{
    return elementType && elementType.name;
}

export function UNSAFE_getGraphElementIds(graphState, elementType)
{
    return Object.keys(graphState[computeElementsKey(elementType)] || {});
}

export function UNSAFE_getGraphElements(graphState, elementType)
{
    return Object.values(graphState[computeElementsKey(elementType)] || {});
}

export function UNSAFE_getGraphElement(graphState, elementType, elementId)
{
    let graphElementMap = graphState[computeElementsKey(elementType)];
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
 * @param {Class<GraphElement>} elementType The element type to look for.
 * @param {number} x The x position to find the element.
 * @param {number} y The y position to find the element.
 * @param {number} radius The distance from the position to consider.
 * @returns {GraphElement} The graph element within the radius of the position. Null if not found.
 */
export function UNSAFE_findGraphElementWithinPosition(graphState, elementType, x, y, radius)
{
    let elements = UNSAFE_getGraphElements(graphState, elementType);
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
 * @param {Class<GraphElement>} elementType The element type to look for.
 * @param {number} fromX The top left x position.
 * @param {number} fromY The top left y position.
 * @param {number} toX The bottom right x position.
 * @param {number} toY The bottom right y position.
 * @returns {Array<GraphElement>} The graph elements within the box. Empty array if not found.
 */
export function UNSAFE_findGraphElementsWithinBox(graphState, elementType, fromX, fromY, toX, toY)
{
    // Swap them if from is NOT less than to (and the same for both dimensions).
    if (fromX > toX) { let x = toX; toX = fromX; fromX = x; }
    if (fromY > toY) { let y = toY; toY = fromY; fromY = y; }

    let dst = [];
    let elements = UNSAFE_getGraphElements(graphState, elementType);
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
