import { useGraph } from './graph/GraphService.js';

export function useTreeSerializer()
{
    const { nodes, edges } = useGraph();

    return function serializer(dst)
    {
        dst.data = {
            nodes: nodes.nodeList,
            edges: edges.edgeList,
        };
    };
}

export function useTreeDeserializer()
{
    const { nodes, edges, clearGraph } = useGraph();

    return function deserializer(src)
    {
        clearGraph();

        for(let nodeData of src.data.nodes)
        {
            nodes.add(nodeData);
        }

        for(let edgeData of src.data.edges)
        {
            edges.add(edgeData.fromNodeId, edgeData.toNodeId, edgeData);
        }
    };
}
