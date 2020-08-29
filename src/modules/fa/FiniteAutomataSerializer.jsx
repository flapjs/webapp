import { useContext, useCallback } from 'react';
import { GraphTypeContext } from '@flapjs/services/graph/GraphContext.jsx';
import { useGraphType, useGraphState, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

export function useFiniteAutomataSerializer()
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();
    
    const serializer = useCallback(function serializer(dst)
    {
        graphType.serialize(graphState, dst);
    },
    [graphState, graphType]);

    return serializer;
}

export function useFiniteAutomataDeserializer()
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();

    const deserializer = useCallback(function deserializer(src)
    {
        let graphData = src;
        let graphState;
        try
        {
            graphState = graphType.deserialize(graphData, {});
        }
        catch(e)
        {
            graphState = {};
        }
        graphDispatch({ type: 'resetState', state: graphState });
    },
    [graphType, graphDispatch]);

    return deserializer;
}
