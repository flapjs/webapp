import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { convertToDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

/** 
 * A React component that is a notification box for the NFA To DFA Conversion warning
 * (as in converting an NFA into an equivalent DFA). This component also allows for the 
 * applying of the NFA to DFA conversion on the current FA on the user's screen. So,
 * this component basically serves as a confirmation modal (confirm -> convert, 
 * cancel/remove notification -> do nothing).
 */
export function NFAToDFAConversionNotification(props)
{
    const { id, stateCount } = props;

    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);

    return (
        <NotificationElementContainer
            id={id}
            message={`Warning: This conversion will exponentially increase the number of states.\n${stateCount} state(s) -> ${Math.pow(2, stateCount)} states.`}
            controls={dismiss => (
                <>
                    <button onClick={() =>
                    {
                        machineBuilder.applyChanges(machine => convertToDFA(machine, machine));
                        dismiss();
                    }}>
                        Convert
                    </button>
                </>
            )}>
            
        </NotificationElementContainer>
    );
}

NFAToDFAConversionNotification.propTypes = {
    id: PropTypes.string.isRequired,
    stateCount: PropTypes.number.isRequired,
};
