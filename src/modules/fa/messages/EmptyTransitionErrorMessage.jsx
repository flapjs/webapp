import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';
import { useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { doGraphDeleteEdges } from '../FiniteAutomataGraphActions.js';

export default function EmptyTransitionErrorMessage(props)
{
    const { message, messageId } = props;
    const { edgeIds } = message;

    const graphDispatch = useGraphDispatch();

    return (
        <MessageContainer messageId={messageId} mode="error"
            message={`Found ${edgeIds.length} empty transition(s).\nReason: Deterministic.`}
            renderControls={dismiss => (
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
            
        </MessageContainer>
    );
}
EmptyTransitionErrorMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.shape({
        edgeIds: PropTypes.arrayOf(PropTypes.string),
    }),
};
