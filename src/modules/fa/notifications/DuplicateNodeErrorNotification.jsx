import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

export function DuplicateNodeErrorNotification(props)
{
    const { id, nodeIds, label } = props;

    return (
        <NotificationElementContainer
            id={id}
            message={`Warning: Found ${nodeIds.length} duplicate states for ${label}. So we labeled them sequentially.`}>
        </NotificationElementContainer>
    );
}
DuplicateNodeErrorNotification.propTypes = {
    id: PropTypes.string,
    nodeIds: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
};
