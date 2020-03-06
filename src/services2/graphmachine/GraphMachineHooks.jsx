import { useMachineBuilder, useMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

export function useGraphMachineBuilder(machineBuilderType)
{
    return useMachineBuilder(machineBuilderType, 'graph');
}

export function useGraphMachine(machineBuilderType)
{
    return useMachine(machineBuilderType, 'graph');
}
