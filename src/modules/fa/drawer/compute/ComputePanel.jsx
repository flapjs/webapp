import React, { useContext } from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PencilIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder';

import { NotifyDispatchContext } from '@flapjs/services/notify/NotifyContext.jsx';
import NFAToDFAConversionMessage from '../../messages/NFAToDFAConversionMessage.jsx';
import { convertToNFA } from '../../machine/FSAUtils.js';

export default function ComputePanel(props)
{
    const machineBuilder = useGraphMachineBuilder(FSABuilder);
    const machine = machineBuilder.getMachine();

    const notifyDispatch = useContext(NotifyDispatchContext);

    const deterministic = machine.isDeterministic();
    const stateCount = machine.getStateCount();

    return (
        <>
        <header>
            <h2>Computations</h2>
        </header>
        <Pane title="Equivalent Conversions">
            <div>
                {!deterministic
                    ? <button onClick={() => notifyDispatch({ type: 'send', component: NFAToDFAConversionMessage, message: `${stateCount} state(s) -> ${Math.pow(2, stateCount)} states`})}
                        disabled={stateCount <= 0}>
                        <span>Convert to </span>
                        <span>DFA</span>
                    </button>
                    : <button onClick={() => machineBuilder.applyChanges(machine => convertToNFA(machine, machine))}
                        disabled={stateCount <= 0}>
                        <span>Convert to </span>
                        <span>NFA</span>
                    </button>}
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
