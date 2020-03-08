import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';
import { canUndo, canRedo } from './HistoryHelper.js';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { UndoIcon, RedoIcon } from '@flapjs/components/icons/Icons.js';

export function Undo(props)
{
    const { source, update } = props;
    
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    return (
        <IconButton
            iconClass={UndoIcon}
            onClick={() => historyDispatch({ type: 'undo', source, update })}
            disabled={!canUndo(historyState, source)}
            title="Undo"/>
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
        <IconButton
            iconClass={RedoIcon}
            onClick={() => historyDispatch({ type: 'redo', source, update })}
            disabled={!canRedo(historyState, source)}
            title="Redo"/>
    );
}
Redo.propTypes = {
    source: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.string,
    ]).isRequired,
    update: PropTypes.func.isRequired,
};
