import React, { useContext } from 'react';
import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';
import { canUndo, canRedo } from './HistoryHelper.js';

export function Undo(props)
{
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    return (
        <button onClick={() => historyDispatch({ type: 'undo' })}
            disabled={canUndo(historyState)}>
            Undo
        </button>
    );
}

export function Redo(props)
{
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);
    
    return (
        <button onClick={() => historyDispatch({ type: 'redo' })}
            disabled={canRedo(historyState)}>
            Redo
        </button>
    );
}
