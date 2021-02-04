import React from 'react';
import PropTypes from 'prop-types';

import { NotificationElementContainer } from '@flapjs/services/notification/NotificationService.js';

import { useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { doGraphDeleteNodes } from '../FiniteAutomataGraphActions.js';

export function UnreachableNodeErrorNotification(props)
{
    const { id, nodeIds, labels } = props;

    const graphDispatch = useGraphDispatch();

    return (
        <NotificationElementContainer id={id}
            message={`Warning: Found ${nodeIds.length} unreachable states labeled: \n ${labels.join(', ')}`}
            controls={dismiss => (
                <div>
                    <button onClick={() =>
                    {
                        doGraphDeleteNodes(graphDispatch, nodeIds);
                        dismiss();
                    }}>
                        Delete all unreachable.lmao
                    </button>
                </div>
            )}>
                
        </NotificationElementContainer>
    );
}
UnreachableNodeErrorNotification.propTypes = {
    id: PropTypes.string.isRequired,
    nodeIds: PropTypes.arrayOf(PropTypes.string),
    labels: PropTypes.arrayOf(PropTypes.string),
};
