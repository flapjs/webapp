import { useContext } from 'react';

import { useMachineBuilder, useMachine, useSourceForMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

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
    const graphState = useGraphState();
    const graphDispatch = useContext(GraphDispatchContext);
    
    useSourceForMachine(
        machineBuilderType,
        'graph',
        graphState,
        machine => machineBuilderType.updateGraphFromMachine(graphState, graphDispatch, machine)
    );
}
