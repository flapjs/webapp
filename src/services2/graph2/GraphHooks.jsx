import { useEffect } from 'react';
import { getElementListeners } from './elements/GraphElementListener.js';

export function useGraphUpdateCycle(state)
{
    // NOTE: Manages the graph element dirty/update cycle.
    useEffect(() =>
    {
        let animationFrameHandle = requestAnimationFrame(onAnimationFrame);
        function onAnimationFrame(now)
        {
            animationFrameHandle = requestAnimationFrame(onAnimationFrame);
            for(let elementByIds of Object.values(state))
            {
                for(let element of Object.values(elementByIds))
                {
                    // This is where all elements are washed (updated) if they are dirty :P
                    if (element.isDirty())
                    {
                        element.markDirty(false);
                        element.update();
                        for(let listener of getElementListeners(element))
                        {
                            listener.call(undefined, element);
                        }
                    }
                }
            }
        }
        return () =>
        {
            cancelAnimationFrame(animationFrameHandle);
        };
    },
    [ state ]);
}
