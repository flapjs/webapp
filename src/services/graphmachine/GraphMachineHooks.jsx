import { useMachineBuilder, useMachine, useSourceForMachine } from '@flapjs/services/machine/MachineHooks.jsx';
import { useGraphType, useGraphState, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

/** Gets the current graph machine builder. */
export function useGraphMachineBuilder(machineBuilderType)
{
    return useMachineBuilder(machineBuilderType, 'graph');
}

/** Gets the current graph machine. */
export function useGraphMachine(machineBuilderType)
{
    return useMachine(machineBuilderType, 'graph');
}

/** Gets the current graph for a given machine builder type. */
export function useGraphForMachine(machineBuilderType)
{
    const graphType = useGraphType();
    const graphState = useGraphState();
    const graphDispatch = useGraphDispatch();
    
    useSourceForMachine(
        machineBuilderType,
        'graph',
        graphState,
        (machine, opts) => machineBuilderType.updateGraphFromMachine(graphType, graphState, graphDispatch, machine, opts)
    );
}
