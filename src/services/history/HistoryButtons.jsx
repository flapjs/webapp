import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';
import { canUndo, canRedo } from './HistoryHelper.js';

export function Undo(props)
{
    const { source, update } = props;
    
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    return (
        <button onClick={() => historyDispatch({ type: 'undo', source, update })}
            disabled={!canUndo(historyState, source)}>
            Undo
        </button>
    );
}
Undo.propTypes = {
    source: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.string,
    ]).isRequired,
    update: PropTypes.func.isRequired,
};

export function Redo(props)
{
    const { source, update } = props;

    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);
    
    return (
        <button onClick={() => historyDispatch({ type: 'redo', source, update })}
            disabled={!canRedo(historyState, source)}>
            Redo
        </button>
    );
}
Redo.propTypes = {
    source: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.string,
    ]).isRequired,
    update: PropTypes.func.isRequired,
};
