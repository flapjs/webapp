import { useContext, useEffect } from 'react';
import { addElementListener, removeElementListener } from './GraphElement.js';

import { GraphStateContext, GraphDispatchContext, UNSAFE_getGraphElements } from './GraphContext.jsx';

export function useGraphElementIds(elementType)
{
    let graphState = useContext(GraphStateContext);
    let graphDispatch = useContext(GraphDispatchContext);
    let elementIds = Object.keys(UNSAFE_getGraphElements(graphState, elementType) || {});
    let elementsDispatch = action => graphDispatch({elementType, ...action});
    return [ elementIds, elementsDispatch ];
}

export function useGraphElement(elementType, elementId, onChange)
{
    let graphState = useContext(GraphStateContext);

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

    return [ element ];
}
