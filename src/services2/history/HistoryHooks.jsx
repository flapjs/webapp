import { useCallback, useEffect } from 'react';

import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';
import { stringHash } from '@flapjs/util/MathHelper.js';

import { useHistoryContext } from './HistoryContext.jsx';

/**
 * @callback SerializerFunction
 * @param {Object} dst The data object to serialize into.
 * 
 * @callback DeserializerFunction
 * @param {Object} src The data object to deserialize from.
 */

/**
 * Exposes the history api for a given unique history key.
 * 
 * @param {String} historyKey The key that identifies the history state.
 * @param {SerializerFunction} serializer The data serializer to capture the state for a snapshot.
 * @param {DeserializerFunction} deserializer The data deserializer to return the state for a snapshot.
 * @param {Object} [opts] Any additional options.
 * @param {Number} [opts.recheckTimeInterval] The number of milliseconds before rechecking for another snapshot.
 * @param {Boolean} [opts.commitImmediately] Whether to commit immediately on change, in addition to on the recheck interval.
 */
export function useHistory(historyKey, serializer, deserializer, opts = {})
{
    const { recheckTimeInterval = 300, commitImmediately = false } = opts;

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

    /** Perform an undo and restore the previous snapshot state, if exists. */
    const doUndoHistory = useCallback(
        function doUndoHistory()
        {
            restore(historyKey, -1, historySnapshotDeserializer);
        },
        [historyKey, historySnapshotDeserializer, restore]);

    /** Whether a previous snapshot state exists for an undo. */
    const canUndoHistory = useCallback(
        function canUndoHistory()
        {
            return canRestore(historyKey, -1);
        },
        [canRestore, historyKey]);

    /** Perform a redo and restore the next snapshot state, if exists. */
    const doRedoHistory = useCallback(
        function doRedoHistory()
        {
            restore(historyKey, 1, historySnapshotDeserializer);
        },
        [historyKey, historySnapshotDeserializer, restore]);
    
    /** Whether a next snapshot state exists for a redo. */
    const canRedoHistory = useCallback(
        function canRedoHistory()
        {
            return canRestore(historyKey, 1);
        },
        [canRestore, historyKey]);

    /** Remove all committed snapshot states. */
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

/**
 * This is used to serialize the entire history state, including all its
 * committed snapshots. This is useful if you want to save the history
 * in storage for future retrieval.
 * 
 * @param {String} historyKey The unique history identifier.
 * @returns {SerializerFunction} The state serializer function.
 */
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

/**
 * This is used to deserialize the entire history state, including all its
 * committed snapshots. This is useful if you want to load the history
 * in storage from a past store.
 * 
 * @param {String} historyKey The unique history identifier.
 * @returns {DeserializerFunction} The state deserializer function.
 */
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

/**
 * This is used to serialize a history snapshot. Because snapshots can be
 * committed arbitrarily, regardless if an actual change has occured, this
 * performs a hash of the data before committing it. This allows for easy
 * diffing to determine whether a snapshot is worth storing.
 * 
 * This is essentially an optimizer for snapshots. It serves no actual
 * additional functionality.
 * 
 * @param {DeserializerFunction} dataSerializer The data serializer function.
 */
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

/**
 * This is used to deserialize a history snapshot. Because snapshots can be
 * committed arbitrarily, regardless if an actual change has occured, this
 * performs a hash of the data before committing it. This allows for easy
 * diffing to determine whether a snapshot is worth storing.
 * 
 * This is essentially an optimizer for snapshots. It serves no actual
 * additional functionality.
 * 
 * @param {DeserializerFunction} dataDeserializer The data deserializer function.
 */
export function useHistorySnapshotDeserializer(dataDeserializer)
{
    return useCallback(
        function historySnapshotDeserializer(src)
        {
            dataDeserializer(src.data);
        },
        [dataDeserializer]);
}

/**
 * Creates a snapshot object to be stored in history in the format used by
 * {@link useHistorySnapshotSerializer} and {@link useHistorySnapshotDeserializer}.
 * 
 * @param {Object} data Any state data that should be stored for this snapshot.
 * @param {Object} dst The snapshot object that will be stored. This should be
 * modified to reflect the new data state.
 * @returns {Object} The passed-in, resultant snapshot object.
 */
function createSnapshot(data, dst = { data: '', hash: null })
{
    dst.data = data;
    dst.hash = stringHash(JSON.stringify(data));
    return dst;
}

/**
 * Checks whether a given snapshot is the current snapshot in history by comparing hashes.
 * This is used by {@link useHistorySnapshotSerializer} and
 * {@link useHistorySnapshotDeserializer} for more efficient diffing.
 * 
 * @returns {Boolean} Whether the given snapshot is the current one.
 */
function isCurrentSnapshot(historyState, nextSnapshot)
{
    if (!historyState || historyState.index < 0) return false;
    const currentSnapshot = historyState.snapshots[historyState.index];
    console.log(historyState.index);
    return currentSnapshot.hash === nextSnapshot.hash;
}
