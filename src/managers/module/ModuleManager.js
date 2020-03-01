import Logger from '@flapjs/util/Logger.js';
import * as URLHelper from '@flapjs/util/URLHelper.js';

import { tryMount, tryStillMounted, tryUnmount, isManagerMounted } from '../ManagerLoader.js';
import { fetchModuleClassById, loadModuleByClass, unloadModule } from './ModuleLoader.js';

import SessionManager from '../session/SessionManager.js';

const FALLBACK_MODULE_ID = 'node';

/** Must be mounted AFTER SessionManager. */
export default class ModuleManager
{
    /** @override */
    static async mount(mounter)
    {
        if (!tryMount(mounter, ModuleManager)) return;
        if (!isManagerMounted(mounter, SessionManager)) throw new Error('Requires SessionManager to be mounted before this!');

        let nextModuleId = await getNextModuleId();
        
        if (!tryStillMounted(mounter, ModuleManager)) return;

        Logger.out('ModuleManager', `Preparing for module '${nextModuleId}'...`);

        let nextModuleClass;
        try
        {
            nextModuleClass = await fetchModuleClassById(nextModuleId);
        }
        catch(e)
        {
            if (!tryStillMounted(mounter, ModuleManager)) return;

            Logger.error('ModuleManager', `Unable to fetch module '${nextModuleId}', trying to fetch module '${FALLBACK_MODULE_ID}' instead...`, e);
            try
            {
                nextModuleClass = await fetchModuleClassById(FALLBACK_MODULE_ID);
            }
            catch(e)
            {
                Logger.error('ModuleManager', 'There was nothing I could do, dude.', e);
                throw new Error(`Failed to fetch module '${nextModuleId}'.`);
            }
        }

        if (!tryStillMounted(mounter, ModuleManager)) return;

        let nextModule;
        let nextLoader;
        try
        {
            [ nextModule, nextLoader ] = await loadModuleByClass(nextModuleClass);
        }
        catch(e)
        {
            Logger.error('ModuleManager', `Failed to load module '${nextModuleId}'. I'm sorry.`, e);
            throw e;
        }

        mounter.currentModule = nextModule;
        mounter.currentLoader = nextLoader;
    }

    /** @override */
    static unmount(mounter)
    {
        if (!tryUnmount(mounter, ModuleManager)) return;

        let prevModule = mounter.currentModule;
        let prevLoader = mounter.currentLoader;
        delete mounter.currentModule;
        delete mounter.currentLoader;

        try
        {
            unloadModule(prevModule, prevLoader);
        }
        catch(e)
        {
            Logger.error('ModuleManager', `Failed to unload module '${prevModule.constructor.moduleId}'. No can do.`, e);
        }
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
