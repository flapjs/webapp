import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Logger from '@flapjs/util/Logger.js';
import * as URLHelper from '@flapjs/util/URLHelper.js';
import * as ModuleLoader from './ModuleLoader.js';

const FALLBACK_MODULE_ID = null;

export const ModuleContext = React.createContext();

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
            Logger.out('ModuleProvider', `Preparing for module '${moduleId}'...`);
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
                    Logger.error('ModuleProvider', `Unable to fetch module '${moduleId}'; there was nothing I could do, dude.`, e);
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
            Logger.out('ModuleProvider', `Preparing for module class '${moduleClass.name}'...`);
            try
            {
                const [currentModule, loader] = ModuleLoader.loadModule(moduleClass);
                moduleInstanceRef.current = currentModule;

                // ...save it as recent...
                localStorage.setItem('recentModuleId', moduleClass.moduleId);

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
                        Logger.error('ModuleManager', `Failed to unload module '${currentModule.constructor.moduleId}'. No can do.`, e);
                    }
                };
            }
            catch(e)
            {
                Logger.error('ModuleProvider', `Failed to load module class '${moduleClass.name}'. I'm sorry.`, e);
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
    let prevModuleId = localStorage.getItem('recentModuleId');
    if (prevModuleId)
    {
        return prevModuleId;
    }

    return FALLBACK_MODULE_ID;
}
