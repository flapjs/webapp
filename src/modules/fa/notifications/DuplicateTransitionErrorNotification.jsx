import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

/** A React component that is a notification box for the Duplicate Transitions error. */
export function DuplicateTransitionErrorNotification(props)
{
    const { id, edgeIds, fromNodeLabel, symbol } = props;

    return (
        <NotificationElementContainer
            id={id}
            message={`Error: Found ${edgeIds.length} duplicate transitions from state ${fromNodeLabel} with symbol ${symbol}.\nReason: Deterministic.`}>
        </NotificationElementContainer>
    );
}

DuplicateTransitionErrorNotification.propTypes = {
    id: PropTypes.string,
    edgeIds: PropTypes.arrayOf(PropTypes.string),
    fromNodeLabel: PropTypes.string,
    symbol: PropTypes.string,
};
