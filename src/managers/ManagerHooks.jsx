import { useEffect } from 'react';
import { doMountManagers, doUnmountManagers } from './ManagerLoader.js';

export function useManagers(managers)
{
    useEffect(() =>
    {
        let result = null;
        doMountManagers(managers).then(value => result = value);
        return () =>
        {
            if (result)
            {
                doUnmountManagers(result);
            }
        };
    });
}
