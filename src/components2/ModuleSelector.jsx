import React, { useContext, useState } from 'react';
import Style from './ModuleSelector.module.css';
import { ModuleContext } from '@flapjs/modules2/ModuleContext.jsx';
import * as ModuleRegistry from '@flapjs/modules2/ModuleRegistry.js';

export default function ModuleSelector(props)
{
    const { moduleId, setModuleId } = useContext(ModuleContext);
    const [ nextModuleId, setNextModuleId ] = useState(moduleId);

    const moduleIds = Object.keys(ModuleRegistry);
    return (
        <div className={Style.container}>
            <button className={Style.cancel}
                disabled={!nextModuleId || moduleId === nextModuleId}
                onClick={() => setNextModuleId(moduleId)}>
                {'Not Now.'}
            </button>
            <select className={Style.selector} value={nextModuleId}
                onChange={e => e.target.blur() /* Force a change to commit. */}
                onBlur={e => setNextModuleId(e.target.value)}>
                {moduleIds.map(moduleId => (
                    // eslint-disable-next-line import/namespace
                    <option key={moduleId} value={moduleId}>{ModuleRegistry[moduleId].name}</option>
                ))}
            </select>
            <button className={Style.launcher}
                disabled={!nextModuleId || moduleId === nextModuleId}
                onClick={() => setModuleId(nextModuleId)}>
                {'Let\'s Go!'}
            </button>
        </div>
    );
}
