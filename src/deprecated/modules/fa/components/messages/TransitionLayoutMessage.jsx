import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '@flapjs/deprecated/services/notification/components/messages/ErrorMessage.jsx';

function TransitionLayoutMessage(props)
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
TransitionLayoutMessage.propTypes = {
    children: PropTypes.node,
    notification: PropTypes.object.isRequired,
    content: PropTypes.string,
    onClose: PropTypes.func,
};

export default TransitionLayoutMessage;
