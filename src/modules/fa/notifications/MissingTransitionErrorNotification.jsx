import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

/** 
 * A React component that is a notification box for the Missing Transitions(s) error
 * (as in there are transitions/edges between some pair(s) of states that are missing 
 * that need to be added). 
 * 
 * Note that this should only be used on deterministic Finite Automata.
 */
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
