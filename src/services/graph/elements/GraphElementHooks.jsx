import { useContext, useEffect } from 'react';
import { addElementListener, removeElementListener } from './GraphElementListener.js';

import { GraphDispatchContext, UNSAFE_useGraphStateContext } from '../GraphContext.jsx';
import { UNSAFE_getGraphElements } from '../GraphHelper.js';

export function useGraphElementIds(elementType)
{
    let graphState = UNSAFE_useGraphStateContext();
    let graphDispatch = useContext(GraphDispatchContext);
    let elementIds = Object.keys(UNSAFE_getGraphElements(graphState, elementType) || {});
    let elementsDispatch = action => graphDispatch({elementType, ...action});
    return [ elementIds, elementsDispatch ];
}

export function useGraphElement(elementType, elementId, onChange)
{
    let graphState = UNSAFE_useGraphStateContext();

    let elements = UNSAFE_getGraphElements(graphState, elementType) || {};
    let element = elements[elementId] || null;

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
