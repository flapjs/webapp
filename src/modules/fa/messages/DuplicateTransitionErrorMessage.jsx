import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

export default function DuplicateTransitionErrorMessage(props)
{
    const { message, messageId } = props;
    const { edgeIds, fromNodeLabel, symbol } = message;

    return (
        <MessageContainer messageId={messageId} mode="error"
            message={`Found ${edgeIds.length} duplicate transitions from state ${fromNodeLabel} with symbol ${symbol}.\nReason: Deterministic.`}>
        </MessageContainer>
    );
}
DuplicateTransitionErrorMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.shape({
        edgeIds: PropTypes.arrayOf(PropTypes.string),
        fromNodeLabel: PropTypes.string,
        symbol: PropTypes.string,
    }),
};
