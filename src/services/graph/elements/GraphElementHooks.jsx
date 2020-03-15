import { useEffect } from 'react';
import { addElementListener, removeElementListener } from './GraphElementListener.js';
import { addElementTypeListener, removeElementTypeListener } from './GraphElementTypeListener.js';

import { UNSAFE_useGraphStateContext } from '../GraphContext.jsx';
import { useGraphType } from '../GraphHooks.jsx';

export function useGraphElementIds(elementType)
{
    const graphType = useGraphType();
    // This is allowed because we don't care about the detail changes per every element.
    // Only whether the graph state itself has added/removed elements, which this handles.
    let graphState = UNSAFE_useGraphStateContext();
    let elementIds = graphType.getElementIds(graphState, elementType);
    return elementIds;
}

export function useGraphElements(elementType, onChange)
{
    const graphType = useGraphType();
    let graphState = UNSAFE_useGraphStateContext();

    let elements = graphType.getElements(graphState, elementType);

    useEffect(() =>
    {
        if (elements) addElementTypeListener(elementType, onChange);

        return () =>
        {
            if (elements) removeElementTypeListener(elementType, onChange);
        };
    },
    [
        graphState,
        elements,
        elementType,
        onChange,
    ]);

    return elements;
}

export function useGraphElement(elementType, elementId, onChange)
{
    const graphType = useGraphType();
    let graphState = UNSAFE_useGraphStateContext();

    let element = graphType.getElement(graphState, elementType, elementId);

    useEffect(() =>
    {
        if (element) addElementListener(element, onChange);

        return () =>
        {
            if (element) removeElementListener(element, onChange);
        };
    },
    [
        graphState,
        element,
        elementId,
        onChange,
    ]);

    return element;
}
