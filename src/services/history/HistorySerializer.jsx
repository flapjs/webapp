import { useContext, useCallback } from 'react';

import { HistoryStateContext, HistoryDispatchContext } from './HistoryContext.jsx';

export function useHistorySerializer(historyKey)
{
    const historyState = useContext(HistoryStateContext);

    const serializer = useCallback(function historySerializer(dst)
    {
        if (historyKey in historyState)
        {
            const h = historyState[historyKey];
            dst.history = [...h.history];
            dst.historyIndex = h.historyIndex;
        }
        else
        {
            dst.history = [];
            dst.historyIndex = -1;
        }
    },
    [historyKey, historyState]);

    return serializer;
}

export function useHistoryDeserializer(historyKey)
{
    const historyState = useContext(HistoryStateContext);
    const historyDispatch = useContext(HistoryDispatchContext);

    const deserializer = useCallback(function historyDeserializer(src)
    {
        historyDispatch({
            type: 'resetState',
            state: {
                ...historyState,
                [historyKey]: { history: src.history, historyIndex: src.historyIndex }
            },
        });
    },
    [historyDispatch, historyKey, historyState]);

    return deserializer;
}
