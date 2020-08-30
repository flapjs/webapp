import { useGraph } from './graph/GraphService.js';

export function useTreeSerializer()
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

export function useTreeDeserializer()
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
