import { useContext, useEffect, useCallback } from 'react';
import { stringHash } from '@flapjs/util/MathHelper.js';

import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';

import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';
import { isCurrentState, getSourceName } from './HistoryHelper.js';
import { useHistoryDeserializer, useHistorySerializer } from './HistorySerializer.jsx';

export function useHistory(historyKey, serializer, deserializer, recheckTimeInterval = 300, commitImmediately = false)
{
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    if (!historyState || !historyDispatch)
    {
        throw new Error('Missing HistoryProvider.');
    }

    const historySerializer = useHistorySerializer(historyKey);
    const historyDeserializer = useHistoryDeserializer(historyKey);
    useAutoSave(historyKey, historySerializer, historyDeserializer);

    const historyCommitCallback = useCallback(() =>
    {
        let data = {};
        serializer(data);

        const dataString = JSON.stringify(data);
        const dataHash = stringHash(dataString);

        // NOTE: This is important to stop infinite loops.
        if (!isCurrentState(historyState, historyKey, dataString, dataHash))
        {
            historyDispatch({ type: 'commit', source: historyKey, data: dataString, hash: dataHash });
        }
    },
    [ serializer, historyState, historyDispatch, historyKey ]);

    useEffect(() =>
    {
        // This will commit the change immediately, instead of waiting a buffer time to commit.
        // By waiting, we can bundle lots of changes into one commit entry, being more efficient.
        // But sometimes, you do need to save things immediately, so it's a tradeoff.
        if (commitImmediately)
        {
            // Submit a change check because a re-render occurred...
            historyCommitCallback();
        }

        // Try for a change check every so often, just in case a change happened that doesn't cause a re-render...
        if (recheckTimeInterval > 0)
        {
            let canUpdate = true;
            let intervalHandle = setInterval(() =>
            {
                if (canUpdate)
                {
                    historyCommitCallback();
                }
            },
            recheckTimeInterval);
    
            // Be sure to clean up any leftover event listeners to prevent memory leaks.
            return () =>
            {
                canUpdate = false;
                clearInterval(intervalHandle);
            };
        }
    });

    const doUndoHistory = useCallback(function doUndoHistory()
    {
        historyDispatch({ type: 'undo', source: historyKey, update: data => deserializer(JSON.parse(data)) });
    },
    [deserializer, historyDispatch, historyKey]);

    const canUndoHistory = useCallback(function canUndoHistory()
    {
        const sourceName = getSourceName(historyKey);
        if (!(sourceName in historyState)) return false;
        return historyState[sourceName].historyIndex > 0;
    },
    [historyState, historyKey]);

    const doRedoHistory = useCallback(function doRedoHistory()
    {
        historyDispatch({ type: 'redo', source: historyKey, update: data => deserializer(JSON.parse(data)) });
    },
    [deserializer, historyDispatch, historyKey]);
    
    const canRedoHistory = useCallback(function canRedoHistory()
    {
        const sourceName = getSourceName(historyKey);
        if (!(sourceName in historyState)) return false;
        return historyState[sourceName].historyIndex < historyState[sourceName].history.length - 1;
    },
    [historyState, historyKey]);

    const clearHistory = useCallback(function clearHistory()
    {
        historyDispatch({ type: 'clear', source: historyKey });
    },
    [historyDispatch, historyKey]);

    return {
        doUndoHistory,
        canUndoHistory,
        doRedoHistory,
        canRedoHistory,
        clearHistory,
    };
}
