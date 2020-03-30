import React from 'react';

import TooltipRenderer from '@flapjs/renderers/decors/TooltipRenderer.jsx';
import { useGraphMachine } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';

import FSABuilder from '../../machine/FSABuilder.js';

export default function FiniteAutomataTooltip(props)
{
    const machine = useGraphMachine(FSABuilder);

    const stateCount = machine.getStateCount();
    const hidden = stateCount > 0;

    return (
        <TooltipRenderer hidden={hidden}/>
    );
}
