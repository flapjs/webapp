export function canUndo(historyState)
{
    return historyState.historyIndex > 0;
}

export function canRedo(historyState)
{
    return historyState.historyIndex < historyState.history.length - 1;
}
