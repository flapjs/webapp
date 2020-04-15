import { stringHash } from '@flapjs/util/MathHelper';

export function canUndo(historyState, source)
{
    const sourceName = getSourceName(source);
    if (!(sourceName in historyState)) return false;
    return historyState[sourceName].historyIndex > 0;
}

export function canRedo(historyState, source)
{
    const sourceName = getSourceName(source);
    if (!(sourceName in historyState)) return false;
    return historyState[sourceName].historyIndex < historyState[sourceName].history.length - 1;
}

export function getSourceName(source)
{
    return typeof source === 'string' ? source : source.name;
}

export function isCurrentState(historyState, source, data, hash = stringHash(data))
{
    const sourceName = getSourceName(source);
    if (sourceName in historyState)
    {
        const sourceState = historyState[sourceName];
        // As long as the source hash and the data hash are "similarly" equal, it should be accepted as current.
        return sourceState.history[sourceState.historyIndex].hash == hash;
    }
    return false;
}
