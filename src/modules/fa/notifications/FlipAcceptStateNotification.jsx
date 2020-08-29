import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { invertDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

export function FlipAcceptStateNotification(props)
{
    const { id, content } = props;

    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);

    return (
        <NotificationElementContainer id={id}
            message={'Warning: Flipping the states in an NFA does not produce a logically equivalent inverse.\n' + content}
            controls={dismiss => (
                <>
                    <button onClick={() =>
                    {
                        machineBuilder.applyChanges(machine => invertDFA(machine, machine));
                        dismiss();
                    }}>
                        Apply
                    </button>
                </>
            )}>
        </NotificationElementContainer>
    );
}
FlipAcceptStateNotification.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
};
