import { useCallback, useEffect } from 'react';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { UNSAFE_useGraphStateContext } from './GraphContext.jsx';

import { addStateListener, removeStateListener } from './GraphStateListener.js';

/**
 * Use this instead of useContext(GraphStateContext). This will make sure that any "minute"
 * changes that are usually kept within the graph element, will also trigger this user's
 * re-render.
 * 
 * @returns {object} The graph state.
 */
export function useGraphState()
{
    const graphState = UNSAFE_useGraphStateContext();
    const forceUpdate = useForceUpdate();

    const stateChangeCallback = useCallback(graphState => forceUpdate(), [ forceUpdate ]);

    useEffect(() =>
    {
        if (graphState) addStateListener(graphState, stateChangeCallback);

        return () =>
        {
            if (graphState) removeStateListener(graphState, stateChangeCallback);
        };
    },
    [
        graphState,
        stateChangeCallback,
    ]);

    return graphState;
}
