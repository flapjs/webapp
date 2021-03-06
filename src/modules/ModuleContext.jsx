import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Logger } from '@flapjs/util/Logger.js';
import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';
import * as URLHelper from '@flapjs/util/URLHelper.js';
import * as ModuleLoader from './ModuleLoader.js';

const LOGGER = new Logger('ModuleProvider');

const FALLBACK_MODULE_ID = null;

export const ModuleContext = React.createContext(null);

export function ModuleProvider(props)
{
    const [moduleId, setModuleId] = useState(() => getDefaultModuleId());
    const [moduleClass, setModuleClass] = useState(null);
    const shouldAsyncUpdate = useRef(null);
    const moduleInstanceRef = useRef(null);

    // Load module class...
    useEffect(() =>
    {
        if (shouldAsyncUpdate.current !== moduleId)
        {
            shouldAsyncUpdate.current = moduleId;
            LOGGER.info(`Preparing for module '${moduleId}'...`);
            ModuleLoader.fetchModuleClassById(moduleId)
                .then(result =>
                {
                    if (shouldAsyncUpdate.current === moduleId)
                    {
                        // NOTE: Because the "setState" function expects a value OR a function,
                        // our class needs to be wrapped as a function, so it can be unwrapped
                        // as the actual value.
                        setModuleClass(() => result);
                    }
                })
                .catch(e =>
                {
                    LOGGER.error(`Unable to fetch module '${moduleId}'; there was nothing I could do, dude.`, e);
                });
            return () =>
            {
                shouldAsyncUpdate.current = null;
            };
        }
    },
    [ moduleId ]);

    // Load module instance...
    useEffect(() =>
    {
        if (moduleClass)
        {
            LOGGER.info(`Preparing for module class '${moduleClass.name}'...`);
            try
            {
                const [currentModule, loader] = ModuleLoader.loadModule(moduleClass);
                moduleInstanceRef.current = currentModule;

                // ...save it as recent...
                LocalStorage.setItem('recentModuleId', moduleClass.moduleId);

                // ...and here is the unmount procedure...
                return () =>
                {
                    try
                    {
                        moduleInstanceRef.current = null;
                        ModuleLoader.unloadModule(currentModule, loader);
                    }
                    catch(e)
                    {
                        LOGGER.error('ModuleManager', `Failed to unload module '${currentModule.constructor.moduleId}'. No can do.`, e);
                    }
                };
            }
            catch(e)
            {
                LOGGER.error('ModuleProvider', `Failed to load module class '${moduleClass.name}'. I'm sorry.`, e);
            }
        }
    },
    [ moduleClass ]);

    return (
        <ModuleContext.Provider value={{ moduleId, setModuleId, moduleClass, currentModule: moduleInstanceRef.current }}>
            {props.children}
        </ModuleContext.Provider>
    );
}
ModuleProvider.propTypes = { children: PropTypes.node };

function getDefaultModuleId()
{
    // Are we forcing a module load? (by url)
    const params = URLHelper.getURLParameters(URLHelper.getCurrentURL());
    if (params.module)
    {
        // ...yes we are.
        return params.module;
    }

    // Was there a recent module used?
    let prevModuleId = LocalStorage.getItem('recentModuleId');
    if (prevModuleId)
    {
        return prevModuleId;
    }

    return FALLBACK_MODULE_ID;
}
