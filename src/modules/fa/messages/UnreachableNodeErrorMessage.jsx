import React from 'react';
import PropTypes from 'prop-types';

import MessageContainer from '@flapjs/services/notify/components/MessageContainer.jsx';

import { useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { doGraphDeleteNodes } from '../FiniteAutomataGraphActions.js';


export default function UnreachableNodeErrorMessage(props)
{
    const { message, messageId } = props;
    const { nodeIds, labels } = message;

    const graphDispatch = useGraphDispatch();

    return (
        <MessageContainer messageId={messageId} mode="warning"
            message={`Found ${nodeIds.length} unreachable states labeled: \n ${labels.join(', ')}`}
            renderControls={dismiss => (
                <div>
                    <button onClick={() =>
                    {
                        doGraphDeleteNodes(graphDispatch, nodeIds);
                        dismiss();
                    }}>
                        Delete all unreachable.
                    </button>
                </div>
            )}>
                
        </MessageContainer>
    );
}
UnreachableNodeErrorMessage.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.shape({
        nodeIds: PropTypes.arrayOf(PropTypes.string),
        labels: PropTypes.arrayOf(PropTypes.string),
    }),
};
