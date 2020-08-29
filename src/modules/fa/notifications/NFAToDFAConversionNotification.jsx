import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { convertToDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

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
