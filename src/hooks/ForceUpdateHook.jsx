import { useState, useCallback } from 'react';

export function useForceUpdate()
{
    const [ , setTick ] = useState(false);
    const update = useCallback(() => setTick(tick => !tick), []);
    return update;
}
