import React from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { PencilIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

import { useNotifications } from '@flapjs/services/notification/NotificationService.js';
import { NFAToDFAConversionNotification } from '@flapjs/modules/fa/notifications/NFAToDFAConversionNotification.jsx';
import { FlipAcceptStateNotification } from '@flapjs/modules/fa/notifications/FlipAcceptStateNotification.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

export default function ComputePanel()
{
    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);
    const machine = machineBuilder.getMachine();

    const { addNotification } = useNotifications();

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
                                onClick={() => addNotification(NFAToDFAConversionNotification, { stateCount })}
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
                    <FieldButton id="flipAllAcceptStates"
                        onClick={() => addNotification(FlipAcceptStateNotification)}
                        disabled={isEmpty}>
                        Flip all accept states
                    </FieldButton>
                </Pane>
            </div>
        </>
    );
}
ComputePanel.tabIcon = PencilIcon;
