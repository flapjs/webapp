import { useEffect } from 'react';
import { doMountManagers, doUnmountManagers } from './ManagerLoader.js';

export function useManagers(managers)
{
    useEffect(() =>
    {
        if (doMountManagers(managers))
        {
            return () =>
            {
                doUnmountManagers();
            };
        }
    });
}
