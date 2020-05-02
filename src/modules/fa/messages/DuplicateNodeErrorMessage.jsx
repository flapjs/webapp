import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

export default function DuplicateNodeErrorMessage(props)
{
    const { message, messageId } = props;
    const { nodeIds, label } = message;

    return (
        <MessageContainer messageId={messageId} mode="error"
            message={`Found ${nodeIds.length} duplicate states for ${label}.`}>
        </MessageContainer>
    );
}
DuplicateNodeErrorMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.shape({
        nodeIds: PropTypes.arrayOf(PropTypes.string),
        label: PropTypes.string
    }),
};
