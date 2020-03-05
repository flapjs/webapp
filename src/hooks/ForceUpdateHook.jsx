import { useState, useCallback } from 'react';

/**
 * Used to force a component to update/re-render.
 * 
 * @returns {Function} The function to call to force an update.
 */
export function useForceUpdate()
{
    const [ , setTick ] = useState(false);
    const update = useCallback(() => setTick(tick => !tick), []);
    return update;
}
