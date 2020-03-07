import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '@flapjs/deprecated/services/notification/components/messages/ErrorMessage.jsx';

function MachineErrorMessage(props)
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
MachineErrorMessage.propTypes = {
    children: PropTypes.node,
    notification: PropTypes.object.isRequired,
    content: PropTypes.string,
    onClose: PropTypes.func,
};

export default MachineErrorMessage;
