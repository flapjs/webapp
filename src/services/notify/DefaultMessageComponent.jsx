import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from './components/MessageContainer.jsx';

export default function DefaultMessageComponent(props)
{
    const { message, messageId } = props;

    return (
        <MessageContainer message={message} messageId={messageId}>
        </MessageContainer>
    );
}
DefaultMessageComponent.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
DefaultMessageComponent.defaultProps = {
    message: ''
};
