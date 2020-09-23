import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { doGraphDeleteEdges } from '../FiniteAutomataGraphActions.js';

/** 
 * A React component that is a notification box for the Incomplete Transition(s) error.
 * This component also allows for the deletion of incomplete transitions/edges via a 
 * button.
 */
export function IncompleteTransitionErrorNotification(props)
{
    const { id, edgeIds } = props;

    const graphDispatch = useGraphDispatch();

    return (
        <NotificationElementContainer id={id}
            message={`Error: Found ${edgeIds.length} incomplete transition(s).`}
            controls={dismiss => (
                <div>
                    <button onClick={() =>
                    {
                        doGraphDeleteEdges(graphDispatch, edgeIds);
                        dismiss();
                    }}>
                        Delete all incomplete edges.
                    </button>
                </div>
            )}>
        </NotificationElementContainer>
    );
}

IncompleteTransitionErrorNotification.propTypes = {
    id: PropTypes.string.isRequired,
    edgeIds: PropTypes.arrayOf(PropTypes.string),
};
