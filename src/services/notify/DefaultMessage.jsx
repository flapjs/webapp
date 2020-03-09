import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from './components/MessageContainer.jsx';

export default function DefaultMessage(props)
{
    const { message, messageId } = props;

    return (
        <MessageContainer message={message} messageId={messageId}>
        </MessageContainer>
    );
}
DefaultMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
DefaultMessage.defaultProps = {
    message: ''
};
