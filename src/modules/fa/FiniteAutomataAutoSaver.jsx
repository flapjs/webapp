import { useContext } from 'react';
import { GraphTypeContext } from '@flapjs/services/graph/GraphContext.jsx';
import { useGraphType, useGraphState, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';
import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';

export function FiniteAutomataAutoSaver()
{
    const graphType = useContext(GraphTypeContext);
    const graphDataKey = graphType.name + '.graphData';

    useAutoSave(graphDataKey, useFiniteAutomataSerializer, useFiniteAutomataDeserializer);

    return null;
}

export function useFiniteAutomataSerializer()
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();

    return function serializer(dst)
    {
        return graphType.serialize(graphState, dst);
    };
}

export function useFiniteAutomataDeserializer()
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();

    return function deserializer(src)
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
    };
}
