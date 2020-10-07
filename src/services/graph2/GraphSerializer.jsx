import { useGraph } from './GraphContext.jsx';

export function useGraphSerializer(opts = { onSerialize: null })
{
    const graph = useGraph();
    return function serializer(dst)
    {
        let nodes = {};
        for(let node of graph.nodes.nodeList)
        {
            let result;
            if (opts.onSerialize)
            {
                result = opts.onSerialize('node', node);
            }
            else
            {
                result = node;
            }
            if (result)
            {
                nodes[node.id] = result;
            }
        }
        dst.nodes = nodes;

        let edges = {};
        for(let edge of graph.edges.edgeList)
        {
            let result;
            if (opts.onSerialize)
            {
                result = opts.onSerialize('edge', edge);
            }
            else
            {
                result = edge;
            }
            if (result)
            {
                edges[edge.id] = result;
            }
        }
        dst.edges = edges;

        dst.metadata = (opts.onSerialize && opts.onSerialize('metadata', graph.metadata))
            || graph.metadata
            || {};
    };
}

export function useGraphDeserializer(opts = { onDeserialize: null })
{
    const graph = useGraph();
    
    return function deserializer(src)
    {
        if ('nodes' in src)
        {
            let nodes = {};
            for(let nodeId in src.nodes)
            {
                let result;
                if (opts.onDeserialize)
                {
                    result = opts.onDeserialize('node', src.nodes[nodeId]);
                }
                else
                {
                    result = src.nodes[nodeId];
                }
                nodes[nodeId] = result;
            }
            graph.nodes.resetState({ elements: nodes });
        }
        else
        {
            graph.nodes.clear();
        }

        if ('edges' in src)
        {
            let edges = {};
            for(let edgeId in src.edges)
            {
                let result;
                if (opts.onDeserialize)
                {
                    result = opts.onDeserialize('edge', src.edges[edgeId]);
                }
                else
                {
                    result = src.edges[edgeId];
                }
                edges[edgeId] = result;
            }
            graph.edges.resetState({ elements: edges });
        }
        else
        {
            graph.edges.clear();
        }

        if ('metadata' in src)
        {
            graph.resetMetadata({
                metadata: (opts.onDeserialize && opts.onDeserialize('metadata', src.metadata))
                    || src.metadata
                    || {}
            });
        }
        else
        {
            graph.clearMetadata();
        }
    };
}
