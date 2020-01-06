import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '@flapjs/services/notification/components/messages/ErrorMessage.jsx';

function StateLayoutMessage(props)
{
    return (
        <ErrorMessage
            content={props.content}
            notification={props.notification}
            onClose={props.onClose}>
            {props.children}
        </ErrorMessage>
    );
}
StateLayoutMessage.propTypes = {
    children: PropTypes.node,
    notification: PropTypes.object.isRequired,
    content: PropTypes.string,
    onClose: PropTypes.func,
};

export default StateLayoutMessage;
