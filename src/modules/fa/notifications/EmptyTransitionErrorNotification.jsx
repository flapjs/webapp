import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { doGraphDeleteEdges } from '../FiniteAutomataGraphActions.js';

/** 
 * A React component that is a notification box for the Empty Transition(s) error 
 * (as in edges/transitions that do not have any value assigned to them). This
 * component also allows for the deletion of those empty transitions via a button.
 * 
 * Note that this should only used on deterministic Finite Automata.
 */
export function EmptyTransitionErrorNotification(props)
{
    const { id, edgeIds } = props;

    const graphDispatch = useGraphDispatch();

    return (
        <NotificationElementContainer
            id={id}
            message={`Error: Found ${edgeIds.length} empty transition(s).\nReason: Deterministic.`}
            controls={dismiss => (
                <div>
                    <button onClick={() =>
                    {
                        doGraphDeleteEdges(graphDispatch, edgeIds);
                        dismiss();
                    }}>
                        Delete all empty transitions.
                    </button>
                </div>
            )}>
        </NotificationElementContainer>
    );
}

EmptyTransitionErrorNotification.propTypes = {
    id: PropTypes.string.isRequired,
    edgeIds: PropTypes.arrayOf(PropTypes.string),
};
