import { useEffect } from 'react';
import { addElementListener, removeElementListener } from './GraphElementListener.js';
import { addElementTypeListener, removeElementTypeListener } from './GraphElementTypeListener.js';

import { UNSAFE_useGraphStateContext } from '../GraphContext.jsx';
import { UNSAFE_getGraphElement, UNSAFE_getGraphElementIds, UNSAFE_getGraphElements } from '../GraphHelper.js';

export function useGraphElementIds(elementType)
{
    let graphState = UNSAFE_useGraphStateContext();
    let elementIds = UNSAFE_getGraphElementIds(graphState, elementType);
    return elementIds;
}

export function useGraphElements(elementType, onChange)
{
    let graphState = UNSAFE_useGraphStateContext();

    let elements = UNSAFE_getGraphElements(graphState, elementType);

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
    let graphState = UNSAFE_useGraphStateContext();

    let element = UNSAFE_getGraphElement(graphState, elementType, elementId);

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
