import React from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PencilIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder';
import { convertToDFA, convertToNFA } from '@flapjs/modules/fa/machine/FSAUtils';

export default function ComputePanel(props)
{
    const machineBuilder = useGraphMachineBuilder(FSABuilder);
    const machine = machineBuilder.getMachine();

    const deterministic = machine.isDeterministic();

    return (
        <>
        <header>
            <h2>Computations</h2>
        </header>
        <Pane title="Equivalent Conversions">
            <div>
                <button onClick={() =>
                    machineBuilder.applyChanges(machine =>
                    {
                        if (!deterministic)
                        {
                            convertToDFA(machine, machine);
                        }
                        else
                        {
                            convertToNFA(machine, machine);
                        }
                    })}>
                    <span>Convert to </span>
                    <span>{deterministic ? 'NFA' : 'DFA'}</span>
                </button>
            </div>
            <hr/>
            <div>
                <button disabled={true}>
                    Remove unreachable states
                </button>
            </div>
        </Pane>
        <Pane title="Related Conversions">
            <div>
                <button disabled={true}>
                    Flip all accept states
                </button>
            </div>
        </Pane>
        </>
    );
}

ComputePanel.Tab = createTabWithIcon(PencilIcon);
