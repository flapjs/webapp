import { useEffect } from 'react';

/**
 * An external update cycle; the callback is called every frame (about 60fps). This is usually used
 * to poll external systems that do not go well with React's stateful systems.
 * 
 * @param {Function} callback The function called each frame.
 */
export function useUpdateCycle(callback)
{
    useEffect(() =>
    {
        let animationFrameHandle = requestAnimationFrame(onAnimationFrame);
        function onAnimationFrame(now)
        {
            animationFrameHandle = requestAnimationFrame(onAnimationFrame);
            callback(now);
        }
        return () =>
        {
            cancelAnimationFrame(animationFrameHandle);
        };
    },
    [ callback ]);
}
