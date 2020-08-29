import { useState, useEffect } from 'react';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('AutoSaveService');

/**
 * @callback SerializerFunction
 * @param {Object} dst The data object to serialize into.
 * 
 * @callback DeserializerFunction
 * @param {Object} src The data object to deserialize from.
 * 
 * @callback SerializerHook
 * @returns {SerializerFunction} The serializer function to be called on save.
 * 
 * @callback DeserializerHook
 * @returns {DeserializerFunction} The deserializer function to be called on load.
 */

/**
 * Performs auto saving and loading using the given save key from localStorage. On initial call, it will
 * load from storage. For every subsequent state update, it will attempt to save after a short buffer time.
 * If no state changes occur, no saves will be performed.
 * 
 * @param {String} saveKey The unique key to save to in localStorage.
 * @param {SerializerHook} useSerializer The hook to return a serializer function to be called on save.
 * @param {DeserializerHook} useDeserializer The hook to return a deserializer function to be called on load.
 * @param {Object} opts Any additional options.
 * @param {Number} [opts.debounceMillis=1000] The number of milliseconds to wait after state change before saving.
 */
export function useAutoSave(saveKey, useSerializer, useDeserializer, opts = {})
{
    const { debounceMillis = 1000 } = opts;

    const [ init, setInit ] = useState(false);
    const serializer = useSerializer();
    const deserializer = useDeserializer();

    // Auto saving/loading
    useEffect(() =>
    {
        if (!init)
        {
            LOGGER.trace(`Auto loading '${saveKey}' data from localStorage...`);
            let saveDataString = localStorage.getItem(saveKey);
            try
            {
                let saveData = JSON.parse(saveDataString);
                deserializer(saveData);
            }
            catch(e)
            {
                LOGGER.error('Failed to deserialize save data.', e);
            }

            setInit(true);
        }
        else
        {
            let shouldPerformSave = true;
            const timeoutHandle = setTimeout(() =>
            {
                if (shouldPerformSave)
                {
                    LOGGER.trace(`Auto saving '${saveKey}' data to localStorage...`);
                    try
                    {
                        let saveData = {};
                        serializer(saveData);
                        localStorage.setItem(saveKey, JSON.stringify(saveData));
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
    [debounceMillis, deserializer, init, saveKey, serializer]);
}
