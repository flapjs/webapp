import { useContext, useEffect, useCallback } from 'react';
import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';
import { stringHash } from '@flapjs/util/MathHelper.js';
import { isCurrentState } from './HistoryHelper.js';

export function useHistory(source, dataCallback, recheckTimeInterval = 300, commitImmediately = false)
{
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    const historyCommitCallback = useCallback(() =>
    {
        const data = dataCallback();
        const dataHash = stringHash(data);

        // NOTE: This is important to stop infinite loops.
        if (!isCurrentState(historyState, source, data, dataHash))
        {
            historyDispatch({ type: 'commit', source, data, hash: dataHash });
        }
    },
    [ dataCallback, historyState, historyDispatch, source ]);

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
}