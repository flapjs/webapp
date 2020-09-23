import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { invertDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

/** 
 * A React component that is a notification box for the Flip Accept States warning
 * (as in accept states become non-accepting states and vice versa). This component also allows
 * for the applying of the state flipping action onto the current FA via a button, so this component
 * basically serves as a confirmation modal (confirm -> flip, cancel/remove notification -> do nothing).
 */
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
