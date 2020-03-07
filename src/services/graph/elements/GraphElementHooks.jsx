import { useContext, useEffect } from 'react';
import { addElementListener, removeElementListener } from './GraphElementListener.js';

import { GraphDispatchContext, UNSAFE_useGraphStateContext } from '../GraphContext.jsx';
import { UNSAFE_getGraphElement, UNSAFE_getGraphElementIds } from '../GraphHelper.js';

export function useGraphElementIds(elementType)
{
    let graphState = UNSAFE_useGraphStateContext();
    let graphDispatch = useContext(GraphDispatchContext);
    let elementIds = UNSAFE_getGraphElementIds(graphState, elementType);
    let elementsDispatch = action => graphDispatch({elementType, ...action});
    return [ elementIds, elementsDispatch ];
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
