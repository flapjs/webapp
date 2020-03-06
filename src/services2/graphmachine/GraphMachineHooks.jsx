import { useContext } from 'react';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { useMachineBuilder, useMachine, useSourceForMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

import { GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';
import { useGraphState } from '@flapjs/services2/graph/elements/GraphElementHooks.jsx';

export function useGraphMachineBuilder(machineBuilderType)
{
    return useMachineBuilder(machineBuilderType, 'graph');
}

export function useGraphMachine(machineBuilderType)
{
    return useMachine(machineBuilderType, 'graph');
}

export function useGraphForMachine(machineBuilderType)
{
    const forceUpdate = useForceUpdate();
    const graphState = useGraphState(graphState => forceUpdate());
    const graphDispatch = useContext(GraphDispatchContext);
    
    useSourceForMachine(
        machineBuilderType,
        'graph',
        graphState,
        machine => machineBuilderType.updateGraphFromMachine(graphState, graphDispatch, machine)
    );
}
