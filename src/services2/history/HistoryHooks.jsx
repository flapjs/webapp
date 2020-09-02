import { useCallback, useEffect } from 'react';

import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';
import { stringHash } from '@flapjs/util/MathHelper.js';

import { useHistoryContext } from './HistoryContext.jsx';

function createSnapshot(data, dst = { data: '', hash: null })
{
    dst.data = data;
    dst.hash = stringHash(JSON.stringify(data));
    return dst;
}

function isCurrentSnapshot(historyState, nextSnapshot)
{
    if (!historyState || historyState.index < 0) return false;
    const currentSnapshot = historyState.snapshots[historyState.index];
    console.log(historyState.index);
    return currentSnapshot.hash === nextSnapshot.hash;
}

export function useHistory(historyKey, serializer, deserializer, recheckTimeInterval = 300, commitImmediately = false)
{
    const { canRestore, restore, commit, clear, getState } = useHistoryContext();

    const historyStateSerializer = useHistoryStateSerializer(historyKey);
    const historyStateDeserializer = useHistoryStateDeserializer(historyKey);
    useAutoSave(historyKey, historyStateSerializer, historyStateDeserializer);

    const historySnapshotSerializer = useHistorySnapshotSerializer(serializer);
    const historySnapshotDeserializer = useHistorySnapshotDeserializer(deserializer);
    const historyCommitCallback = useCallback(() =>
    {
        let nextSnapshot = {};
        historySnapshotSerializer(nextSnapshot);
        const historyState = getState(historyKey);

        // NOTE: This is important to stop infinite loops.
        if (!isCurrentSnapshot(historyState, nextSnapshot))
        {
            commit(historyKey, dst => Object.assign(dst, nextSnapshot));
        }
    },
    [historySnapshotSerializer, getState, historyKey, commit]);

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
    },
    [commitImmediately, historyCommitCallback, recheckTimeInterval]);

    const doUndoHistory = useCallback(
        function doUndoHistory()
        {
            restore(historyKey, -1, historySnapshotDeserializer);
        },
        [historyKey, historySnapshotDeserializer, restore]);

    const canUndoHistory = useCallback(
        function canUndoHistory()
        {
            return canRestore(historyKey, -1);
        },
        [canRestore, historyKey]);

    const doRedoHistory = useCallback(
        function doRedoHistory()
        {
            restore(historyKey, 1, historySnapshotDeserializer);
        },
        [historyKey, historySnapshotDeserializer, restore]);
    
    const canRedoHistory = useCallback(
        function canRedoHistory()
        {
            return canRestore(historyKey, 1);
        },
        [canRestore, historyKey]);

    const clearHistory = useCallback(
        function clearHistory()
        {
            clear(historyKey);
        },
        [clear, historyKey]);

    return {
        doUndoHistory,
        canUndoHistory,
        doRedoHistory,
        canRedoHistory,
        clearHistory,
    };
}

export function useHistoryStateSerializer(historyKey)
{
    const { getState } = useHistoryContext();
    const historySerializer = useCallback(
        function historySerializer(dst)
        {
            const historyState = getState(historyKey);
            if (historyState)
            {
                dst.index = historyState.index;
                dst.snapshots = [...historyState.snapshots];
            }
            else
            {
                dst.index = -1;
                dst.snapshots = [];
            }
        },
        [getState, historyKey]);
    return historySerializer;
}

export function useHistoryStateDeserializer(historyKey)
{
    const { resetState } = useHistoryContext();
    const historyDeserializer = useCallback(
        function historyDeserializer(src)
        {
            resetState(historyKey, state => ({
                ...state,
                index: src.index,
                snapshots: [...src.snapshots],
            }));
        },
        [historyKey, resetState]);
    return historyDeserializer;
}

export function useHistorySnapshotSerializer(dataSerializer)
{
    return useCallback(
        function historySnapshotSerializer(dst)
        {
            let data = {};
            dataSerializer(data);
            createSnapshot(data, dst);
        },
        [dataSerializer]);
}

export function useHistorySnapshotDeserializer(dataDeserializer)
{
    return useCallback(
        function historySnapshotDeserializer(src)
        {
            dataDeserializer(src.data);
        },
        [dataDeserializer]);
}
