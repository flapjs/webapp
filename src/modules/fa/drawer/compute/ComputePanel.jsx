import React, { useContext } from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PencilIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

import { NotifyDispatchContext } from '@flapjs/services/notify/NotifyContext.jsx';
import NFAToDFAConversionMessage from '@flapjs/modules/fa/messages/NFAToDFAConversionMessage.jsx';
import FlipAcceptStateMessage from '@flapjs/modules/fa/messages/FlipAcceptStateMessage.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

export default function ComputePanel(props)
{
    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);
    const machine = machineBuilder.getMachine();

    const notifyDispatch = useContext(NotifyDispatchContext);

    const deterministic = machine.isDeterministic();
    const stateCount = machine.getStateCount();

    const isEmpty = stateCount <= 0;

    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Transformations</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Equivalent Conversions">
                    <div>
                        {!deterministic
                            ? <FieldButton id="convertToDFA"
                                onClick={() => notifyDispatch({ type: 'send', component: NFAToDFAConversionMessage, message: `${stateCount} state(s) -> ${Math.pow(2, stateCount)} states` })}
                                disabled={isEmpty}>
                                <span>Convert to </span>
                                <span>DFA</span>
                            </FieldButton>
                            : <FieldButton id="convertToNFA"
                                onClick={() => machineBuilder.applyChanges(machine => machine.setDeterministic(false), { machineOnly: true })}
                                disabled={isEmpty}>
                                <span>Convert to </span>
                                <span>NFA</span>
                            </FieldButton>}
                    </div>
                    <hr />
                    <div>
                        <FieldButton id="removeUnreachableStates"
                            onClick={() => { }}
                            disabled={true}>
                            Remove unreachable states
                        </FieldButton>
                    </div>
                </Pane>
                <Pane title="Related Conversions">
                    <div>
                        <FieldButton id="flipAllAcceptStates"
                            onClick={() => notifyDispatch({ type: 'send', component: FlipAcceptStateMessage })}
                            disabled={isEmpty}>
                            Flip all accept states
                        </FieldButton>
                    </div>
                </Pane>
            </div>
        </>
    );
}

ComputePanel.Tab = createTabWithIcon(PencilIcon);
