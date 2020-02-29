import Logger from '@flapjs/util/Logger.js';

/** It's the dreaded singleton... */
const MOUNTED_MANAGERS = new Set();

/**
 * Used by ManagerHooks. It helps handle the flow of mounting of managers
 * (cause they can throw errors).
 * 
 * @param {Array} managers An ordered array of managers. It will mount in the order listed.
 * @returns {boolean} Whether ANY managers have been successfully mounted (so unmount must be called).
 */
export async function doMountManagers(managers)
{
    Logger.out('ManagerLoader', '...mounting managers...');
    let result = false;

    // This is basically an async reduce()...
    let prev = null;
    for(let manager of managers)
    {
        try
        {
            prev = await manager.mount(prev);
            result = true;
        }
        catch(e)
        {
            // Mounting has halted because someone threw an error...
            Logger.error('ManagerLoader', `...failed to mount '${manager.name || manager}' and maybe other managers.`, e);
            return result;
        }
    }
    return result;
}

/**
 * Used by ManagerHooks. It helps handle the flow of unmounting of managers
 * (cause they can throw errors and the order should be maintained).
 * 
 * @returns {boolean} Whether all managers have been successfully unmounted (at least tried to).
 */
export function doUnmountManagers()
{
    Logger.out('ManagerLoader', '...unmounting managers...');

    let managers = Array.from(MOUNTED_MANAGERS);

    // This is basically a reversed reduce()...
    managers.reduceRight((prev, manager) =>
    {
        try
        {
            return manager.unmount(prev);
        }
        catch(e)
        {
            Logger.error('ManagerLoader', `...unable to unmount manager '${manager.name || manager}'...`, e);
            return null;
        }
    },
    null);

    // We will always try to unmount all we can and call it a success.
    return true;
}

/**
 * Returns true if you should try mounting the manager. You can only mount() after
 * an unmount() has occured, or no mount has happened yet, and only once-- even within
 * the same function! That means you should ALWAYS RETURN AFTER tryMount()'s protected
 * code.
 * 
 * If you must continue mounting after a tryMount(), either use isMounted() only nested
 * under a tryMount(), or it's time to use another manager.
 * 
 * @param {Class|object} manager The manager object containing mount() and unmount().
 * @param {boolean} [silent] Whether to reject silently instead of an error.
 * @returns {boolean} Whether to execute mount code for the manager.
 */
export function tryMount(manager, silent = false)
{
    if (!MOUNTED_MANAGERS.has(manager))
    {
        MOUNTED_MANAGERS.add(manager);
        return true;
    }
    else if (silent)
    {
        return false;
    }

    throw new Error('Cannot mount manager that has already been unmounted!');
}

/**
 * Checks whether the manager has been mounted. This should only be used NESTED UNDER
 * a tryMount() call!!! In other words, code flow must execute tryMount() first (and
 * only once) before this call! Otherwise, you will run into issues (with the
 * load/unload order)...
 * 
 * NOTE: It will also throw an error if it cannot continue to mount instead of a "silent"
 * return false. This is for mountManagers() to stop continuing to mount future managers
 * since managers can depend on one another.
 * 
 * @param {Class|object} manager The manager object containing mount() and unmount().
 * @param {boolean} [silent] Whether to reject silently instead of an error.
 * @returns {boolean} Whether the manager has been mounted.
 */
export function tryStillMounted(manager, silent = false)
{
    if (MOUNTED_MANAGERS.has(manager))
    {
        return true;
    }
    else if (silent)
    {
        return false;
    }

    throw new Error('Cannot continue mounting manager that has just been unmounted!');
}

/**
 * Returns true if you should try unmounting the manager. You can only unmount() after
 * a mount() has occured, and only once. This time, it will not try to throw an error
 * if it fails. Unmounting something already unmounted is ok.
 * 
 * @param {Class|object} manager The manager object containing mount() and unmount().
 * @returns {boolean} Whether to execute unmount code for the manager.
 */
export function tryUnmount(manager)
{
    if (MOUNTED_MANAGERS.has(manager))
    {
        MOUNTED_MANAGERS.delete(manager);
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * Checks whether something has already been mounted. This should only be used to check
 * whether dependencies have been mounted. This should not govern mounting/unmounting
 * procedures.
 * 
 * @param {Class|object} manager The manager object containing mount() and unmount().
 * @returns {boolean} Whether the manager is mounted.
 */
export function isManagerMounted(manager)
{
    return MOUNTED_MANAGERS.has(manager);
}
