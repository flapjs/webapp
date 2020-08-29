import { stringHash } from '@flapjs/util/MathHelper';

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
        if (sourceState.history.length <= 0) return false;
        if (sourceState.historyIndex < 0) return false;

        // As long as the source hash and the data hash are "similarly" equal, it should be accepted as current.
        return sourceState.history[sourceState.historyIndex].hash == hash;
    }
    return false;
}
