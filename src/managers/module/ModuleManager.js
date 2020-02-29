import Logger from '@flapjs/util/Logger.js';
import * as URLHelper from '@flapjs/util/URLHelper.js';

import { tryMount, tryStillMounted, tryUnmount, isManagerMounted } from '../ManagerLoader.js';
import { loadModuleById } from './ModuleLoader.js';

import SessionManager from '../session/SessionManager.js';

const FALLBACK_MODULE_ID = 'node';

let CURRENT_MODULE = null;

/** Must be mounted AFTER SessionManager. */
export default class ModuleManager
{
    /** @override */
    static async mount()
    {
        if (!tryMount(ModuleManager)) return;
        if (!isManagerMounted(SessionManager)) throw new Error('Requires SessionManager to be mounted before this!');

        let nextModuleId = await getNextModuleId();
        
        if (!tryStillMounted(ModuleManager)) return;

        Logger.out('ModuleManager', `Loading module '${nextModuleId}'...`);

        let nextModule;
        try
        {
            nextModule = await loadModuleById(nextModuleId);
        }
        catch(e)
        {
            if (!tryStillMounted(ModuleManager)) return;

            Logger.error('ModuleManager', `Unable to load module '${nextModuleId}', trying to load module '${FALLBACK_MODULE_ID}' instead...`, e);
            try
            {
                nextModule = await loadModuleById(FALLBACK_MODULE_ID);
            }
            catch(e)
            {
                Logger.error('ModuleManager', 'Failed to load any module. Please forgive me.', e);
                throw e;
            }
        }

        if (!tryStillMounted(ModuleManager)) return;
        
        CURRENT_MODULE = nextModule;
        if (CURRENT_MODULE.mount) CURRENT_MODULE.mount();
        return CURRENT_MODULE;
    }

    /** @override */
    static unmount()
    {
        if (!tryUnmount(ModuleManager)) return;

        let prevModule = CURRENT_MODULE;
        CURRENT_MODULE = null;
        if (prevModule.unmount) prevModule.unmount();
        return prevModule;
    }
}

async function getNextModuleId()
{
    let nextModuleId;

    // Are we forcing a module load? (by url)
    const params = URLHelper.getURLParameters(URLHelper.getCurrentURL());
    if (params.module)
    {
        // ...yes we are.
        nextModuleId = params.module;
    }

    // Are we loading a module from session cache? (by local storage)
    const prevModuleId = SessionManager.getData('moduleId');
    if (prevModuleId)
    {
        // ... yep we can.
        nextModuleId = prevModuleId;
    }

    // Are we letting the user decide?
    // openModuleDialog();

    // Just get the default one...
    nextModuleId = FALLBACK_MODULE_ID;

    return nextModuleId;
}
