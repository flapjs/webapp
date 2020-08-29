import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';
import { useGraph } from './graph/GraphService.js';

export function GraphAutoSaver()
{
    useAutoSave('graphData', useSerializer, useDeserializer);

    return null;
}

function useSerializer()
{
    const { nodeList, edgeList } = useGraph();

    return function serializer(dst)
    {
        dst.data = {
            nodes: nodeList,
            edges: edgeList,
        };
    };
}

function useDeserializer()
{
    const { addNode, addEdge, clearGraph } = useGraph();

    return function deserializer(src)
    {
        clearGraph();

        for(let nodeData of src.data.nodes)
        {
            addNode(nodeData);
        }

        for(let edgeData of src.data.edges)
        {
            addEdge(edgeData.fromNodeId, edgeData.toNodeId, edgeData);
        }
    };
}
