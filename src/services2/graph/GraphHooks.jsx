import { useCallback } from 'react';

import { useUpdateCycle } from '@flapjs/hooks/UpdateCycleHook.jsx';
import { getElementListeners } from './elements/GraphElementListener.js';
import { getStateListeners } from './elements/GraphStateListener.js';

export function useGraphUpdateCycle(state)
{
    const updateCallback = useCallback(() =>
    {
        let dirty = false;
        for(let elementByIds of Object.values(state))
        {
            let elements = Object.values(elementByIds);
            for(let element of elements)
            {
                // This is where all elements are washed (updated) if they are dirty :P
                if (element.isDirty())
                {
                    dirty = true;
                    element.markDirty(false);
                    element.onUpdate();

                    // Allow element listeners to be updated...
                    for(let listener of getElementListeners(element))
                    {
                        listener.call(undefined, element);
                    }
                }
            }
        }

        // Allow state listeners to be updated...
        if (dirty)
        {
            for(let listener of getStateListeners(state))
            {
                listener.call(undefined, state);
            }
        }
    },
    [ state ]);

    // NOTE: Manages the graph element dirty/update cycle.
    useUpdateCycle(updateCallback);
}
