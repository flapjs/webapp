import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

export default function MissingTransitionErrorMessage(props)
{
    const { message, messageId } = props;
    const { symbols, label } = message;

    return (
        <MessageContainer messageId={messageId} mode="error"
            message={`Node ${label} is missing transtion(s) for the following symbol(s) ${symbols}.\nReason: Deterministic.`}>
        </MessageContainer>
    );
}
MissingTransitionErrorMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.shape({
        symbols: PropTypes.arrayOf(PropTypes.string),
        label: PropTypes.string
    }),
};
