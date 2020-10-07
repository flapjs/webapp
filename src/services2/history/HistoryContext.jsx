import { useState, useCallback } from 'react';

import { createContextAPI } from '@flapjs/services2/ContextAPI.jsx';

const MAX_HISTORY_LENGTH = 1000;

const ContextAPI = createContextAPI(HistoryContextAPI);
export const HistoryProvider = ContextAPI.Provider;
export const HistoryContextConsumer = ContextAPI.Consumer;
export const useHistoryContext = ContextAPI.useContext;

function HistoryContextAPI(props)
{
    const [state, setState] = useState({ history: {} });

    /**
     * Whether there exists a snapshot at the offset for the given history key
     * to be restored to.
     */
    const canRestore = useCallback(
        function canRestore(historyKey, historyIndexOffset)
        {
            if (historyKey in state.history)
            {
                const historyState = state.history[historyKey];
                const nextHistoryIndex = historyState.index + historyIndexOffset;
                return nextHistoryIndex >= 0
                    && nextHistoryIndex < historyState.snapshots.length;
            }
            else
            {
                return false;
            }
        },
        [state.history]);
    
    /**
     * Restores the state to an earlier or later snapshot (determined by the offset).
     */
    const restore = useCallback(
        function restore(historyKey, historyIndexOffset, snapshotDeserializer)
        {
            setState(state =>
            {
                let historyState = state.history[historyKey];

                const nextHistoryIndex = historyState.index + historyIndexOffset;
                if (nextHistoryIndex >= historyState.snapshots.length) return state;
                if (nextHistoryIndex < 0) return state;

                historyState.index = nextHistoryIndex;
                let snapshot = historyState.snapshots[historyState.index];
                snapshotDeserializer(snapshot);

                return {
                    ...state,
                    history: {
                        ...state.history,
                        [historyKey]: {
                            ...historyState,
                        },
                    },
                };
            });
        },
        []);

    /**
     * Commits a snapshot and record it in the history.
     */
    const commit = useCallback(
        function commit(historyKey, snapshotSerializer)
        {
            setState(state =>
            {
                if (!(historyKey in state.history))
                {
                    state.history[historyKey] = createHistoryState(historyKey);
                }

                let historyState = state.history[historyKey];
                let snapshots = historyState.snapshots;
                const length = snapshots.length;
                if (length >= MAX_HISTORY_LENGTH)
                {
                    // Cycle out old ones for space for the new.
                    snapshots.shift();
                    historyState.index -= 1;
                }
                else
                {
                    // Advance the end.
                    historyState.index += 1;
                }

                let nextSnapshot = {};
                snapshotSerializer(nextSnapshot);
                if (Object.keys(nextSnapshot).length > 0)
                {
                    snapshots.push(nextSnapshot);
                }
                else
                {
                    return state;
                }

                return {
                    ...state,
                    history: {
                        ...state.history,
                        [historyKey]: {
                            ...historyState,
                            snapshots: [
                                ...snapshots,
                            ]
                        },
                    },
                };
            });
        },
        []);

    /**
     * Clears the history for the given history key.
     */
    const clear = useCallback(
        function clear(historyKey)
        {
            setState(state =>
            {
                return {
                    ...state,
                    history: {
                        ...state.history,
                        [historyKey]: createHistoryState(historyKey),
                    },
                };
            });
        },
        []);
    
    /**
     * Gets the state of the history for the given history key.
     */
    const getState = useCallback(
        function getState(historyKey)
        {
            return state.history[historyKey];
        },
        [state]);

    /**
     * Resets the state of the history for the given history key.
     */
    const resetState = useCallback(
        function resetState(historyKey, historyState)
        {
            setState(state =>
            {
                let nextHistoryState = historyState;
                if (typeof historyState === 'function')
                {
                    nextHistoryState = historyState(state) || { history: {} };
                    if (nextHistoryState === state)
                    {
                        return state;
                    }
                }
                return {
                    ...state,
                    history: {
                        ...state.history,
                        [historyKey]: {
                            ...createHistoryState(historyKey),
                            ...nextHistoryState,
                        },
                    },
                };
            });
        },
        []);

    return {
        canRestore,
        restore,
        commit,
        clear,
        resetState,
        getState,
    };
}

function createHistoryState(historyKey)
{
    return {
        id: historyKey,
        index: -1,
        snapshots: [],
    };
}
