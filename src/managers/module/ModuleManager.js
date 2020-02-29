import * as URLHelper from '@flapjs/util/URLHelper.js';

import { tryMount, tryStillMounted, tryUnmount, isManagerMounted } from '../ManagerLoader.js';
import { loadModuleById } from './ModuleLoader.js';

import SessionManager from '../session/SessionManager.js';

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

        let currentModule = await loadModuleById(nextModuleId);
        return currentModule;
    }

    /** @override */
    static unmount()
    {
        if (!tryUnmount(ModuleManager)) return;
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
        return;
    }

    // Are we letting the user decide?
    // openModuleDialog();

    return nextModuleId;
}
