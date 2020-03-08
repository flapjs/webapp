import React from 'react';
import Style from './Tooltip.module.css';

import { useGraphMachine } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FSABuilder from '../../machine/FSABuilder.js';

const CONGRATS = [
    'Hooray!',
    'Good Job!',
    'Welcome!',
    '\uD83D\uDC4D',
];
const CONGRATS_MESSAGE = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];

export default function Tooltip(props)
{
    const machine = useGraphMachine(FSABuilder);

    const stateCount = machine.getStateCount();
    const hidden = stateCount > 0;
    return (
        <text className={Style.container + ' ' + (hidden ? 'hidden' : '')}>
            {hidden
                ? CONGRATS_MESSAGE
                : 'Double-tap to create a node!'}
        </text>
    );
}
