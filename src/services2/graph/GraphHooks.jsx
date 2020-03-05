import { useCallback } from 'react';

import { useUpdateCycle } from '@flapjs/hooks/UpdateCycleHook.jsx';
import { getElementListeners } from './elements/GraphElementListener.js';

export function useGraphUpdateCycle(state)
{
    const updateCallback = useCallback(() =>
    {
        for(let elementByIds of Object.values(state))
        {
            for(let element of Object.values(elementByIds))
            {
                // This is where all elements are washed (updated) if they are dirty :P
                if (element.isDirty())
                {
                    element.markDirty(false);
                    element.onUpdate();
                    for(let listener of getElementListeners(element))
                    {
                        listener.call(undefined, element);
                    }
                }
            }
        }
    },
    [ state ]);

    // NOTE: Manages the graph element dirty/update cycle.
    useUpdateCycle(updateCallback);
}
