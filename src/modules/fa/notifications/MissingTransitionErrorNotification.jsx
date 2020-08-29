import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

export function MissingTransitionErrorNotification(props)
{
    const { id, symbols, label } = props;

    return (
        <NotificationElementContainer
            id={id}
            message={`Error: Node ${label} is missing transtion(s) for the following symbol(s) ${symbols}.\nReason: Deterministic.`}>
        </NotificationElementContainer>
    );
}
MissingTransitionErrorNotification.propTypes = {
    id: PropTypes.string.isRequired,
    symbols: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
};
