import { useState, useContext, useEffect } from 'react';

import { MachineContext } from './MachineContext.jsx';

import { useUpdateCycle } from '@flapjs/hooks/UpdateCycleHook.jsx';
import * as MachineBuilderAPI from './MachineBuilderAPI.js';

/**
 * Gets a machine builder for the given type and name.
 * 
 * @param {Class<MachineBuilder>} machineBuilderType The machine builder type.
 * @param {string} machineName The session-unique name for the machine.
 * @returns {MachineBuilder} The machine builder for the type and name.
 */
export function useMachineBuilder(machineBuilderType, machineName)
{
    const [ usedBuildId, setUsedBuildId ] = useState(null);

    // NOTE: Why don't we just use machineName as the id?
    // That's because on a reload, the React context in which it was used
    // could still be using the MachineBuilderAPI to clean up things.
    // And if you used the same name (as it usually does if it is a restart),
    // then both contexts would share the same machine instance which could
    // cause data corruption. Therefore we have a contextId that uniquely
    // identifies the current React context.
    const contextId = useContext(MachineContext);
    const machineId = contextId + ':' + machineName;

    let machineBuilderContext = MachineBuilderAPI.getMachineBuilderContext(machineBuilderType, machineId, true);
    let machineBuilder = machineBuilderContext.builder;

    // Build id updates so we know when a build occurred.
    useUpdateCycle(() =>
    {
        let buildId = machineBuilder.getCurrentBuildId();
        if (buildId !== usedBuildId) setUsedBuildId(buildId);
    });

    // Reference counting so we know when to destroy a self-allocated machine builder.
    MachineBuilderAPI.addRefCount(machineBuilderType, machineId);
    useEffect(() =>
    {
        return () =>
        {
            MachineBuilderAPI.removeRefCount(machineBuilderType, machineId);
            if (!MachineBuilderAPI.isInUse(machineBuilderType, machineId))
            {
                MachineBuilderAPI.destroyMachineBuilder(machineBuilderType, machineId);
            }
        };
    });

    return machineBuilder;
}

/**
 * Gets a machine for the given type and name. This is simply a wrapper around useMachineBuilder().
 * 
 * @param {Class<MachineBuilder>} machineBuilderType The machine builder type.
 * @param {string} machineName The session-unique name for the machine.
 * @returns {object} The machine for the type and name.
 */
export function useMachine(machineBuilderType, machineName)
{
    const machineBuilder = useMachineBuilder(machineBuilderType, machineName);
    return machineBuilder.getMachine();
}

/**
 * Attaches a source for the machine to reflect from. This should only be used once per machine builder.
 * 
 * @param {Class<MachineBuilder>} machineBuilderType The machine builder type.
 * @param {string} machineName The session-unique name for the machine.
 * @param {Class<React.Context>} sourceContext The source React state context.
 * @param {Function} [changeCallback] The handler for data flow FROM the machine TO the source. If not defined,
 * data will not flow back towards the source and makes the machine act like a "view" of the source (instead of a hybrid).
 */
export function useSourceForMachine(machineBuilderType, machineName, sourceContext, changeCallback = () => {})
{
    const source = useContext(sourceContext);
    let machineBuilder = useMachineBuilder(machineBuilderType, machineName);
    machineBuilder.setSourceCallback(changeCallback);

    useEffect(() =>
    {
        machineBuilder.applySource(source);
    },
    [ source, machineBuilder ]);
}
