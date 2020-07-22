import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

import { convertToDFA } from '../machine/FSAUtils.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

export default function NFAToDFAConversionMessage(props)
{
    const { message, messageId } = props;

    const machineBuilder = useGraphMachineBuilder(FiniteAutomataBuilder);

    return (
        <MessageContainer messageId={messageId} mode={'warning'}
            message={'Careful! This conversion will exponentially increase the number of states.\n' + message}
            renderControls={dismiss => (
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
            
        </MessageContainer>
    );
}
NFAToDFAConversionMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
