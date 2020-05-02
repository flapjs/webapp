import { useMachineBuilder, useMachine } from '@flapjs/services/machine/MachineHooks.jsx';
import FiniteAutomataBuilder from './FiniteAutomataBuilder.js';

export function useFiniteAutomataBuilder()
{
    return useMachineBuilder(FiniteAutomataBuilder, 'graph');
}

export function useFiniteAutomata()
{
    return useMachine(FiniteAutomataBuilder, 'graph');
}
