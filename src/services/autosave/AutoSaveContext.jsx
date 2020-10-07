import { useState, useEffect } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('AutoSaveService');

/**
 * @callback SerializerFunction
 * @param {Object} dst The data object to serialize into.
 * 
 * @callback DeserializerFunction
 * @param {Object} src The data object to deserialize from.
 */

/**
 * Performs auto saving and loading using the given save key from localStorage. On initial call, it will
 * load from storage. For every subsequent state update, it will attempt to save after a short buffer time.
 * If no state changes occur, no saves will be performed.
 * 
 * @param {String} saveKey The unique key to save to in localStorage.
 * @param {SerializerFunction} serializer The serializer function to be called on save.
 * @param {DeserializerFunction} deserializer The deserializer function to be called on load.
 * @param {Object} opts Any additional options.
 * @param {Number} [opts.debounceMillis=1000] The number of milliseconds to wait after state change before saving.
 * @param {Boolean} [opts.autosave=true] Whether to automatically save on state update.
 * @param {Boolean} [opts.autoload=true] Whether to automatically load on mount.
 */
export function useAutoSave(saveKey, serializer, deserializer, opts = {})
{
    const { debounceMillis = 1000, autosave = true, autoload = true } = opts;

    const [ init, setInit ] = useState(false);

    // Auto saving/loading
    useEffect(() =>
    {
        if (!init && autoload)
        {
            LOGGER.debug(`Auto loading '${saveKey}' data from localStorage...`);
            const saveDataString = LocalStorage.getItem(saveKey);
            if (saveDataString)
            {
                try
                {
                    let saveData = JSON.parse(saveDataString);
                    deserializer(saveData);
                }
                catch(e)
                {
                    LOGGER.error('Failed to deserialize save data.', e);
                }
            }

            setInit(true);
        }
        else if (autosave)
        {
            let shouldPerformSave = true;
            const timeoutHandle = setTimeout(() =>
            {
                if (shouldPerformSave)
                {
                    LOGGER.debug(`Auto saving '${saveKey}' data to localStorage...`);
                    try
                    {
                        let saveData = {};
                        serializer(saveData);
                        LocalStorage.setItem(saveKey, JSON.stringify(saveData));
                    }
                    catch(e)
                    {
                        LOGGER.error('Failed to serialize save data.', e);
                    }
                }
            },
            debounceMillis);

            return () =>
            {
                shouldPerformSave = false;
                clearTimeout(timeoutHandle);
            };
        }
    },
    [autoload, autosave, debounceMillis, deserializer, init, saveKey, serializer]);
}
