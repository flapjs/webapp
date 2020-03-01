import { useEffect } from 'react';
import { doMountManagers, doUnmountManagers } from './ManagerLoader.js';

export function useManagers(managers)
{
    useEffect(() =>
    {
        let result = doMountManagers(managers);
        return () =>
        {
            doUnmountManagers(result);
        };
    });
}
