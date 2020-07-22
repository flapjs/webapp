import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

import { invertDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

export default function FlipAcceptStateMessage(props)
{
    const { message, messageId } = props;

    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);

    return (
        <MessageContainer messageId={messageId} mode={'warning'}
            message={'Careful! Flipping the states in an NFA does not produce a logically equivalent inverse.\n' + message}
            renderControls={dismiss => (
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
        </MessageContainer>
    );
}
FlipAcceptStateMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
